/**
 * Storage — управление localStorage с полной изоляцией для каждого пользователя Telegram
 * Избранное, статистика, история сессий
 */
const Storage = {

  _getUserId() {
    try {
      return window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'guest';
    } catch {
      return 'guest';
    }
  },

  _getFavKey() {
    return `ege_favorites_${this._getUserId()}`;
  },

  _getStatsKey() {
    return `ege_stats_${this._getUserId()}`;
  },

  // ==================== ИЗБРАННОЕ ====================

  _getFavoritesData() {
    try {
      const key = this._getFavKey();
      let raw = localStorage.getItem(key);
      // Обратная совместимость с guest версией
      if (!raw && localStorage.getItem('ege_favorites')) {
        raw = localStorage.getItem('ege_favorites');
        localStorage.setItem(key, raw);
      }
      return JSON.parse(raw || '{}');
    } catch {
      return {};
    }
  },

  _saveFavoritesData(data) {
    try {
      localStorage.setItem(this._getFavKey(), JSON.stringify(data));
      this._syncFavsToCloud(data);
    } catch (e) {
      console.error('Storage save error:', e);
    }
  },

  getFavorites(taskType) {
    const data = this._getFavoritesData();
    if (taskType) {
      return data[taskType] || [];
    }
    return data;
  },

  isFavorite(wordId) {
    const data = this._getFavoritesData();
    const all = [...(data.task9 || []), ...(data.task4 || [])];
    return all.includes(wordId);
  },

  toggleFavorite(wordId, taskType) {
    const data = this._getFavoritesData();
    const key = taskType; // 'task9' or 'task4'
    if (!data[key]) data[key] = [];

    const idx = data[key].indexOf(wordId);
    if (idx === -1) {
      data[key].push(wordId);
    } else {
      data[key].splice(idx, 1);
    }
    this._saveFavoritesData(data);
    return idx === -1;
  },

  // ==================== СТАТИСТИКА ====================

  _getStatsData() {
    try {
      const key = this._getStatsKey();
      let raw = localStorage.getItem(key);
      if (!raw && localStorage.getItem('ege_stats')) {
        raw = localStorage.getItem('ege_stats');
        localStorage.setItem(key, raw);
      }
      return JSON.parse(raw || '{}');
    } catch {
      return {};
    }
  },

  _saveStatsData(data) {
    try {
      localStorage.setItem(this._getStatsKey(), JSON.stringify(data));
      this._syncStatsToCloud(data);
    } catch (e) {
      console.error('Stats save error:', e);
    }
  },

  /**
   * Записать результат сессии
   * @param {Object} session - { taskType, total, correct, wrong, date, mistakes[] }
   */
  addSession(session) {
    const data = this._getStatsData();
    if (!data.sessions) data.sessions = [];

    session.date = new Date().toISOString();
    data.sessions.unshift(session);

    if (data.sessions.length > 50) {
      data.sessions = data.sessions.slice(0, 50);
    }

    this._saveStatsData(data);
  },

  /**
   * Записать ответ (для проблемных слов)
   */
  recordAnswer(wordId, isCorrect) {
    const data = this._getStatsData();
    if (!data.answers) data.answers = {};

    if (!data.answers[wordId]) {
      data.answers[wordId] = { correct: 0, wrong: 0 };
    }

    if (isCorrect) {
      data.answers[wordId].correct++;
    } else {
      data.answers[wordId].wrong++;
    }

    this._saveStatsData(data);
  },

  /**
   * Получить общую статистику
   */
  getStats() {
    const data = this._getStatsData();
    const sessions = data.sessions || [];

    const task9Sessions = sessions.filter(s => s.taskType === 'task9');
    const task4Sessions = sessions.filter(s => s.taskType === 'task4');

    const calcStats = (list) => {
      if (!list || list.length === 0) return { total: 0, correct: 0, percent: 0, sessionsCount: 0 };
      const total = list.reduce((sum, s) => sum + (Number(s.total) || 0), 0);
      const correct = list.reduce((sum, s) => sum + (Number(s.correct) || 0), 0);
      return {
        total,
        correct,
        percent: total > 0 ? Math.round((correct / total) * 100) : 0,
        sessionsCount: list.length
      };
    };

    const s9 = calcStats(task9Sessions);
    const s4 = calcStats(task4Sessions);
    const totalPracticed = s9.total + s4.total;
    const totalCorrect = s9.correct + s4.correct;
    const overallPercent = totalPracticed > 0 ? Math.round((totalCorrect / totalPracticed) * 100) : 0;

    return {
      task9: s9,
      task4: s4,
      totalPracticed,
      totalCorrect,
      overallPercent,
      totalSessions: sessions.length,
      lastSessions: sessions.slice(0, 10),
      problemWords: this.getProblematicWords(),
      blitzHighScore: Number(data.blitzHighScore) || 0
    };
  },

  getBlitzHighScore() {
    const data = this._getStatsData();
    return Number(data.blitzHighScore) || 0;
  },

  setBlitzHighScore(score) {
    const data = this._getStatsData();
    const current = Number(data.blitzHighScore) || 0;
    const isNewRecord = score > current;
    if (isNewRecord) {
      data.blitzHighScore = score;
      this._saveStatsData(data);
    }
    return { isNewRecord, highScore: Math.max(current, score) };
  },

  /**
   * Получить самые проблемные слова (топ-15)
   */
  getProblematicWords() {
    const data = this._getStatsData();
    const answers = data.answers || {};

    return Object.entries(answers)
      .filter(([, a]) => a && Number(a.wrong) > 0)
      .map(([id, a]) => {
        const correct = Number(a.correct) || 0;
        const wrong = Number(a.wrong) || 0;
        const total = correct + wrong;
        const errorRate = total > 0 ? (wrong / total) : 1;
        return {
          id,
          correct,
          wrong,
          total,
          errorRate
        };
      })
      .sort((a, b) => (b.wrong * 2 + b.errorRate * 3) - (a.wrong * 2 + a.errorRate * 3))
      .slice(0, 15);
  },

  /**
   * Сбросить всю статистику текущего пользователя
   */
  resetStats() {
    try {
      localStorage.removeItem(this._getStatsKey());
      localStorage.removeItem('ege_stats');
      const cs = window.Telegram?.WebApp?.CloudStorage;
      if (cs) {
        cs.removeItems?.(['ege_cloud_stats'], () => {});
      }
    } catch (e) {
      console.error('Reset stats error:', e);
    }
  },

  /**
   * Сбросить всё для текущего пользователя
   */
  resetAll() {
    try {
      localStorage.removeItem(this._getStatsKey());
      localStorage.removeItem('ege_stats');
      localStorage.removeItem(this._getFavKey());
      localStorage.removeItem('ege_favorites');
      const cs = window.Telegram?.WebApp?.CloudStorage;
      if (cs) {
        cs.removeItems?.(['ege_cloud_stats', 'ege_cloud_favs'], () => {});
      }
    } catch (e) {
      console.error('Reset all error:', e);
    }
  },

  // ==================== СИНХРОНИЗАЦИЯ УСТРОЙСТВ (TELEGRAM CLOUD STORAGE) ====================

  /**
   * Сжатие статистики для облака (лимит Telegram CloudStorage строго 4096 символов на ключ)
   */
  _compressStatsForCloud(data) {
    if (!data) return '';
    // Оставляем последние 15 сессий в ультра-компактном виде (без тяжелых массивов ошибок)
    const compactSessions = (data.sessions || []).slice(0, 15).map(s => ({
      t: s.taskType || s.t || 'task9',
      tot: Number(s.total ?? s.tot) || 0,
      c: Number(s.correct ?? s.c) || 0,
      w: Number(s.wrong ?? s.w) || 0,
      d: s.date || s.d
    }));

    // Компактные ответы: только слова с активностью, в виде [correct, wrong]
    const compactAnswers = {};
    for (const [id, a] of Object.entries(data.answers || {})) {
      if (!a) continue;
      const c = Array.isArray(a) ? (a[0] || 0) : (Number(a.correct) || 0);
      const w = Array.isArray(a) ? (a[1] || 0) : (Number(a.wrong) || 0);
      if (c > 0 || w > 0) {
        compactAnswers[id] = [c, w];
      }
    }

    return JSON.stringify({
      h: Number(data.blitzHighScore) || 0,
      s: compactSessions,
      a: compactAnswers,
      u: Date.now()
    });
  },

  /**
   * Распаковка статистики из облака с обратной совместимостью
   */
  _decompressStatsFromCloud(raw) {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      const blitzHighScore = Number(parsed.h ?? parsed.blitzHighScore) || 0;
      const sessions = (parsed.s || parsed.sessions || []).map(s => ({
        taskType: s.taskType || s.t || 'task9',
        total: Number(s.total ?? s.tot) || 0,
        correct: Number(s.correct ?? s.c) || 0,
        wrong: Number(s.wrong ?? s.w) || 0,
        date: s.date || s.d || new Date().toISOString()
      }));

      const rawAnswers = parsed.a || parsed.answers || {};
      const answers = {};
      for (const [id, a] of Object.entries(rawAnswers)) {
        if (Array.isArray(a)) {
          answers[id] = { correct: a[0] || 0, wrong: a[1] || 0 };
        } else if (a && typeof a === 'object') {
          answers[id] = { correct: Number(a.correct) || 0, wrong: Number(a.wrong) || 0 };
        }
      }

      return {
        blitzHighScore,
        sessions,
        answers,
        updatedAt: parsed.u || parsed.updatedAt || 0
      };
    } catch (e) {
      console.warn('Decompress cloud stats error:', e);
      return null;
    }
  },

  _syncFavsToCloud(data) {
    try {
      const cs = window.Telegram?.WebApp?.CloudStorage;
      if (!cs || typeof cs.setItem !== 'function') return;
      const payload = JSON.stringify({
        task9: data.task9 || [],
        task4: data.task4 || [],
        updatedAt: Date.now()
      });
      if (payload.length > 4000) {
        console.warn('Favs payload exceeds Telegram limit');
        return;
      }
      cs.setItem('ege_cloud_favs', payload, (err) => {
        if (err) console.warn('CloudStorage favs sync error:', err);
      });
    } catch (e) {
      console.warn('Cloud sync favs error:', e);
    }
  },

  _syncStatsToCloud(data) {
    try {
      const cs = window.Telegram?.WebApp?.CloudStorage;
      if (!cs || typeof cs.setItem !== 'function') return;
      const payload = this._compressStatsForCloud(data);
      if (!payload || payload.length > 4000) {
        console.warn('Stats payload exceeds Telegram limit');
        return;
      }
      cs.setItem('ege_cloud_stats', payload, (err) => {
        if (err) console.warn('CloudStorage stats sync error:', err);
      });
    } catch (e) {
      console.warn('Cloud sync stats error:', e);
    }
  },

  /**
   * Универсальное чтение ключей из CloudStorage с поддержкой getItem и getItems
   */
  _readCloudData(callback) {
    const cs = window.Telegram?.WebApp?.CloudStorage;
    if (!cs) {
      callback(null);
      return;
    }

    if (typeof cs.getItems === 'function') {
      try {
        cs.getItems(['ege_cloud_stats', 'ege_cloud_favs'], (err, values) => {
          if (!err && values) {
            callback(values);
          } else {
            this._readCloudDataFallback(callback);
          }
        });
        return;
      } catch {
        // Fallback
      }
    }
    this._readCloudDataFallback(callback);
  },

  _readCloudDataFallback(callback) {
    const cs = window.Telegram?.WebApp?.CloudStorage;
    if (!cs || typeof cs.getItem !== 'function') {
      callback(null);
      return;
    }

    try {
      cs.getItem('ege_cloud_stats', (err1, valStats) => {
        cs.getItem('ege_cloud_favs', (err2, valFavs) => {
          callback({
            ege_cloud_stats: valStats || '',
            ege_cloud_favs: valFavs || ''
          });
        });
      });
    } catch {
      callback(null);
    }
  },

  /**
   * Полная двусторонняя синхронизация (Pull + Merge + Push)
   */
  initCloudSync(onSyncCallback) {
    try {
      const cs = window.Telegram?.WebApp?.CloudStorage;
      if (!cs) {
        if (typeof onSyncCallback === 'function') onSyncCallback(false, false);
        return;
      }

      this._readCloudData((values) => {
        if (!values) {
          if (typeof onSyncCallback === 'function') onSyncCallback(false, false);
          return;
        }

        let hasLocalChanges = false;
        let shouldPushStatsToCloud = false;
        let shouldPushFavsToCloud = false;

        const localFavs = this._getFavoritesData();
        const localStats = this._getStatsData();

        // 1. СИНХРОНИЗАЦИЯ ИЗБРАННОГО
        let mergedFavs = {
          task9: [...(localFavs.task9 || [])],
          task4: [...(localFavs.task4 || [])]
        };

        if (values.ege_cloud_favs) {
          try {
            const cloudFavs = JSON.parse(values.ege_cloud_favs);
            const unionT9 = Array.from(new Set([...(localFavs.task9 || []), ...(cloudFavs.task9 || [])]));
            const unionT4 = Array.from(new Set([...(localFavs.task4 || []), ...(cloudFavs.task4 || [])]));

            if (unionT9.length !== (localFavs.task9 || []).length || unionT4.length !== (localFavs.task4 || []).length) {
              mergedFavs = { task9: unionT9, task4: unionT4 };
              localStorage.setItem(this._getFavKey(), JSON.stringify(mergedFavs));
              hasLocalChanges = true;
            }

            if (unionT9.length !== (cloudFavs.task9 || []).length || unionT4.length !== (cloudFavs.task4 || []).length) {
              shouldPushFavsToCloud = true;
            }
          } catch (e) {
            console.warn('Error parsing cloud favs:', e);
          }
        } else if ((localFavs.task9 || []).length > 0 || (localFavs.task4 || []).length > 0) {
          // В облаке ещё пусто, а локально есть избранное -> выгружаем в облако
          shouldPushFavsToCloud = true;
        }

        if (shouldPushFavsToCloud) {
          this._syncFavsToCloud(mergedFavs);
        }

        // 2. СИНХРОНИЗАЦИЯ СТАТИСТИКИ
        let mergedStats = { ...localStats };

        if (values.ege_cloud_stats) {
          try {
            const cloudStats = this._decompressStatsFromCloud(values.ege_cloud_stats);
            if (cloudStats) {
              const cloudRecord = Number(cloudStats.blitzHighScore) || 0;
              const localRecord = Number(localStats.blitzHighScore) || 0;
              const newRecord = Math.max(cloudRecord, localRecord);

              // Слияние сессий по дате
              const sessionMap = new Map();
              (localStats.sessions || []).forEach(s => { if (s && s.date) sessionMap.set(s.date, s); });
              (cloudStats.sessions || []).forEach(s => { if (s && s.date && !sessionMap.has(s.date)) sessionMap.set(s.date, s); });
              const mergedSessions = Array.from(sessionMap.values())
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 50);

              // Слияние ответов
              const mergedAnswers = { ...(localStats.answers || {}) };
              for (const [id, a] of Object.entries(cloudStats.answers || {})) {
                if (!mergedAnswers[id]) {
                  mergedAnswers[id] = a;
                } else {
                  mergedAnswers[id] = {
                    correct: Math.max(mergedAnswers[id].correct || 0, a.correct || 0),
                    wrong: Math.max(mergedAnswers[id].wrong || 0, a.wrong || 0)
                  };
                }
              }

              const isLocalDifferent = newRecord !== localRecord ||
                mergedSessions.length !== (localStats.sessions || []).length ||
                Object.keys(mergedAnswers).length !== Object.keys(localStats.answers || {}).length;

              if (isLocalDifferent) {
                mergedStats = {
                  ...localStats,
                  blitzHighScore: newRecord,
                  sessions: mergedSessions,
                  answers: mergedAnswers
                };
                localStorage.setItem(this._getStatsKey(), JSON.stringify(mergedStats));
                hasLocalChanges = true;
              }

              const isCloudBehind = newRecord > cloudRecord ||
                mergedSessions.length > (cloudStats.sessions || []).length ||
                Object.keys(mergedAnswers).length > Object.keys(cloudStats.answers || {}).length;

              if (isCloudBehind) {
                shouldPushStatsToCloud = true;
              }
            }
          } catch (e) {
            console.warn('Error syncing cloud stats:', e);
          }
        } else {
          // В облаке ещё пусто, а локально статистика есть -> сразу отправляем в облако
          const hasAnyLocalStats = (localStats.sessions || []).length > 0 ||
            Object.keys(localStats.answers || {}).length > 0 ||
            (Number(localStats.blitzHighScore) || 0) > 0;
          if (hasAnyLocalStats) {
            shouldPushStatsToCloud = true;
          }
        }

        if (shouldPushStatsToCloud) {
          this._syncStatsToCloud(mergedStats);
        }

        if (typeof onSyncCallback === 'function') {
          onSyncCallback(hasLocalChanges, true);
        }
      });
    } catch (e) {
      console.warn('Cloud sync error:', e);
      if (typeof onSyncCallback === 'function') onSyncCallback(false, false);
    }
  }
};
