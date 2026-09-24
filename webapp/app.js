/**
 * Тренажёр ЕГЭ — Главный модуль приложения
 * SPA: маршрутизация, экраны, логика тренировок
 */

const App = {
  el: null,
  nav: null,
  currentScreen: 'home',
  screenParams: {},
  training: null,
  _searchTimeout: null,
  _nextQuestionTimer: null,

  // ==================== ИНИЦИАЛИЗАЦИЯ ====================

  init() {
    this.el = document.getElementById('app');
    this.nav = document.getElementById('bottomNav');

    // Telegram WebApp
    this.initTelegram();

    // ЕДИНЫЕ обработчики событий
    this.nav.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-btn');
      if (btn) this.navigate(btn.dataset.screen);
    });

    this.el.addEventListener('click', (e) => this.handleClick(e));

    // Обработка поиска в словарике без перерисовки инпута
    this.el.addEventListener('input', (e) => {
      if (e.target.matches('.dict-search')) {
        this.screenParams.searchQuery = e.target.value;
        clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(() => {
          this.updateDictionaryList();
        }, 150);
      }
    });

    // Клавиатура (цифры 1-4)
    document.addEventListener('keydown', (e) => {
      if (this.currentScreen === 'training' && this.training && !this.training.answered) {
        const idx = parseInt(e.key) - 1;
        if (idx >= 0 && idx < (this.training.currentVariants || []).length) {
          this.checkAnswer(idx);
        }
      }
    });

    this.navigate('home');
  },

  initTelegram() {
    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        if (tg.colorScheme === 'dark') {
          document.body.classList.add('tg-dark');
        }
        tg.BackButton.onClick(() => {
          if (this.currentScreen === 'training') {
            this.handleQuitTraining();
          } else {
            this.goBack();
          }
        });
      }
    } catch (e) {
      console.log('Running in browser mode');
    }
  },

  // ==================== НАВИГАЦИЯ ====================

  history: [],

  navigate(screen, params = {}) {
    if (this.currentScreen !== screen) {
      this.history.push({ screen: this.currentScreen, params: { ...this.screenParams } });
    }

    this.currentScreen = screen;
    this.screenParams = params;

    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        screen === 'home' ? tg.BackButton.hide() : tg.BackButton.show();
      }
    } catch (e) {}

    this.updateNav(screen);
    this.render();
  },

  goBack() {
    if (this.currentScreen === 'training') {
      this.handleQuitTraining();
      return;
    }

    if (this.history.length > 0) {
      const prev = this.history.pop();
      this.currentScreen = prev.screen;
      this.screenParams = prev.params;
      this.updateNav(prev.screen);
      this.render();
    } else {
      this.navigate('home');
    }
  },

  updateNav(screen) {
    const navScreens = ['home', 'dictionary', 'favorites', 'stats', 'task9filter', 'task4filter'];
    this.nav.classList.toggle('hidden', !navScreens.includes(screen));
    this.nav.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.screen === screen);
    });
  },

  // ==================== РЕНДЕР ====================

  render() {
    const renderers = {
      home: () => this.renderHome(),
      task9filter: () => this.renderTask9Filter(),
      task4filter: () => this.renderTask4Filter(),
      training: () => this.renderTraining(),
      results: () => this.renderResults(),
      dictionary: () => this.renderDictionary(),
      favorites: () => this.renderFavorites(),
      stats: () => this.renderStats(),
    };

    const renderer = renderers[this.currentScreen];
    if (renderer) {
      this.el.innerHTML = `<div class="screen">${renderer()}</div>`;
    }
  },

  // ==================== ЕДИНЫЙ ОБРАБОТЧИК КЛИКОВ ====================

  handleClick(e) {
    // 1. Кнопки с data-action
    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      this.handleAction(actionEl.dataset.action, actionEl.dataset);
      return;
    }

    // 2. Варианты ответа в тренировке
    const variantBtn = e.target.closest('.variant-btn');
    if (variantBtn && !variantBtn.disabled) {
      this.checkAnswer(parseInt(variantBtn.dataset.variant));
      return;
    }

    // 3. Выбор длины сессии
    const pill = e.target.closest('.pill');
    if (pill) {
      this.screenParams.sessionLength = parseInt(pill.dataset.sessionLength);
      this.render();
      return;
    }

    // 4. Режим выбора букв в Задании №9 (все / одна / несколько)
    const letterModeBtn = e.target.closest('[data-letter-mode]');
    if (letterModeBtn) {
      const mode = letterModeBtn.dataset.letterMode;
      this.screenParams.letterMode = mode;
      if (mode === 'all') {
        this.screenParams.selectedLetters = [];
      } else if (mode === 'single') {
        if (!this.screenParams.selectedLetters || this.screenParams.selectedLetters.length === 0) {
          this.screenParams.selectedLetters = ['а'];
        } else {
          this.screenParams.selectedLetters = [this.screenParams.selectedLetters[0]];
        }
      } else if (mode === 'multi') {
        if (!this.screenParams.selectedLetters || this.screenParams.selectedLetters.length === 0) {
          this.screenParams.selectedLetters = ['а'];
        }
      }
      this.render();
      return;
    }

    // 5. Кнопка выбора буквы (А, Б, В, Г...)
    const letterBtn = e.target.closest('.letter-btn');
    if (letterBtn) {
      const letter = letterBtn.dataset.letter;
      if (!this.screenParams.selectedLetters) this.screenParams.selectedLetters = [];

      if (this.screenParams.letterMode === 'single') {
        this.screenParams.selectedLetters = [letter];
      } else {
        const idx = this.screenParams.selectedLetters.indexOf(letter);
        if (idx === -1) {
          this.screenParams.selectedLetters.push(letter);
        } else {
          this.screenParams.selectedLetters.splice(idx, 1);
        }
      }
      this.render();
      return;
    }

    // 6. Режим фильтра в Задании №4 (части речи)
    const filterTypeBtn = e.target.closest('[data-filter-type]');
    if (filterTypeBtn) {
      this.screenParams.filterType = filterTypeBtn.dataset.filterType;
      this.screenParams.selectedParts = [];
      this.render();
      return;
    }

    const partBtn = e.target.closest('[data-part]');
    if (partBtn) {
      const part = partBtn.dataset.part;
      if (!this.screenParams.selectedParts) this.screenParams.selectedParts = [];

      const idx = this.screenParams.selectedParts.indexOf(part);
      if (idx === -1) {
        this.screenParams.selectedParts.push(part);
      } else {
        this.screenParams.selectedParts.splice(idx, 1);
      }
      this.render();
      return;
    }

    // 7. Вкладки словарика
    const dictTab = e.target.closest('.dict-tab');
    if (dictTab) {
      this.screenParams.dictTab = dictTab.dataset.dictTab;
      this.screenParams.searchQuery = '';
      this.screenParams.dictLetter = '';
      this.render();
      return;
    }

    // 8. Переключатель сортировки в словарике (алфавит / части речи)
    const dictSortBtn = e.target.closest('.dict-sort-btn');
    if (dictSortBtn) {
      this.screenParams.dictSort = dictSortBtn.dataset.dictSort;
      this.render();
      return;
    }

    // 9. Быстрый фильтр по первой букве в словарике
    const dictLetterChip = e.target.closest('.dict-letter-chip');
    if (dictLetterChip) {
      const letter = dictLetterChip.dataset.letter || '';
      this.screenParams.dictLetter = (this.screenParams.dictLetter === letter) ? '' : letter;
      this.render();
      return;
    }
  },

  handleAction(action, dataset) {
    switch (action) {
      case 'back':
        this.goBack();
        break;

      case 'home':
        this.history = [];
        this.navigate('home');
        break;

      case 'task9':
        this.navigate('task9filter', {
          letterMode: 'all',
          selectedLetters: ['а'],
          sessionLength: 10
        });
        break;

      case 'task4':
        this.navigate('task4filter', {
          filterType: 'all',
          selectedParts: [],
          sessionLength: 10
        });
        break;

      case 'dictionary':
        this.navigate('dictionary', { dictTab: 'task9', searchQuery: '' });
        break;

      case 'favorites':
        this.navigate('favorites');
        break;

      case 'stats':
        this.navigate('stats');
        break;

      case 'start-task9':
        this.startTask9();
        break;

      case 'start-task4':
        this.startTask4();
        break;

      case 'quit-training':
        this.handleQuitTraining();
        break;

      case 'toggle-fav': {
        Storage.toggleFavorite(dataset.wordId, dataset.task);
        if (this.currentScreen === 'dictionary') {
          this.updateDictionaryList();
        } else {
          this.render();
        }
        break;
      }

      case 'remove-fav': {
        Storage.toggleFavorite(dataset.wordId, dataset.task);
        this.render();
        break;
      }

      case 'train-favorites':
        this.startFavoritesTraining();
        break;

      case 'train-problem-words':
        this.startProblemWordsTraining(dataset.filter || this.screenParams.problemFilter || 'all');
        break;

      case 'toggle-problem-expand':
        this.screenParams.problemsExpanded = !(this.screenParams.problemsExpanded ?? (Storage.getStats().problemWords?.length <= 3));
        this.render();
        break;

      case 'set-problem-filter':
        this.screenParams.problemFilter = dataset.filter;
        this.render();
        break;

      case 'toggle-results-mistakes':
        this.screenParams.mistakesExpanded = !(this.screenParams.mistakesExpanded ?? (this.screenParams.mistakes?.length <= 4));
        this.render();
        break;

      case 'retry-mistakes': {
        const p = this.screenParams;
        const list = p.taskType === 'task9' ? WORDS_TASK9 : WORDS_TASK4;
        const mistakeWords = (p.mistakes || [])
          .map(m => list.find(w => w.id === m.wordId))
          .filter(Boolean);
        if (mistakeWords.length > 0) {
          this.startTraining(p.taskType, mistakeWords);
        }
        break;
      }

      case 'reset-stats':
        this.showConfirmDialog(
          'Сбросить статистику?',
          'Все данные о тренировках будут удалены. Избранное сохранится.',
          () => { Storage.resetStats(); this.render(); }
        );
        break;
    }
  },

  // ==================== ВЫХОД ИЗ ТРЕНИРОВКИ ====================

  handleQuitTraining() {
    if (!this.training) {
      this.navigate('home');
      return;
    }

    const t = this.training;
    if (this._nextQuestionTimer) {
      clearTimeout(this._nextQuestionTimer);
      this._nextQuestionTimer = null;
    }

    // Если уже есть отвеченные вопросы — предлагаем сохранить результат или выйти
    if (t.answers && t.answers.length > 0) {
      const overlay = document.createElement('div');
      overlay.className = 'dialog-overlay';
      overlay.innerHTML = `
        <div class="dialog">
          <div class="dialog-title">Завершить тренировку?</div>
          <div class="dialog-text">Вы ответили на ${t.answers.length} из ${t.words.length} слов. Показать текущий результат или вернуться на главную?</div>
          <div class="dialog-buttons" style="flex-direction:column;gap:8px;">
            <button class="dialog-btn confirm" id="btnShowResults" style="background:var(--green-700);">Показать результат 📊</button>
            <button class="dialog-btn cancel" id="btnExitHome">Выйти на главную 🏠</button>
            <button class="dialog-btn cancel" id="btnContinue" style="color:var(--text-secondary);">Продолжить тренировку</button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      overlay.querySelector('#btnShowResults').onclick = () => {
        overlay.remove();
        this.finishTraining();
      };
      overlay.querySelector('#btnExitHome').onclick = () => {
        overlay.remove();
        this.training = null;
        this.navigate('home');
      };
      overlay.querySelector('#btnContinue').onclick = () => {
        overlay.remove();
      };
    } else {
      // Еще не ответили ни на один вопрос — просто возвращаемся назад
      this.training = null;
      this.navigate(t.taskType === 'task9' ? 'task9filter' : 'task4filter');
    }
  },

  // ==================== ЗАПУСК ТРЕНИРОВОК ====================

  startTask9() {
    const p = this.screenParams;
    let words = [...WORDS_TASK9];

    if ((p.letterMode === 'single' || p.letterMode === 'multi') && p.selectedLetters && p.selectedLetters.length > 0) {
      words = words.filter(w => p.selectedLetters.includes(w.firstLetter.toLowerCase()));
    }

    words = this.shuffleArray(words);

    const len = p.sessionLength || 0;
    if (len > 0 && words.length > len) {
      words = words.slice(0, len);
    }

    if (words.length === 0) {
      alert('Нет слов для тренировки с выбранными буквами');
      return;
    }

    this.startTraining('task9', words);
  },

  startTask4() {
    const p = this.screenParams;
    let words = [...WORDS_TASK4];

    if (p.filterType === 'parts' && p.selectedParts && p.selectedParts.length > 0) {
      words = words.filter(w => p.selectedParts.includes(w.partOfSpeech));
    }

    words = this.shuffleArray(words);

    const len = p.sessionLength || 0;
    if (len > 0 && words.length > len) {
      words = words.slice(0, len);
    }

    if (words.length === 0) {
      alert('Нет слов для тренировки с выбранными фильтрами');
      return;
    }

    this.startTraining('task4', words);
  },

  startFavoritesTraining() {
    const favData = Storage.getFavorites();
    const fav9 = (favData.task9 || []).map(id => WORDS_TASK9.find(w => w.id === id)).filter(Boolean);
    const fav4 = (favData.task4 || []).map(id => WORDS_TASK4.find(w => w.id === id)).filter(Boolean);

    if (fav9.length > 0 && fav4.length > 0) {
      this.showChoiceDialog(fav9, fav4);
    } else if (fav9.length > 0) {
      this.startTraining('task9', this.shuffleArray(fav9));
    } else if (fav4.length > 0) {
      this.startTraining('task4', this.shuffleArray(fav4));
    }
  },

  showChoiceDialog(fav9, fav4) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.innerHTML = `
      <div class="dialog">
        <div class="dialog-title">Что тренировать?</div>
        <div class="dialog-text">У вас есть избранные слова обоих типов</div>
        <div class="dialog-buttons" style="flex-direction:column;gap:8px;">
          <button class="dialog-btn confirm" data-choice="task9" style="background:var(--green-700)">
            №9 Словарные (${fav9.length})
          </button>
          <button class="dialog-btn confirm" data-choice="task4" style="background:var(--green-700)">
            №4 Ударения (${fav4.length})
          </button>
          <button class="dialog-btn cancel">Отмена</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.querySelector('.cancel').onclick = () => overlay.remove();
    overlay.querySelectorAll('[data-choice]').forEach(btn => {
      btn.onclick = () => {
        overlay.remove();
        if (btn.dataset.choice === 'task9') {
          this.startTraining('task9', this.shuffleArray(fav9));
        } else {
          this.startTraining('task4', this.shuffleArray(fav4));
        }
      };
    });
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  },

  startProblemWordsTraining(filter = 'all') {
    const stats = Storage.getStats();
    let problemWords = (stats.problemWords || [])
      .map(pw => WORDS_TASK9.find(w => w.id === pw.id) || WORDS_TASK4.find(w => w.id === pw.id))
      .filter(Boolean);

    if (problemWords.length === 0) {
      alert('У вас пока нет сложных слов для тренировки! 🎉');
      return;
    }

    if (filter === 'task9') {
      const task9Words = problemWords.filter(w => w.id.startsWith('t9_'));
      if (task9Words.length === 0) {
        alert('В Задании №9 нет сложных слов! 🎉');
        return;
      }
      this.startTraining('task9', this.shuffleArray(task9Words));
      return;
    }

    if (filter === 'task4') {
      const task4Words = problemWords.filter(w => w.id.startsWith('t4_'));
      if (task4Words.length === 0) {
        alert('В Задании №4 нет сложных слов! 🎉');
        return;
      }
      this.startTraining('task4', this.shuffleArray(task4Words));
      return;
    }

    const task9Words = problemWords.filter(w => w.id.startsWith('t9_'));
    const task4Words = problemWords.filter(w => w.id.startsWith('t4_'));

    if (task9Words.length > 0 && task4Words.length > 0) {
      this.showProblemChoiceDialog(task9Words, task4Words);
    } else if (task9Words.length > 0) {
      this.startTraining('task9', this.shuffleArray(task9Words));
    } else if (task4Words.length > 0) {
      this.startTraining('task4', this.shuffleArray(task4Words));
    }
  },

  showProblemChoiceDialog(task9Words, task4Words) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.innerHTML = `
      <div class="dialog">
        <div class="dialog-title">Отработка сложных слов</div>
        <div class="dialog-text">У вас есть ошибки в обоих заданиях. Что хотите повторить?</div>
        <div class="dialog-buttons" style="flex-direction:column;gap:8px;">
          <button class="dialog-btn confirm" data-choice="task9" style="background:var(--green-700)">
            📝 Задание №9 — Слова (${task9Words.length})
          </button>
          <button class="dialog-btn confirm" data-choice="task4" style="background:var(--green-700)">
            🔤 Задание №4 — Ударения (${task4Words.length})
          </button>
          <button class="dialog-btn cancel">Отмена</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.querySelector('.cancel').onclick = () => overlay.remove();
    overlay.querySelectorAll('[data-choice]').forEach(btn => {
      btn.onclick = () => {
        overlay.remove();
        if (btn.dataset.choice === 'task9') {
          this.startTraining('task9', this.shuffleArray(task9Words));
        } else {
          this.startTraining('task4', this.shuffleArray(task4Words));
        }
      };
    });
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  },

  // ==================== ЛОГИКА ТРЕНИРОВКИ ====================

  startTraining(taskType, words) {
    if (this._nextQuestionTimer) {
      clearTimeout(this._nextQuestionTimer);
      this._nextQuestionTimer = null;
    }

    this.training = {
      taskType,
      words,
      currentIndex: 0,
      answers: [],
      answered: false,
      selectedVariant: null,
      currentVariants: null
    };

    this.prepareCurrentWord();
    this.navigate('training');
  },

  prepareCurrentWord() {
    const t = this.training;
    if (!t || t.currentIndex >= t.words.length) return;

    const word = t.words[t.currentIndex];
    if (t.taskType === 'task9') {
      t.currentVariants = this.generateTask9Variants(word);
    } else {
      t.currentVariants = this.generateTask4Variants(word);
    }
  },

  generateTask9Variants(word) {
    const variants = [{ text: word.word, correct: true }];
    word.wrongLetters.forEach(wl => {
      const wrongWord = word.display.replace('_', wl);
      variants.push({ text: wrongWord, correct: false });
    });
    return this.shuffleArray(variants);
  },

  generateTask4Variants(word) {
    let wrongVariants = [...(word.wrong || [])];
    if (wrongVariants.length > 2) {
      wrongVariants = this.shuffleArray(wrongVariants).slice(0, 2);
    }
    const variants = [
      { text: word.correct, correct: true },
      ...wrongVariants.map(w => ({ text: w, correct: false }))
    ];
    return this.shuffleArray(variants);
  },

  checkAnswer(variantIndex) {
    if (!this.training || this.training.answered) return;

    const t = this.training;
    const word = t.words[t.currentIndex];
    const variant = t.currentVariants[variantIndex];

    if (!variant) return;

    const isCorrect = variant.correct;

    t.answered = true;
    t.selectedVariant = variantIndex;

    // Telegram Haptic Feedback
    try {
      const tg = window.Telegram?.WebApp;
      if (tg?.HapticFeedback) {
        if (isCorrect) {
          tg.HapticFeedback.notificationOccurred('success');
        } else {
          tg.HapticFeedback.notificationOccurred('error');
        }
      }
    } catch (e) {}

    Storage.recordAnswer(word.id, isCorrect);

    t.answers.push({
      wordId: word.id,
      word: t.taskType === 'task9' ? word.word : word.correct,
      correct: isCorrect,
      selected: variant.text
    });

    this.render();

    const delay = isCorrect ? 650 : 1600;
    this._nextQuestionTimer = setTimeout(() => {
      t.currentIndex++;
      t.answered = false;
      t.selectedVariant = null;

      if (t.currentIndex >= t.words.length) {
        this.finishTraining();
      } else {
        this.prepareCurrentWord();
        this.render();
      }
    }, delay);
  },

  finishTraining() {
    const t = this.training;
    if (!t) return;

    const correct = t.answers.filter(a => a.correct).length;
    const total = t.answers.length;
    const mistakes = t.answers.filter(a => !a.correct);

    if (total > 0) {
      Storage.addSession({
        taskType: t.taskType,
        total,
        correct,
        wrong: total - correct,
        mistakes: mistakes.map(m => m.wordId)
      });
    }

    const taskType = t.taskType;
    const answers = t.answers;
    this.training = null;

    this.navigate('results', {
      taskType: taskType,
      total,
      correct,
      answers: answers,
      mistakes
    });
  },

  // ==================== ЭКРАН: ГЛАВНАЯ ====================

  renderHome() {
    return `
      <div class="home-hero">
        <div class="dino-container">${this.getDinoSVG()}</div>
        <h1 class="home-title">Тренажёр ЕГЭ<br>по русскому языку</h1>
      </div>

      <div class="mode-cards">
        <button class="mode-card" data-action="task9">
          <div class="mode-card-icon green">📝</div>
          <div>
            <div class="mode-card-title">Задание №9</div>
            <div class="mode-card-desc">Словарные слова · ${WORDS_TASK9.length} слов</div>
          </div>
        </button>
        <button class="mode-card" data-action="task4">
          <div class="mode-card-icon green">🔤</div>
          <div>
            <div class="mode-card-title">Задание №4</div>
            <div class="mode-card-desc">Ударения · ${WORDS_TASK4.length} слов</div>
          </div>
        </button>
      </div>
      <div class="quick-actions">
        <button class="quick-btn" data-action="dictionary">📖 Словарик</button>
        <button class="quick-btn" data-action="favorites">⭐ Избранное</button>
        <button class="quick-btn" data-action="stats">📊 Статистика</button>
      </div>
    `;
  },

  // ==================== ЭКРАН: ФИЛЬТР ЗАДАНИЕ №9 ====================

  renderTask9Filter() {
    const letterMode = this.screenParams.letterMode || 'all';
    const selectedLetters = this.screenParams.selectedLetters || [];
    const sessionLength = this.screenParams.sessionLength ?? 10;

    const letterCounts = {};
    WORDS_TASK9.forEach(w => {
      const l = w.firstLetter.toLowerCase();
      letterCounts[l] = (letterCounts[l] || 0) + 1;
    });
    const availableLetters = Object.keys(letterCounts).sort((a, b) => a.localeCompare(b, 'ru'));

    let filteredCount = WORDS_TASK9.length;
    let sampleWords = '';

    if (letterMode !== 'all') {
      if (selectedLetters.length > 0) {
        const matched = WORDS_TASK9.filter(w => selectedLetters.includes(w.firstLetter.toLowerCase()));
        filteredCount = matched.length;
        const samples = matched.slice(0, 4).map(w => w.word).join(', ');
        sampleWords = samples + (matched.length > 4 ? '...' : '');
      } else {
        filteredCount = 0;
      }
    }

    const displayCount = (sessionLength > 0 && filteredCount > sessionLength) ? sessionLength : filteredCount;

    return `
      <div class="screen-header">
        <button class="back-btn" data-action="back">←</button>
        <h2 class="screen-title">Задание №9 — Словарные слова</h2>
      </div>

      <div class="filter-section">
        <div class="filter-label">Количество слов в сессии</div>
        <div class="session-pills">
          ${[10, 20, 30, 0].map(n => `
            <button class="pill ${sessionLength === n ? 'active' : ''}" data-session-length="${n}">
              ${n === 0 ? 'Все' : n}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="filter-section">
        <div class="filter-label">Режим выбора слов</div>
        <div class="filter-modes">
          <button class="filter-mode ${letterMode === 'all' ? 'active' : ''}" data-letter-mode="all">
            <div class="filter-mode-radio"></div>
            <div>
              <span class="filter-mode-text">Все слова</span>
              <div class="filter-mode-desc">Тренировка по всему банку (${WORDS_TASK9.length} слов)</div>
            </div>
          </button>
          <button class="filter-mode ${letterMode === 'single' ? 'active' : ''}" data-letter-mode="single">
            <div class="filter-mode-radio"></div>
            <div>
              <span class="filter-mode-text">Одна буква</span>
              <div class="filter-mode-desc">Тренировать слова на выбранную букву (например: только на букву «А»)</div>
            </div>
          </button>
          <button class="filter-mode ${letterMode === 'multi' ? 'active' : ''}" data-letter-mode="multi">
            <div class="filter-mode-radio"></div>
            <div>
              <span class="filter-mode-text">Несколько букв</span>
              <div class="filter-mode-desc">Выбрать нужные начальные буквы (например: «А», «Б» и «В»)</div>
            </div>
          </button>
        </div>
      </div>

      ${letterMode !== 'all' ? `
        <div class="filter-section">
          <div class="filter-label">
            ${letterMode === 'single' ? 'С какой буквы начинаются слова (выберите одну)' : 'С каких букв начинаются слова (выберите несколько)'}
          </div>
          <div class="letter-grid">
            ${availableLetters.map(l => `
              <button class="letter-btn ${selectedLetters.includes(l) ? 'active' : ''}" data-letter="${l}">
                ${l.toUpperCase()}<span class="letter-count">${letterCounts[l]}</span>
              </button>
            `).join('')}
          </div>

          ${selectedLetters.length > 0 ? `
            <div class="filter-hint">
              Выбрано: <b>${filteredCount} слов</b>, начинающихся на: 
              <b>${selectedLetters.map(l => l.toUpperCase()).join(', ')}</b>
              ${sampleWords ? `<div style="font-size:12px;margin-top:4px;opacity:0.85;">Слова: ${sampleWords}</div>` : ''}
            </div>
          ` : '<div class="filter-hint">Нажмите на букву выше, чтобы начать тренировку</div>'}
        </div>
      ` : ''}

      <button class="start-btn" data-action="start-task9"
        ${(letterMode !== 'all' && selectedLetters.length === 0) ? 'disabled' : ''}>
        Начать тренировку (${displayCount} слов) 🚀
      </button>
    `;
  },

  // ==================== ЭКРАН: ФИЛЬТР ЗАДАНИЕ №4 ====================

  renderTask4Filter() {
    const parts = [...new Set(WORDS_TASK4.map(w => w.partOfSpeech))];
    const selectedParts = this.screenParams.selectedParts || [];
    const sessionLength = this.screenParams.sessionLength ?? 10;
    const filterType = this.screenParams.filterType || 'all';

    let filteredCount = WORDS_TASK4.length;
    if (filterType === 'parts' && selectedParts.length > 0) {
      filteredCount = WORDS_TASK4.filter(w => selectedParts.includes(w.partOfSpeech)).length;
    }
    const displayCount = (sessionLength > 0 && filteredCount > sessionLength) ? sessionLength : filteredCount;

    return `
      <div class="screen-header">
        <button class="back-btn" data-action="back">←</button>
        <h2 class="screen-title">Задание №4 — Ударения</h2>
      </div>

      <div class="filter-section">
        <div class="filter-label">Количество слов</div>
        <div class="session-pills">
          ${[10, 20, 30, 0].map(n => `
            <button class="pill ${sessionLength === n ? 'active' : ''}" data-session-length="${n}">
              ${n === 0 ? 'Все' : n}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="filter-section">
        <div class="filter-label">Фильтр по части речи</div>
        <div class="filter-modes">
          <button class="filter-mode ${filterType === 'all' ? 'active' : ''}" data-filter-type="all">
            <div class="filter-mode-radio"></div>
            <div>
              <span class="filter-mode-text">Все части речи</span>
              <div class="filter-mode-desc">Все слова из орфоэпического словника (${WORDS_TASK4.length} слов)</div>
            </div>
          </button>
          <button class="filter-mode ${filterType === 'parts' ? 'active' : ''}" data-filter-type="parts">
            <div class="filter-mode-radio"></div>
            <div>
              <span class="filter-mode-text">Выбрать части речи</span>
              <div class="filter-mode-desc">Только глаголы, существительные или прилагательные</div>
            </div>
          </button>
        </div>
      </div>

      ${filterType === 'parts' ? `
        <div class="filter-section">
          <div class="filter-label">Части речи</div>
          <div class="filter-modes">
            ${parts.map(p => `
              <button class="filter-mode ${selectedParts.includes(p) ? 'active' : ''}" data-part="${p}">
                <div class="filter-mode-radio"></div>
                <span class="filter-mode-text">${p.charAt(0).toUpperCase() + p.slice(1)}</span>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <button class="start-btn" data-action="start-task4"
        ${filterType === 'parts' && selectedParts.length === 0 ? 'disabled' : ''}>
        Начать тренировку (${displayCount} слов) 🚀
      </button>
    `;
  },

  // ==================== ЭКРАН: ТРЕНИРОВКА ====================

  renderTraining() {
    if (!this.training) return '<p>Ошибка: тренировка не начата</p>';

    const t = this.training;
    const word = t.words[t.currentIndex];
    const progress = ((t.currentIndex) / t.words.length) * 100;
    const isFav = Storage.isFavorite(word.id);
    const variants = t.currentVariants;

    if (!variants) return '<p>Ошибка: варианты не загружены</p>';

    let questionText = '';
    let questionHint = '';

    if (t.taskType === 'task9') {
      questionText = word.display;
      questionHint = 'Выберите правильное написание';
    } else {
      questionText = word.word;
      questionHint = 'Выберите правильное ударение';
    }

    const variantsHTML = variants.map((v, i) => {
      let cls = 'variant-btn';
      if (t.answered) {
        if (v.correct) cls += ' correct';
        else if (i === t.selectedVariant) cls += ' wrong';
      }
      return `
        <button class="${cls}" data-variant="${i}" ${t.answered ? 'disabled' : ''}>
          ${this.escapeHTML(v.text)}
        </button>
      `;
    }).join('');

    return `
      <div class="training-header">
        <button class="training-quit-btn" data-action="quit-training" title="Прервать тренировку">✕ Выйти</button>
        <span class="progress-text">${t.currentIndex + 1} / ${t.words.length}</span>
      </div>

      <div class="training-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>

      <div class="training-card">
        <button class="fav-toggle ${isFav ? 'active' : ''}"
                data-action="toggle-fav" data-word-id="${word.id}" data-task="${t.taskType}">
          ${isFav ? '⭐' : '☆'}
        </button>

        <div class="training-word">
          <div class="training-word-display">${this.escapeHTML(questionText)}</div>
          <div class="training-word-hint">${questionHint}</div>
        </div>

        <div class="variants">
          ${variantsHTML}
        </div>
      </div>
    `;
  },

  // ==================== ЭКРАН: РЕЗУЛЬТАТЫ ====================

  renderResults() {
    const p = this.screenParams;
    const percent = p.total > 0 ? Math.round((p.correct / p.total) * 100) : 0;
    const taskLabel = p.taskType === 'task9' ? 'Задание №9' : 'Задание №4';

    let emoji = '🎉';
    if (percent < 50) emoji = '😤';
    else if (percent < 70) emoji = '💪';
    else if (percent < 90) emoji = '👏';

    const mistakesCount = (p.mistakes && p.mistakes.length) || 0;
    const isMistakesExpanded = p.mistakesExpanded !== undefined
      ? p.mistakesExpanded
      : (mistakesCount <= 4);
    const visibleMistakes = isMistakesExpanded ? (p.mistakes || []) : (p.mistakes || []).slice(0, 3);

    const mistakesHTML = mistakesCount > 0 ? `
      <div class="results-list">
        <div class="stat-section-header-toggle" data-action="toggle-results-mistakes" style="margin-top:0;">
          <div class="stat-section-title-wrap">
            <span class="results-list-title" style="margin-bottom:0;">Ошибки</span>
            <span class="stat-section-badge" style="background:var(--red-50);color:var(--red-500);border-color:var(--red-400);">${mistakesCount}</span>
          </div>
          <div class="stat-section-toggle-indicator" style="color:var(--red-500);">
            <span>${isMistakesExpanded ? 'Свернуть' : 'Все ' + mistakesCount}</span>
            <span class="toggle-arrow ${isMistakesExpanded ? 'expanded' : ''}">▼</span>
          </div>
        </div>
        ${visibleMistakes.map(m => {
          const isFav = Storage.isFavorite(m.wordId);
          return `
            <div class="result-item">
              <div>
                <span class="result-item-word result-item-correct">${this.escapeHTML(m.word)}</span>
                <span class="result-item-wrong">${this.escapeHTML(m.selected)}</span>
              </div>
              <button class="result-item-fav ${isFav ? 'active' : ''}"
                      data-action="toggle-fav" data-word-id="${m.wordId}" data-task="${p.taskType}">
                ${isFav ? '⭐' : '☆'}
              </button>
            </div>
          `;
        }).join('')}
        ${(!isMistakesExpanded && mistakesCount > 3) ? `
          <button class="collapse-hint-btn" data-action="toggle-results-mistakes">
            Показать все ${mistakesCount} ошибок ▼
          </button>
        ` : ''}
      </div>
    ` : '';

    return `
      <div class="results-hero">
        <div style="font-size: 48px; margin-bottom: 12px;">${emoji}</div>
        <div class="results-score">${p.correct}/${p.total}</div>
        <div class="results-label">${taskLabel}</div>
        <div class="results-percent">${percent}% правильно</div>
      </div>

      ${mistakesHTML}

      <div class="results-actions">
        ${(p.mistakes && p.mistakes.length > 0) ? `
          <button class="btn-primary" style="background:#EF5350;" data-action="retry-mistakes">
            Повторить ошибки (${p.mistakes.length}) 🔄
          </button>
        ` : ''}
        <button class="btn-primary" data-action="${p.taskType === 'task9' ? 'task9' : 'task4'}">
          Тренироваться ещё
        </button>
        <button class="btn-secondary" data-action="home">На главную</button>
      </div>
    `;
  },

  // ==================== ЭКРАН: СЛОВАРИК ====================

  renderDictionary() {
    const activeTab = this.screenParams.dictTab || 'task9';
    const dictSort = this.screenParams.dictSort || 'alpha'; // 'alpha' or 'pos'
    const dictLetter = (this.screenParams.dictLetter || '').toUpperCase();

    // Получаем доступный набор начальных букв для текущего задания
    const baseWords = activeTab === 'task9' ? WORDS_TASK9 : WORDS_TASK4;
    const letterCounts = {};
    baseWords.forEach(w => {
      const l = (w.firstLetter || w.word[0] || '').toUpperCase();
      if (l) letterCounts[l] = (letterCounts[l] || 0) + 1;
    });
    const availableLetters = Object.keys(letterCounts).sort((a, b) => a.localeCompare(b, 'ru'));

    // Горизонтальная лента букв для мгновенного выбора
    const letterStripHTML = `
      <div class="dict-letter-strip">
        <button class="dict-letter-chip ${!dictLetter ? 'active' : ''}" data-letter="">
          Все (${baseWords.length})
        </button>
        ${availableLetters.map(l => `
          <button class="dict-letter-chip ${dictLetter === l ? 'active' : ''}" data-letter="${l}">
            ${l} <span class="dict-chip-count">${letterCounts[l]}</span>
          </button>
        `).join('')}
      </div>
    `;

    return `
      <div class="screen-header">
        <h2 class="screen-title">📖 Словарик</h2>
      </div>

      <!-- Вкладки заданий -->
      <div class="dict-tabs">
        <button class="dict-tab ${activeTab === 'task9' ? 'active' : ''}" data-dict-tab="task9">
          Задание №9 (${WORDS_TASK9.length})
        </button>
        <button class="dict-tab ${activeTab === 'task4' ? 'active' : ''}" data-dict-tab="task4">
          Задание №4 (${WORDS_TASK4.length})
        </button>
      </div>

      <!-- Поиск слова -->
      <div class="dict-search-wrap">
        <span class="dict-search-icon">🔍</span>
        <input class="dict-search" type="text" placeholder="Поиск слова..."
               value="${this.escapeAttr(this.screenParams.searchQuery || '')}">
      </div>

      <!-- Сортировка для Задания №4 (по первой букве алфавита / по частям речи) -->
      ${activeTab === 'task4' ? `
        <div class="dict-sort-bar">
          <button class="dict-sort-btn ${dictSort === 'alpha' ? 'active' : ''}" data-dict-sort="alpha">
            🔤 По первой букве (А-Я)
          </button>
          <button class="dict-sort-btn ${dictSort === 'pos' ? 'active' : ''}" data-dict-sort="pos">
            🏷️ По частям речи
          </button>
        </div>
      ` : ''}

      <!-- Быстрый фильтр по буквам -->
      ${letterStripHTML}

      <!-- Контейнер списка слов -->
      <div id="dictListContainer">
        ${this.buildDictionaryListHTML()}
      </div>
    `;
  },

  updateDictionaryList() {
    const container = document.getElementById('dictListContainer');
    if (container) {
      container.innerHTML = this.buildDictionaryListHTML();
    }
  },

  buildDictionaryListHTML() {
    const activeTab = this.screenParams.dictTab || 'task9';
    const dictSort = this.screenParams.dictSort || 'alpha';
    const dictLetter = (this.screenParams.dictLetter || '').toUpperCase();
    const searchQuery = (this.screenParams.searchQuery || '').toLowerCase().trim();

    let words = activeTab === 'task9' ? [...WORDS_TASK9] : [...WORDS_TASK4];

    // Фильтр по поиску
    if (searchQuery) {
      words = words.filter(w => w.word.toLowerCase().includes(searchQuery));
    }

    // Фильтр по выбранной первой букве
    if (dictLetter) {
      words = words.filter(w => (w.firstLetter || w.word[0] || '').toUpperCase() === dictLetter);
    }

    // Если ничего не найдено
    if (words.length === 0) {
      return `
        <div class="empty-state-mini" style="margin-top: 16px;">
          <div style="font-size: 28px; margin-bottom: 8px;">🔍</div>
          <p class="empty-state-desc">
            ${searchQuery ? `По запросу <b>«${this.escapeHTML(searchQuery)}»</b> ничего не найдено` : 'Нет слов на выбранную букву'}
          </p>
        </div>
      `;
    }

    const metaHTML = `
      <div class="dict-meta-bar">
        <span class="dict-count">Найдено: <b>${words.length}</b> слов</span>
        ${dictLetter ? `<span class="dict-filter-tag">Буква «${dictLetter}»</span>` : ''}
      </div>
    `;

    // 1. Задание №9: алфавитная группировка по первой букве
    if (activeTab === 'task9') {
      const grouped = {};
      words.forEach(w => {
        const letter = (w.firstLetter || w.word[0] || '').toUpperCase();
        if (!grouped[letter]) grouped[letter] = [];
        grouped[letter].push(w);
      });

      const sortedLetters = Object.keys(grouped).sort((a, b) => a.localeCompare(b, 'ru'));
      const listHTML = sortedLetters.map(letter => {
        const letterWords = grouped[letter].sort((a, b) => a.word.localeCompare(b.word, 'ru'));
        return `
          <div class="dict-section-header">${letter} <span class="dict-section-count">(${letterWords.length})</span></div>
          ${letterWords.map(w => {
            const isFav = Storage.isFavorite(w.id);
            return `
              <div class="dict-word-card">
                <div>
                  <div class="dict-word-text">${this.highlightLetter(w.word, w.display)}</div>
                  <div class="dict-word-meta">буква в пропуске: <b>${w.correctLetter}</b></div>
                </div>
                <button class="dict-word-fav ${isFav ? 'active' : ''}"
                        data-action="toggle-fav" data-word-id="${w.id}" data-task="task9"
                        title="${isFav ? 'В избранном' : 'Добавить в избранное'}">
                  ${isFav ? '⭐' : '☆'}
                </button>
              </div>
            `;
          }).join('')}
        `;
      }).join('');

      return metaHTML + listHTML;
    }

    // 2. Задание №4: группировка по частям речи (если выбран режим 'pos')
    if (dictSort === 'pos') {
      const grouped = {};
      words.forEach(w => {
        const pos = w.partOfSpeech || 'другое';
        if (!grouped[pos]) grouped[pos] = [];
        grouped[pos].push(w);
      });

      const listHTML = Object.entries(grouped).map(([pos, posWords]) => {
        const sortedPosWords = posWords.sort((a, b) => a.word.localeCompare(b.word, 'ru'));
        return `
          <div class="dict-section-header">${pos.charAt(0).toUpperCase() + pos.slice(1)} <span class="dict-section-count">(${sortedPosWords.length})</span></div>
          ${sortedPosWords.map(w => {
            const isFav = Storage.isFavorite(w.id);
            return `
              <div class="dict-word-card">
                <div>
                  <div class="dict-word-text">${this.highlightStress(w.correct)}</div>
                </div>
                <button class="dict-word-fav ${isFav ? 'active' : ''}"
                        data-action="toggle-fav" data-word-id="${w.id}" data-task="task4"
                        title="${isFav ? 'В избранном' : 'Добавить в избранное'}">
                  ${isFav ? '⭐' : '☆'}
                </button>
              </div>
            `;
          }).join('')}
        `;
      }).join('');

      return metaHTML + listHTML;
    }

    // 3. Задание №4: сортировка и группировка по первой букве А-Я
    const grouped = {};
    words.forEach(w => {
      const letter = (w.firstLetter || w.word[0] || '').toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(w);
    });

    const sortedLetters = Object.keys(grouped).sort((a, b) => a.localeCompare(b, 'ru'));
    const listHTML = sortedLetters.map(letter => {
      const letterWords = grouped[letter].sort((a, b) => a.word.localeCompare(b.word, 'ru'));
      return `
        <div class="dict-section-header">${letter} <span class="dict-section-count">(${letterWords.length})</span></div>
        ${letterWords.map(w => {
          const isFav = Storage.isFavorite(w.id);
          return `
            <div class="dict-word-card">
              <div>
                <div class="dict-word-text">${this.highlightStress(w.correct)}</div>
                <div class="dict-word-pos-tag">${w.partOfSpeech || ''}</div>
              </div>
              <button class="dict-word-fav ${isFav ? 'active' : ''}"
                      data-action="toggle-fav" data-word-id="${w.id}" data-task="task4"
                      title="${isFav ? 'В избранном' : 'Добавить в избранное'}">
                ${isFav ? '⭐' : '☆'}
              </button>
            </div>
          `;
        }).join('')}
      `;
    }).join('');

    return metaHTML + listHTML;
  },

  highlightLetter(word, display) {
    if (!word) return '';
    if (!display || typeof display !== 'string') return this.escapeHTML(word);
    const gapIndex = display.indexOf('_');
    if (gapIndex === -1 || gapIndex >= word.length) return this.escapeHTML(word);

    const before = this.escapeHTML(word.substring(0, gapIndex));
    const letter = this.escapeHTML(word[gapIndex]);
    const after = this.escapeHTML(word.substring(gapIndex + 1));

    return `${before}<span class="dict-word-highlight">${letter}</span>${after}`;
  },

  highlightStress(text) {
    if (!text) return '';
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (/[А-ЯЁ]/.test(ch)) {
        result += `<span class="dict-word-highlight">${this.escapeHTML(ch)}</span>`;
      } else {
        result += this.escapeHTML(ch);
      }
    }
    return result;
  },

  // ==================== ЭКРАН: ИЗБРАННОЕ ====================

  renderFavorites() {
    const favData = Storage.getFavorites();
    const fav9 = (favData.task9 || []).map(id => WORDS_TASK9.find(w => w.id === id)).filter(Boolean);
    const fav4 = (favData.task4 || []).map(id => WORDS_TASK4.find(w => w.id === id)).filter(Boolean);
    const isEmpty = fav9.length === 0 && fav4.length === 0;

    if (isEmpty) {
      return `
        <div class="screen-header">
          <h2 class="screen-title">⭐ Избранное</h2>
        </div>
        <div class="empty-state">
          <div class="dino-container">${this.getDinoSVG('sad')}</div>
          <h3 class="empty-state-title">Пока пусто!</h3>
          <p class="empty-state-desc">Добавляй слова ⭐ во время тренировки или из словарика</p>
        </div>
      `;
    }

    let contentHTML = '';
    const totalFavs = fav9.length + fav4.length;

    if (fav9.length > 0) {
      contentHTML += `
        <div class="fav-section-title">Задание №9 — Словарные слова (${fav9.length})</div>
        ${fav9.map(w => `
          <div class="fav-word-card">
            <div class="dict-word-text">${this.highlightLetter(w.word, w.display)}</div>
            <button class="fav-remove-btn" data-action="remove-fav" data-word-id="${w.id}" data-task="task9">✕</button>
          </div>
        `).join('')}
      `;
    }

    if (fav4.length > 0) {
      contentHTML += `
        <div class="fav-section-title">Задание №4 — Ударения (${fav4.length})</div>
        ${fav4.map(w => `
          <div class="fav-word-card">
            <div class="dict-word-text">${this.highlightStress(w.correct)}</div>
            <button class="fav-remove-btn" data-action="remove-fav" data-word-id="${w.id}" data-task="task4">✕</button>
          </div>
        `).join('')}
      `;
    }

    return `
      <div class="screen-header">
        <h2 class="screen-title">⭐ Избранное</h2>
      </div>

      ${totalFavs >= 1 ? `
        <button class="start-btn mb-16" data-action="train-favorites">
          Тренировать избранное (${totalFavs}) 🚀
        </button>
      ` : ''}

      ${contentHTML}
    `;
  },

  // ==================== ЭКРАН: СТАТИСТИКА ====================

  renderStats() {
    const stats = Storage.getStats();

    // Фильтруем проблемные слова, проверяя их существование в текущей базе
    const allProblemWords = (stats.problemWords || [])
      .map(pw => {
        const word = WORDS_TASK9.find(w => w.id === pw.id) || WORDS_TASK4.find(w => w.id === pw.id);
        if (!word) return null;
        const isTask9 = word.id.startsWith('t9_');
        return {
          ...pw,
          wordObj: word,
          isTask9,
          taskType: isTask9 ? 'task9' : 'task4',
          displayName: isTask9 ? word.word : word.correct,
          displayHighlighted: isTask9
            ? this.highlightLetter(word.word, word.display)
            : this.highlightStress(word.correct)
        };
      })
      .filter(Boolean);

    const task9ProblemWords = allProblemWords.filter(w => w.isTask9);
    const task4ProblemWords = allProblemWords.filter(w => !w.isTask9);

    const currentFilter = this.screenParams.problemFilter || 'all';
    const isExpanded = this.screenParams.problemsExpanded !== undefined
      ? this.screenParams.problemsExpanded
      : (allProblemWords.length <= 3);

    let displayWords = allProblemWords;
    if (currentFilter === 'task9') displayWords = task9ProblemWords;
    else if (currentFilter === 'task4') displayWords = task4ProblemWords;

    // HTML сессий
    const sessionsHTML = (stats.lastSessions && stats.lastSessions.length > 0) ?
      stats.lastSessions.map(s => {
        let dateStr = '';
        let timeStr = '';
        try {
          const d = new Date(s.date);
          if (!isNaN(d.getTime())) {
            dateStr = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
            timeStr = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
          }
        } catch (e) {}

        const isTask9 = s.taskType === 'task9';
        const label = isTask9 ? '№9 Словарные слова' : '№4 Ударения';
        const icon = isTask9 ? '📝' : '🔤';
        const total = Number(s.total) || 0;
        const correct = Number(s.correct) || 0;
        const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
        const scoreClass = percent >= 80 ? 'score-high' : (percent >= 50 ? 'score-mid' : 'score-low');

        return `
          <div class="stat-session-item">
            <div class="stat-session-info">
              <div class="stat-session-type">${icon} ${label}</div>
              <div class="stat-session-date">${dateStr || 'Недавно'}${timeStr ? ', ' + timeStr : ''}</div>
            </div>
            <div class="stat-session-score ${scoreClass}">
              ${correct}/${total} <span class="stat-session-pct">(${percent}%)</span>
            </div>
          </div>
        `;
      }).join('') :
      `
        <div class="empty-state-mini">
          <p class="empty-state-desc">Пока нет завершённых сессий. Пройдите любую тренировку, чтобы отслеживать прогресс!</p>
        </div>
      `;

    // HTML проблемных слов
    let problemContent = '';
    if (allProblemWords.length > 0) {
      const wordsListHTML = displayWords.map(pw => {
        const isFav = Storage.isFavorite(pw.id);
        const errorPercent = Math.round(pw.errorRate * 100);
        const taskTag = pw.isTask9 ? '№9' : '№4';
        return `
          <div class="stat-problem-card">
            <div class="stat-problem-main">
              <span class="stat-task-badge ${pw.isTask9 ? 't9' : 't4'}">${taskTag}</span>
              <span class="dict-word-text">${pw.displayHighlighted}</span>
            </div>
            <div class="stat-problem-actions">
              <span class="stat-error-chip" title="Ошибок: ${pw.wrong}">
                ${pw.wrong} ош. (${errorPercent}%)
              </span>
              <button class="dict-word-fav ${isFav ? 'active' : ''}"
                      data-action="toggle-fav" data-word-id="${pw.id}" data-task="${pw.taskType}"
                      title="${isFav ? 'В избранном' : 'Добавить в избранное'}">
                ${isFav ? '⭐' : '☆'}
              </button>
            </div>
          </div>
        `;
      }).join('');

      const filterTag = currentFilter === 'task9' ? ' (№9)' : (currentFilter === 'task4' ? ' (№4)' : '');

      problemContent = `
        <div class="stat-section-card">
          <div class="stat-section-header-toggle" data-action="toggle-problem-expand" role="button" tabindex="0">
            <div class="stat-section-title-wrap">
              <span class="stat-section-title">Сложные слова</span>
              <span class="stat-section-badge">${allProblemWords.length}</span>
            </div>
            <div class="stat-section-toggle-indicator">
              <span>${isExpanded ? 'Скрыть' : 'Раскрыть'}</span>
              <span class="toggle-arrow ${isExpanded ? 'expanded' : ''}">▼</span>
            </div>
          </div>

          <button class="start-btn mb-12" data-action="train-problem-words" data-filter="${currentFilter}"
                  ${displayWords.length === 0 ? 'disabled' : ''}>
            Отработать сложные слова${filterTag} (${displayWords.length}) 🎯
          </button>

          ${isExpanded ? `
            <!-- Фильтр по заданиям -->
            <div class="problem-filter-pills">
              <button class="problem-pill ${currentFilter === 'all' ? 'active' : ''}"
                      data-action="set-problem-filter" data-filter="all">
                Все (${allProblemWords.length})
              </button>
              <button class="problem-pill ${currentFilter === 'task9' ? 'active' : ''}"
                      data-action="set-problem-filter" data-filter="task9">
                📝 №9 (${task9ProblemWords.length})
              </button>
              <button class="problem-pill ${currentFilter === 'task4' ? 'active' : ''}"
                      data-action="set-problem-filter" data-filter="task4">
                🔤 №4 (${task4ProblemWords.length})
              </button>
            </div>

            <div class="problem-words-list">
              ${displayWords.length > 0 ? wordsListHTML : '<p class="empty-filter-hint">В этом разделе сложных слов нет 🎉</p>'}
            </div>

            <button class="collapse-hint-btn" data-action="toggle-problem-expand">
              Свернуть список ▲
            </button>
          ` : `
            <button class="collapse-hint-btn" style="margin-top:0;" data-action="toggle-problem-expand">
              Развернуть список слов (${allProblemWords.length}) ▼
            </button>
          `}
        </div>
      `;
    } else {
      problemContent = `
        <div class="stat-section-header">
          <div class="stat-section-title">Сложные слова</div>
          <span class="stat-section-badge">0</span>
        </div>
        <div class="empty-state-mini">
          <div style="font-size: 26px; margin-bottom: 6px;">🎉</div>
          <p class="empty-state-desc">Отлично! Сложных слов пока нет. Тренируйтесь регулярно, чтобы закрепить материал!</p>
        </div>
      `;
    }

    return `
      <div class="screen-header">
        <h2 class="screen-title">📊 Статистика и прогресс</h2>
      </div>

      <!-- Главная сводка -->
      <div class="stat-summary-card">
        <div class="stat-summary-item">
          <div class="stat-summary-num">${stats.totalPracticed}</div>
          <div class="stat-summary-text">Слов решено</div>
        </div>
        <div class="stat-summary-divider"></div>
        <div class="stat-summary-item">
          <div class="stat-summary-num">${stats.overallPercent}%</div>
          <div class="stat-summary-text">Точность</div>
        </div>
        <div class="stat-summary-divider"></div>
        <div class="stat-summary-item">
          <div class="stat-summary-num">${stats.totalSessions}</div>
          <div class="stat-summary-text">Тренировок</div>
        </div>
      </div>

      <!-- Детализация по заданиям -->
      <div class="stat-cards">
        <div class="stat-card">
          <div class="stat-card-top">
            <span class="stat-card-badge">Задание №9</span>
            <span class="stat-card-icon">📝</span>
          </div>
          <div class="stat-card-value">${stats.task9.total} <span class="stat-card-unit">слов</span></div>
          <div class="stat-card-meta">
            <span>Точность: <b>${stats.task9.percent}%</b></span>
            <span>(${stats.task9.correct}/${stats.task9.total})</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-card-top">
            <span class="stat-card-badge">Задание №4</span>
            <span class="stat-card-icon">🔤</span>
          </div>
          <div class="stat-card-value">${stats.task4.total} <span class="stat-card-unit">слов</span></div>
          <div class="stat-card-meta">
            <span>Точность: <b>${stats.task4.percent}%</b></span>
            <span>(${stats.task4.correct}/${stats.task4.total})</span>
          </div>
        </div>
      </div>

      <!-- Проблемные слова -->
      ${problemContent}

      <!-- История сессий -->
      <div class="stat-section-header mt-16">
        <div class="stat-section-title">История тренировок</div>
        <span class="stat-section-badge">${stats.lastSessions.length}</span>
      </div>
      ${sessionsHTML}

      <button class="stat-reset-btn" data-action="reset-stats">Сбросить статистику</button>
    `;
  },

  // ==================== ДИАЛОГИ ====================

  showConfirmDialog(title, text, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.innerHTML = `
      <div class="dialog">
        <div class="dialog-title">${title}</div>
        <div class="dialog-text">${text}</div>
        <div class="dialog-buttons">
          <button class="dialog-btn cancel">Отмена</button>
          <button class="dialog-btn confirm">Сбросить</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.querySelector('.cancel').onclick = () => overlay.remove();
    overlay.querySelector('.confirm').onclick = () => { onConfirm(); overlay.remove(); };
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  },

  // ==================== ДИНОЗАВРИК ====================

  // ==================== ДИНОЗАВРИК ====================

  getDinoSVG(mood = 'happy') {
    const body = '#4CAF50';
    const belly = '#C8E6C9';
    const eye = '#1F2937';
    const spike = '#2E7D32';
    const blush = '#FF8A80';
    const foot = '#43A047';

    if (mood === 'sad') {
      return `
        <svg class="dino-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <!-- Шипы на спине -->
          <path d="M 45 22 Q 48 11, 53 20 Z" fill="${spike}"/>
          <path d="M 55 18 Q 60 7, 65 18 Z" fill="${spike}"/>
          <path d="M 67 22 Q 72 12, 76 22 Z" fill="${spike}"/>

          <!-- Хвостик (поникший) -->
          <path d="M 84 80 Q 98 84, 108 88 Q 104 96, 88 92 Q 82 90, 80 84 Z" fill="${body}"/>

          <!-- Ножки -->
          <ellipse cx="44" cy="99" rx="10" ry="5.5" fill="${foot}"/>
          <ellipse cx="76" cy="99" rx="10" ry="5.5" fill="${foot}"/>

          <!-- Тело -->
          <ellipse cx="60" cy="76" rx="31" ry="27" fill="${body}"/>
          <ellipse cx="60" cy="80" rx="19" ry="18" fill="${belly}"/>

          <!-- Голова -->
          <circle cx="60" cy="42" r="23" fill="${body}"/>

          <!-- Грустные бровки -->
          <path d="M 47 30 L 53 32" stroke="${eye}" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M 73 30 L 67 32" stroke="${eye}" stroke-width="1.8" stroke-linecap="round"/>

          <!-- Глазки (слегка печальные с бликами) -->
          <ellipse cx="50" cy="38" rx="4.5" ry="4" fill="${eye}"/>
          <ellipse cx="70" cy="38" rx="4.5" ry="4" fill="${eye}"/>
          <circle cx="49" cy="36.5" r="1.6" fill="white"/>
          <circle cx="69" cy="36.5" r="1.6" fill="white"/>

          <!-- Слезинка -->
          <path d="M 75 42 Q 77 47, 75 49 Q 73 47, 75 42 Z" fill="#64B5F6"/>

          <!-- Щёчки -->
          <circle cx="42" cy="44" r="3.5" fill="${blush}" opacity="0.35"/>
          <circle cx="78" cy="44" r="3.5" fill="${blush}" opacity="0.35"/>

          <!-- Поникший ротик -->
          <path d="M 53 48 Q 60 43, 67 48" stroke="${eye}" stroke-width="2" fill="none" stroke-linecap="round"/>

          <!-- Лапки -->
          <ellipse cx="46" cy="72" rx="6" ry="5" fill="${body}" transform="rotate(-10 46 72)"/>
          <ellipse cx="74" cy="72" rx="6" ry="5" fill="${body}" transform="rotate(10 74 72)"/>
        </svg>
      `;
    }

    return `
      <svg class="dino-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Шипы на спине (аккуратные и симметричные) -->
        <path d="M 45 20 Q 49 8, 54 18 Z" fill="${spike}"/>
        <path d="M 55 16 Q 60 4, 65 16 Z" fill="${spike}"/>
        <path d="M 66 20 Q 71 8, 75 20 Z" fill="${spike}"/>

        <!-- Задорный хвостик -->
        <path d="M 85 75 C 99 71, 109 63, 112 56 C 112 68, 103 86, 85 87 Z" fill="${body}"/>
        <path d="M 99 66 Q 103 60, 107 65 Z" fill="${spike}"/>

        <!-- Ножки с пальчиками -->
        <ellipse cx="44" cy="99" rx="10" ry="5.5" fill="${foot}"/>
        <ellipse cx="76" cy="99" rx="10" ry="5.5" fill="${foot}"/>

        <!-- Тело и мягкий животик -->
        <ellipse cx="60" cy="76" rx="31" ry="27" fill="${body}"/>
        <ellipse cx="60" cy="80" rx="19" ry="18" fill="${belly}"/>

        <!-- Голова -->
        <circle cx="60" cy="42" r="23" fill="${body}"/>

        <!-- Глазки (выразительные, с двойными бликами) -->
        <circle cx="50" cy="38" r="4.8" fill="${eye}"/>
        <circle cx="70" cy="38" r="4.8" fill="${eye}"/>
        <circle cx="48.5" cy="36.5" r="1.8" fill="white"/>
        <circle cx="68.5" cy="36.5" r="1.8" fill="white"/>
        <circle cx="51.5" cy="39.5" r="0.9" fill="white"/>
        <circle cx="71.5" cy="39.5" r="0.9" fill="white"/>

        <!-- Нежные щёчки -->
        <circle cx="42" cy="44" r="4" fill="${blush}" opacity="0.45"/>
        <circle cx="78" cy="44" r="4" fill="${blush}" opacity="0.45"/>

        <!-- Милая улыбка -->
        <path d="M 53 45 Q 60 52, 67 45" stroke="${eye}" stroke-width="2" fill="none" stroke-linecap="round"/>

        <!-- Книжка со словарём в лапках -->
        <rect x="52" y="65" width="16" height="13" rx="2" fill="${spike}"/>
        <line x1="60" y1="65" x2="60" y2="78" stroke="${belly}" stroke-width="1"/>
        <line x1="54" y1="68" x2="58" y2="68" stroke="#E8F5E9" stroke-width="0.9"/>
        <line x1="54" y1="71" x2="58" y2="71" stroke="#E8F5E9" stroke-width="0.9"/>
        <line x1="54" y1="74" x2="57" y2="74" stroke="#E8F5E9" stroke-width="0.9"/>
        <line x1="62" y1="68" x2="66" y2="68" stroke="#E8F5E9" stroke-width="0.9"/>
        <line x1="62" y1="71" x2="66" y2="71" stroke="#E8F5E9" stroke-width="0.9"/>
        <line x1="62" y1="74" x2="65" y2="74" stroke="#E8F5E9" stroke-width="0.9"/>

        <!-- Лапки, держащие книжку -->
        <ellipse cx="48" cy="72" rx="5.5" ry="4.5" fill="${body}" transform="rotate(15 48 72)"/>
        <ellipse cx="72" cy="72" rx="5.5" ry="4.5" fill="${body}" transform="rotate(-15 72 72)"/>
      </svg>
    `;
  },

  // ==================== УТИЛИТЫ ====================

  shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  escapeAttr(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
