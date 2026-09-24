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
    } catch (e) {
      console.error('Reset all error:', e);
    }
  }
};
