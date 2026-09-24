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

  _syncFavsToCloud(data) {
    try {
      const cs = window.Telegram?.WebApp?.CloudStorage;
      if (!cs) return;
      const payload = JSON.stringify({
        task9: data.task9 || [],
        task4: data.task4 || [],
        updatedAt: Date.now()
      });
      cs.setItem('ege_cloud_favs', payload, (err) => {
        if (err) console.warn('CloudStorage favs sync error:', err);
      });
    } catch (e) {
      console.warn('Cloud sync error:', e);
    }
  },

  _syncStatsToCloud(data) {
    try {
      const cs = window.Telegram?.WebApp?.CloudStorage;
      if (!cs) return;
      // Чтобы не превысить лимит 4096 байт, сохраняем последние 15 сессий
      const compactSessions = (data.sessions || []).slice(0, 15);
      const payload = JSON.stringify({
        blitzHighScore: Number(data.blitzHighScore) || 0,
        sessions: compactSessions,
        answers: data.answers || {},
        updatedAt: Date.now()
      });
      cs.setItem('ege_cloud_stats', payload, (err) => {
        if (err) console.warn('CloudStorage stats sync error:', err);
      });
    } catch (e) {
      console.warn('Cloud sync error:', e);
    }
  },

  initCloudSync(onSyncCallback) {
    try {
      const cs = window.Telegram?.WebApp?.CloudStorage;
      if (!cs) return;

      cs.getItems(['ege_cloud_stats', 'ege_cloud_favs'], (err, values) => {
        if (err || !values) return;
        let hasChanges = false;

        // 1. Синхронизация избранного
        if (values.ege_cloud_favs) {
          try {
            const cloudFavs = JSON.parse(values.ege_cloud_favs);
            const localFavs = this._getFavoritesData();
            const mergedT9 = Array.from(new Set([...(localFavs.task9 || []), ...(cloudFavs.task9 || [])]));
            const mergedT4 = Array.from(new Set([...(localFavs.task4 || []), ...(cloudFavs.task4 || [])]));

            if (mergedT9.length !== (localFavs.task9 || []).length || mergedT4.length !== (localFavs.task4 || []).length) {
              const updated = { task9: mergedT9, task4: mergedT4 };
              localStorage.setItem(this._getFavKey(), JSON.stringify(updated));
              hasChanges = true;
            }
          } catch (e) {
            console.warn('Error parsing cloud favs:', e);
          }
        }

        // 2. Синхронизация статистики
        if (values.ege_cloud_stats) {
          try {
            const cloudStats = JSON.parse(values.ege_cloud_stats);
            const localStats = this._getStatsData();

            const cloudRecord = Number(cloudStats.blitzHighScore) || 0;
            const localRecord = Number(localStats.blitzHighScore) || 0;
            const newRecord = Math.max(cloudRecord, localRecord);

            // Слияние сессий по уникальной дате
            const sessionMap = new Map();
            (localStats.sessions || []).forEach(s => { if (s && s.date) sessionMap.set(s.date, s); });
            (cloudStats.sessions || []).forEach(s => { if (s && s.date && !sessionMap.has(s.date)) sessionMap.set(s.date, s); });
            const mergedSessions = Array.from(sessionMap.values())
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 50);

            // Слияние ответов (для проблемных слов)
            const mergedAnswers = { ...(localStats.answers || {}) };
            if (cloudStats.answers) {
              for (const [id, a] of Object.entries(cloudStats.answers)) {
                if (!mergedAnswers[id]) {
                  mergedAnswers[id] = a;
                } else {
                  mergedAnswers[id] = {
                    correct: Math.max(mergedAnswers[id].correct || 0, a.correct || 0),
                    wrong: Math.max(mergedAnswers[id].wrong || 0, a.wrong || 0)
                  };
                }
              }
            }

            const isDifferent = newRecord !== localRecord ||
              mergedSessions.length !== (localStats.sessions || []).length ||
              Object.keys(mergedAnswers).length !== Object.keys(localStats.answers || {}).length;

            if (isDifferent) {
              const updatedStats = {
                ...localStats,
                blitzHighScore: newRecord,
                sessions: mergedSessions,
                answers: mergedAnswers
              };
              localStorage.setItem(this._getStatsKey(), JSON.stringify(updatedStats));
              hasChanges = true;
            }
          } catch (e) {
            console.warn('Error parsing cloud stats:', e);
          }
        }

        if (hasChanges && typeof onSyncCallback === 'function') {
          onSyncCallback();
        }
      });
    } catch (e) {
      console.warn('Cloud sync initialization error:', e);
    }
  }
};
