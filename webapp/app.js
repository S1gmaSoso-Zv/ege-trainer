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
  blitz: null,
  _blitzInterval: null,
  egeSession: null,
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

    // Клавиатура (цифры 1-5, Enter)
    document.addEventListener('keydown', (e) => {
      if (this.currentScreen === 'training' && this.training && !this.training.answered) {
        const idx = parseInt(e.key) - 1;
        if (idx >= 0 && idx < (this.training.currentVariants || []).length) {
          this.checkAnswer(idx);
        }
      } else if (this.currentScreen === 'blitz' && this.blitz && !this.blitz.answered) {
        if (e.key === '1' || e.key === '2') {
          this.checkBlitzAnswer(parseInt(e.key) - 1);
        }
      } else if (this.currentScreen === 'task4_ege' && this.egeSession) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 5 && !this.egeSession.isChecked) {
          this.toggleEGENumber(num);
        } else if (e.key === 'Enter') {
          if (!this.egeSession.isChecked) {
            this.checkTask4EGE();
          } else {
            this.nextTask4EGE();
          }
        }
      }
    });

    this.navigate('home');
  },

  initTelegram() {
    try {
      const applyTheme = () => {
        const tg = window.Telegram?.WebApp;
        const isDark = (tg?.colorScheme === 'dark') ||
          (!tg?.colorScheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
          document.body.classList.add('tg-dark');
        } else {
          document.body.classList.remove('tg-dark');
        }
      };

      applyTheme();

      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
      }

      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        tg.onEvent?.('themeChanged', applyTheme);

        tg.BackButton.onClick(() => {
          if (this.currentScreen === 'training') {
            this.handleQuitTraining();
          } else if (this.currentScreen === 'blitz') {
            this.handleQuitBlitz();
          } else if (this.currentScreen === 'task4_ege') {
            this.handleQuitEGE();
          } else {
            this.goBack();
          }
        });
      }

      // Запуск синхронизации с Telegram CloudStorage
      Storage.initCloudSync(() => {
        // Перерисовать экран при получении актуальных данных с облака
        if (this.currentScreen === 'home' || this.currentScreen === 'stats' || this.currentScreen === 'favorites') {
          this.render();
        }
      });
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
    if (this.currentScreen === 'blitz') {
      this.handleQuitBlitz();
      return;
    }
    if (this.currentScreen === 'task4_ege') {
      this.handleQuitEGE();
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
      blitz: () => this.renderBlitz(),
      blitz_results: () => this.renderBlitzResults(),
      task4_ege: () => this.renderTask4EGE(),
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

    // 2a. Варианты ответа в Блице
    const blitzOptBtn = e.target.closest('.blitz-opt-btn');
    if (blitzOptBtn && !blitzOptBtn.disabled) {
      this.checkBlitzAnswer(parseInt(blitzOptBtn.dataset.opt));
      return;
    }

    // 2b. Переключатель режима Задания №4 (карточки / формат ЕГЭ)
    const task4SubmodeBtn = e.target.closest('[data-task4-submode]');
    if (task4SubmodeBtn) {
      this.screenParams.subMode = task4SubmodeBtn.dataset.task4Submode;
      this.render();
      return;
    }

    // 2c. Выбор номера строки в формате ЕГЭ (1-5)
    const egeNumBtn = e.target.closest('[data-ege-num]');
    if (egeNumBtn) {
      this.toggleEGENumber(parseInt(egeNumBtn.dataset.egeNum));
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

      case 'start-blitz':
        this.startBlitz();
        break;

      case 'quit-blitz':
        this.handleQuitBlitz();
        break;

      case 'retry-blitz':
        this.startBlitz();
        break;

      case 'start-task4-ege':
        this.startTask4EGE();
        break;

      case 'check-task4-ege':
        this.checkTask4EGE();
        break;

      case 'next-task4-ege':
        this.nextTask4EGE();
        break;

      case 'quit-ege':
        this.handleQuitEGE();
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

      case 'toggle-problem-expand': {
        const count = (Storage.getStats().problemWords?.length) || 0;
        const current = this.screenParams.problemsExpanded !== undefined
          ? this.screenParams.problemsExpanded
          : (count <= 3);
        this.screenParams.problemsExpanded = !current;
        this.render();
        break;
      }

      case 'set-problem-filter':
        this.screenParams.problemFilter = dataset.filter;
        this.render();
        break;

      case 'toggle-results-mistakes': {
        const count = (this.screenParams.mistakes && this.screenParams.mistakes.length) || 0;
        const current = this.screenParams.mistakesExpanded !== undefined
          ? this.screenParams.mistakesExpanded
          : (count <= 3);
        this.screenParams.mistakesExpanded = !current;
        this.render();
        break;
      }

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

      case 'force-sync': {
        const btn = document.querySelector('[data-action="force-sync"]');
        if (btn) {
          btn.textContent = 'Обновление...';
          btn.disabled = true;
        }
        Storage.initCloudSync((hasChanges, isSuccess) => {
          if (btn) {
            btn.textContent = 'Обновить 🔄';
            btn.disabled = false;
          }
          if (this.currentScreen === 'stats' || this.currentScreen === 'home') {
            this.render();
          }
          try {
            const tg = window.Telegram?.WebApp;
            if (tg?.showPopup) {
              tg.showPopup({
                title: isSuccess ? '☁️ Синхронизация' : '⚠️ Внимание',
                message: isSuccess
                  ? 'Данные успешно синхронизированы между устройствами через Telegram Cloud!'
                  : 'Облачное хранилище пока недоступно или не ответило.',
                buttons: [{ type: 'ok', text: 'Отлично' }]
              });
            } else {
              alert(isSuccess ? 'Данные синхронизированы с Telegram Cloud!' : 'Облако пока недоступно');
            }
          } catch (e) {}
        });
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
      currentVariants: null,
      combo: 0
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
    if (isCorrect) {
      t.combo = (t.combo || 0) + 1;
    } else {
      t.combo = 0;
    }

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
    const stats = Storage.getStats();
    const blitzRecord = stats.blitzHighScore || 0;

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
            <div class="mode-card-desc">Ударения · Карточки и Формат ЕГЭ</div>
          </div>
        </button>
        <button class="mode-card blitz-mode-card" data-action="start-blitz">
          <div class="mode-card-icon amber">⚡</div>
          <div>
            <div class="mode-card-title">Блиц за 60 секунд</div>
            <div class="mode-card-desc">Тайм-атака · 3 ❤️ · Рекорд: <b>${blitzRecord}</b> слов</div>
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
    const subMode = this.screenParams.subMode || 'words';
    const parts = [...new Set(WORDS_TASK4.map(w => w.partOfSpeech))];
    const selectedParts = this.screenParams.selectedParts || [];
    const sessionLength = this.screenParams.sessionLength ?? (subMode === 'ege' ? 5 : 10);
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

      <!-- Переключатель режима: по словам vs Формат ЕГЭ -->
      <div class="task4-submode-tabs">
        <button class="task4-submode-tab ${subMode === 'words' ? 'active' : ''}" data-task4-submode="words">
          🔤 Карточки слов
        </button>
        <button class="task4-submode-tab ${subMode === 'ege' ? 'active' : ''}" data-task4-submode="ege">
          📋 Формат ЕГЭ (ФИПИ)
        </button>
      </div>

      ${subMode === 'ege' ? `
        <div class="ege-info-box">
          <div class="ege-info-title">📋 Реальный формат КИМ ЕГЭ</div>
          <div class="ege-info-desc">
            В каждом задании 5 пронумерованных строк. Вам нужно указать номера ответов, в которых <b>верно</b> (или <b>неверно</b>) выделено ударение.
          </div>
        </div>

        <div class="filter-section">
          <div class="filter-label">Количество заданий в тесте</div>
          <div class="session-pills">
            ${[5, 10, 15].map(n => `
              <button class="pill ${sessionLength === n ? 'active' : ''}" data-session-length="${n}">
                ${n} заданий
              </button>
            `).join('')}
          </div>
        </div>

        <button class="start-btn mt-16" data-action="start-task4-ege">
          Начать тест ЕГЭ (${sessionLength} заданий) 🚀
        </button>
      ` : `
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
      `}
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

    const combo = t.combo || 0;
    let mascotMood = 'happy';
    let mascotText = 'Выбери правильный вариант 👇';

    if (t.answered) {
      const selected = variants[t.selectedVariant];
      if (selected && selected.correct) {
        if (combo >= 5) {
          mascotMood = 'cool';
          mascotText = `ОГОНЬ x${combo}! Ты настоящий профи! 😎🔥`;
        } else if (combo >= 3) {
          mascotMood = 'cool';
          mascotText = `Комбо x${combo}! Отличная серия! ⚡`;
        } else {
          mascotMood = 'cheer';
          mascotText = 'Верно! Отличный ответ! ✨';
        }
      } else {
        mascotMood = 'sad';
        mascotText = 'Ой, ошибка! Запомни верный ответ 💡';
      }
    } else {
      if (combo >= 5) {
        mascotMood = 'cool';
        mascotText = `Держи серию x${combo}! Вперёд! 😎`;
      } else if (combo >= 3) {
        mascotMood = 'cool';
        mascotText = `Комбо x${combo}! Не сбавляй темп! 🔥`;
      } else if (combo >= 1) {
        mascotMood = 'happy';
        mascotText = 'Так держать! Внимание на следующее слово 🌱';
      }
    }

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

      <!-- Живой динозаврик с реакциями -->
      <div class="mascot-bar ${combo >= 3 ? 'is-combo' : ''} ${t.answered ? (variants[t.selectedVariant]?.correct ? 'is-correct' : 'is-wrong') : ''}">
        <div class="mascot-bar-avatar">${this.getDinoSVG(mascotMood, 'dino-svg-mini')}</div>
        <div class="mascot-bar-content">
          <div class="mascot-bar-text">${mascotText}</div>
          ${combo >= 2 ? `<div class="combo-pill">${combo >= 5 ? '😎 x' + combo : '🔥 x' + combo}</div>` : ''}
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
      : (mistakesCount <= 3);
    const visibleMistakes = isMistakesExpanded ? (p.mistakes || []) : (p.mistakes || []).slice(0, 3);

    const mistakesHTML = mistakesCount > 0 ? `
      <div class="results-list">
        <div class="stat-section-header" data-action="toggle-results-mistakes" style="margin-top:0;cursor:pointer;">
          <div class="stat-section-title-wrap">
            <span class="results-list-title" style="margin-bottom:0;">Ошибки</span>
            <span class="stat-section-badge" style="background:var(--red-50);color:var(--red-500);border-color:var(--red-400);">${mistakesCount}</span>
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
        ${mistakesCount > 3 ? `
          <button class="collapse-hint-btn" data-action="toggle-results-mistakes">
            ${isMistakesExpanded ? 'Свернуть список ошибок ▲' : `Показать все ${mistakesCount} ошибок ▼`}
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
          <div class="stat-section-header" data-action="toggle-problem-expand" role="button" tabindex="0" style="cursor:pointer;">
            <div class="stat-section-title-wrap">
              <span class="stat-section-title">Сложные слова</span>
              <span class="stat-section-badge">${allProblemWords.length}</span>
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
              Свернуть список слов ▲
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

      <!-- Синхронизация между устройствами -->
      <div class="stat-sync-card">
        <div class="stat-sync-info">
          <span class="stat-sync-icon">☁️</span>
          <div>
            <div class="stat-sync-title">Синхронизация аккаунта</div>
            <div class="stat-sync-sub">Telegram CloudStorage</div>
          </div>
        </div>
        <button class="stat-sync-btn" data-action="force-sync">Обновить 🔄</button>
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

  // ==================== РЕЖИМ: БЛИЦ ЗА 60 СЕКУНД ====================

  startBlitz() {
    if (this._blitzInterval) {
      clearInterval(this._blitzInterval);
      this._blitzInterval = null;
    }

    // Собираем микс из заданий №9 и №4
    const t9Shuffled = this.shuffleArray([...WORDS_TASK9]);
    const t4Shuffled = this.shuffleArray([...WORDS_TASK4]);
    const blitzQuestions = [];

    const totalQuestions = 70;
    for (let i = 0; i < totalQuestions; i++) {
      if (i % 2 === 0 && t9Shuffled.length > 0) {
        const w = t9Shuffled.pop();
        const wrongLetter = (w.wrongLetters && w.wrongLetters[0]) || 'о';
        const wrongWord = w.display.replace('_', wrongLetter);
        const opts = this.shuffleArray([
          { text: w.word, correct: true },
          { text: wrongWord, correct: false }
        ]);
        blitzQuestions.push({
          type: 'task9',
          wordObj: w,
          display: w.display,
          options: opts
        });
      } else if (t4Shuffled.length > 0) {
        const w = t4Shuffled.pop();
        const wrongText = (w.wrong && w.wrong[0]) || w.correct.toLowerCase();
        const opts = this.shuffleArray([
          { text: w.correct, correct: true },
          { text: wrongText, correct: false }
        ]);
        blitzQuestions.push({
          type: 'task4',
          wordObj: w,
          display: w.word,
          options: opts
        });
      }
    }

    this.blitz = {
      timeLeft: 60,
      lives: 3,
      score: 0,
      currentIndex: 0,
      questions: blitzQuestions,
      answers: [],
      mistakes: [],
      answered: false,
      selectedOpt: null
    };

    this._blitzInterval = setInterval(() => {
      if (!this.blitz) {
        clearInterval(this._blitzInterval);
        return;
      }
      this.blitz.timeLeft--;
      const timerEl = document.getElementById('blitzTimer');
      if (timerEl) {
        timerEl.textContent = `⏱️ ${this.blitz.timeLeft}с`;
        if (this.blitz.timeLeft <= 10) {
          timerEl.classList.add('urgent');
        }
      }
      if (this.blitz.timeLeft <= 0) {
        this.finishBlitz('time');
      }
    }, 1000);

    this.navigate('blitz');
  },

  checkBlitzAnswer(optIndex) {
    const b = this.blitz;
    if (!b || b.answered || b.currentIndex >= b.questions.length) return;

    const q = b.questions[b.currentIndex];
    const opt = q.options[optIndex];
    if (!opt) return;

    b.answered = true;
    b.selectedOpt = optIndex;

    const isCorrect = opt.correct;
    if (isCorrect) {
      b.score++;
      try {
        window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
      } catch (e) {}
    } else {
      b.lives--;
      b.mistakes.push({
        word: q.type === 'task9' ? q.wordObj.word : q.wordObj.correct,
        selected: opt.text,
        wordId: q.wordObj.id,
        taskType: q.type
      });
      try {
        window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('error');
      } catch (e) {}
    }

    this.render();

    if (b.lives <= 0) {
      setTimeout(() => this.finishBlitz('lives'), 450);
      return;
    }

    setTimeout(() => {
      if (!this.blitz) return;
      b.currentIndex++;
      b.answered = false;
      b.selectedOpt = null;
      if (b.currentIndex >= b.questions.length) {
        this.finishBlitz('completed');
      } else {
        this.render();
      }
    }, 280);
  },

  finishBlitz(reason = 'time') {
    if (this._blitzInterval) {
      clearInterval(this._blitzInterval);
      this._blitzInterval = null;
    }

    const b = this.blitz;
    if (!b) return;

    const score = b.score;
    const mistakes = b.mistakes;
    const { isNewRecord, highScore } = Storage.setBlitzHighScore(score);

    this.blitz = null;
    this.navigate('blitz_results', {
      score,
      isNewRecord,
      highScore,
      mistakes,
      reason
    });
  },

  handleQuitBlitz() {
    if (this._blitzInterval) {
      clearInterval(this._blitzInterval);
      this._blitzInterval = null;
    }
    this.blitz = null;
    this.navigate('home');
  },

  renderBlitz() {
    const b = this.blitz;
    if (!b || b.currentIndex >= b.questions.length) return '<p>Загрузка...</p>';

    const q = b.questions[b.currentIndex];
    const livesHearts = ['❤️', '❤️', '❤️'].map((heart, idx) => {
      return idx < b.lives ? heart : '💔';
    }).join(' ');

    const mood = b.answered
      ? (q.options[b.selectedOpt]?.correct ? 'cool' : 'sad')
      : (b.score >= 5 ? 'cool' : 'happy');

    const optionsHTML = q.options.map((opt, i) => {
      let cls = 'blitz-opt-btn';
      if (b.answered) {
        if (opt.correct) cls += ' correct';
        else if (i === b.selectedOpt) cls += ' wrong';
      }
      return `
        <button class="${cls}" data-opt="${i}" ${b.answered ? 'disabled' : ''}>
          ${this.escapeHTML(opt.text)}
        </button>
      `;
    }).join('');

    return `
      <div class="blitz-header">
        <button class="training-quit-btn" data-action="quit-blitz">✕ Выход</button>
        <div class="blitz-timer-pill ${b.timeLeft <= 10 ? 'urgent' : ''}" id="blitzTimer">
          ⏱️ ${b.timeLeft}с
        </div>
        <div class="blitz-lives-pill">${livesHearts}</div>
      </div>

      <div class="blitz-score-bar">
        <div class="blitz-score-badge">Счёт: <b>${b.score}</b> 🏆</div>
        <div class="blitz-mascot-avatar">${this.getDinoSVG(mood, 'dino-svg-mini')}</div>
      </div>

      <div class="blitz-card">
        <div class="blitz-task-type">${q.type === 'task9' ? 'Задание №9 · Буквы' : 'Задание №4 · Ударения'}</div>
        <div class="blitz-word-display">${this.escapeHTML(q.display)}</div>
        <div class="blitz-hint">Выберите правильный вариант:</div>
        <div class="blitz-options">
          ${optionsHTML}
        </div>
      </div>
    `;
  },

  renderBlitzResults() {
    const p = this.screenParams;
    const score = p.score || 0;
    const highScore = p.highScore || score;
    const isNewRecord = p.isNewRecord;
    const mistakes = p.mistakes || [];

    let title = 'Время вышло! ⏱️';
    if (p.reason === 'lives') title = 'Закончились жизни! 💔';
    else if (p.reason === 'completed') title = 'Все слова пройдены! 🚀';

    return `
      <div class="results-hero">
        <div class="dino-container mb-12">
          ${this.getDinoSVG(isNewRecord ? 'cool' : (score > 10 ? 'cheer' : 'happy'))}
        </div>
        <div class="results-score">${score}</div>
        <div class="results-label">${title}</div>
        ${isNewRecord ? `
          <div class="blitz-new-record-badge">🎉 НОВЫЙ РЕКОРД! 🏆</div>
        ` : `
          <div class="results-percent">Рекорд: ${highScore} слов</div>
        `}
      </div>

      ${mistakes.length > 0 ? `
        <div class="results-list">
          <div class="results-list-title">Ошибки в блице (${mistakes.length})</div>
          ${mistakes.map(m => {
            const isFav = Storage.isFavorite(m.wordId);
            return `
              <div class="result-item">
                <div>
                  <span class="result-item-word result-item-correct">${this.escapeHTML(m.word)}</span>
                  <span class="result-item-wrong">${this.escapeHTML(m.selected)}</span>
                </div>
                <button class="result-item-fav ${isFav ? 'active' : ''}"
                        data-action="toggle-fav" data-word-id="${m.wordId}" data-task="${m.taskType}">
                  ${isFav ? '⭐' : '☆'}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}

      <div class="results-actions">
        <button class="btn-primary" style="background:#E65100;" data-action="retry-blitz">
          Сыграть ещё раз ⚡
        </button>
        <button class="btn-secondary" data-action="home">На главную</button>
      </div>
    `;
  },

  // ==================== РЕЖИМ: ЗАДАНИЕ №4 В СТИЛЕ ЕГЭ (ФИПИ) ====================

  startTask4EGE() {
    const sessionLength = this.screenParams.sessionLength || 5;
    const questions = [];
    for (let i = 0; i < sessionLength; i++) {
      questions.push(this.generateTask4EGEQuestion());
    }

    this.egeSession = {
      questions,
      currentIndex: 0,
      answers: [],
      selectedNumbers: [],
      isChecked: false
    };

    this.navigate('task4_ege');
  },

  generateTask4EGEQuestion() {
    const shuffled = this.shuffleArray([...WORDS_TASK4]);
    const words = shuffled.slice(0, 5);

    // 70% вероятность условия «верно», 30% «неверно»
    const isTargetCorrect = Math.random() < 0.7;
    const condition = isTargetCorrect ? 'верно' : 'НЕВЕРНО';

    // В КИМах ФИПИ количество ответов всегда 2, 3 или 4
    const possibleCounts = [2, 3, 4];
    const targetCount = possibleCounts[Math.floor(Math.random() * possibleCounts.length)];

    const matchIndices = new Set(this.shuffleArray([0, 1, 2, 3, 4]).slice(0, targetCount));

    const lines = words.map((w, idx) => {
      const shouldMatch = matchIndices.has(idx);
      const isLineCorrectStress = isTargetCorrect ? shouldMatch : !shouldMatch;

      let displayedWord;
      if (isLineCorrectStress) {
        displayedWord = w.correct;
      } else {
        const wrongList = w.wrong && w.wrong.length > 0 ? w.wrong : [w.correct.toLowerCase()];
        displayedWord = wrongList[Math.floor(Math.random() * wrongList.length)];
      }

      return {
        wordObj: w,
        lineNum: idx + 1,
        displayedWord,
        hasCorrectStress: isLineCorrectStress,
        matchesCondition: shouldMatch
      };
    });

    const correctNumbers = lines
      .filter(l => l.matchesCondition)
      .map(l => l.lineNum)
      .sort((a, b) => a - b);

    return {
      condition,
      isTargetCorrect,
      lines,
      correctAnswer: correctNumbers.join(''),
      correctNumbers
    };
  },

  toggleEGENumber(num) {
    const s = this.egeSession;
    if (!s || s.isChecked) return;

    const idx = s.selectedNumbers.indexOf(num);
    if (idx === -1) {
      s.selectedNumbers.push(num);
    } else {
      s.selectedNumbers.splice(idx, 1);
    }
    s.selectedNumbers.sort((a, b) => a - b);
    this.render();
  },

  checkTask4EGE() {
    const s = this.egeSession;
    if (!s || s.isChecked || s.selectedNumbers.length === 0) return;

    const q = s.questions[s.currentIndex];
    const userAns = s.selectedNumbers.join('');
    const isCorrect = userAns === q.correctAnswer;

    s.isChecked = true;
    s.answers.push({
      question: q,
      userAns,
      isCorrect,
      correctAns: q.correctAnswer
    });

    // Учитываем ответы в статистике проблемных слов
    q.lines.forEach(line => {
      const isUserRightOnThisLine = (s.selectedNumbers.includes(line.lineNum) === line.matchesCondition);
      Storage.recordAnswer(line.wordObj.id, isUserRightOnThisLine);
    });

    try {
      const tg = window.Telegram?.WebApp;
      if (tg?.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred(isCorrect ? 'success' : 'error');
      }
    } catch (e) {}

    this.render();
  },

  nextTask4EGE() {
    const s = this.egeSession;
    if (!s) return;

    s.currentIndex++;
    s.selectedNumbers = [];
    s.isChecked = false;

    if (s.currentIndex >= s.questions.length) {
      this.finishTask4EGE();
    } else {
      this.render();
    }
  },

  finishTask4EGE() {
    const s = this.egeSession;
    if (!s) return;

    const correctCount = s.answers.filter(a => a.isCorrect).length;
    const total = s.answers.length;
    const mistakes = s.answers.filter(a => !a.isCorrect);

    Storage.addSession({
      taskType: 'task4',
      total,
      correct: correctCount,
      wrong: total - correctCount,
      mistakes: []
    });

    this.egeSession = null;
    this.navigate('results', {
      taskType: 'task4',
      total,
      correct: correctCount,
      answers: s.answers,
      mistakes: mistakes.map((m, i) => ({
        wordId: `ege_${i}`,
        word: `Задание с ответом ${m.correctAns}`,
        selected: `Ваш ответ: ${m.userAns || '—'}`
      }))
    });
  },

  handleQuitEGE() {
    this.egeSession = null;
    this.navigate('task4filter');
  },

  renderTask4EGE() {
    const s = this.egeSession;
    if (!s || s.currentIndex >= s.questions.length) return '<p>Загрузка...</p>';

    const q = s.questions[s.currentIndex];
    const total = s.questions.length;
    const idx = s.currentIndex;
    const selectedNums = s.selectedNumbers || [];
    const isChecked = s.isChecked;
    const isSuccess = isChecked && (selectedNums.join('') === q.correctAnswer);

    return `
      <div class="training-header">
        <button class="training-quit-btn" data-action="quit-ege">✕ Выйти</button>
        <span class="progress-text">Задание ${idx + 1} из ${total}</span>
      </div>

      <div class="ege-card">
        <div class="ege-badge-kim">КИМ ЕГЭ · Задание №4</div>
        <div class="ege-instruction">
          Укажите варианты ответов, в которых <b>${q.condition.toUpperCase()}</b> выделена буква, обозначающая ударный гласный звук. Запишите номера этих ответов.
        </div>

        <div class="ege-lines-list">
          ${q.lines.map(line => {
            let rowCls = 'ege-line-row';
            if (isChecked) {
              rowCls += line.matchesCondition ? ' is-target' : ' not-target';
            }
            const isFav = Storage.isFavorite(line.wordObj.id);
            return `
              <div class="${rowCls}">
                <div class="ege-line-left">
                  <span class="ege-line-num">${line.lineNum})</span>
                  <span class="ege-line-word">${line.displayedWord}</span>
                </div>
                ${isChecked ? `
                  <div class="ege-line-right">
                    <span class="ege-verdict-pill ${line.hasCorrectStress ? 'v-ok' : 'v-err'}">
                      ${line.hasCorrectStress ? 'верно' : 'ошибка: ' + line.wordObj.correct}
                    </span>
                    <button class="dict-word-fav ${isFav ? 'active' : ''}"
                            data-action="toggle-fav" data-word-id="${line.wordObj.id}" data-task="task4"
                            title="В избранное">
                      ${isFav ? '⭐' : '☆'}
                    </button>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>

        <div class="ege-answer-bar">
          <span class="ege-answer-label">Ответ:</span>
          <div class="ege-answer-display">
            ${selectedNums.length > 0
              ? selectedNums.map(n => `<span class="ege-digit-box">${n}</span>`).join('')
              : '<span class="ege-digit-empty">выберите цифры ниже</span>'}
          </div>
        </div>

        ${!isChecked ? `
          <div class="ege-keypad">
            ${[1, 2, 3, 4, 5].map(n => `
              <button class="ege-key-btn ${selectedNums.includes(n) ? 'selected' : ''}" data-ege-num="${n}">
                ${n}
              </button>
            `).join('')}
          </div>

          <button class="start-btn mt-16" data-action="check-task4-ege" ${selectedNums.length === 0 ? 'disabled' : ''}>
            Ответить (${selectedNums.length > 0 ? selectedNums.join('') : 'выберите цифры'}) ✍️
          </button>
        ` : `
          <div class="ege-result-banner ${isSuccess ? 'success' : 'failure'}">
            <div class="ege-result-title">${isSuccess ? '🎉 Верно! 1 балл!' : '❌ Неверно'}</div>
            <div class="ege-result-text">
              Правильный ответ: <b>${q.correctAnswer}</b>. Ваш ответ: <b>${selectedNums.join('') || '—'}</b>
            </div>
          </div>

          <button class="start-btn mt-16" data-action="next-task4-ege">
            ${idx + 1 < total ? 'Следующее задание →' : 'Завершить тест 📊'}
          </button>
        `}
      </div>
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

  getDinoSVG(mood = 'happy', sizeClass = 'dino-svg') {
    const body = '#4CAF50';
    const belly = '#C8E6C9';
    const eye = '#1F2937';
    const spike = '#2E7D32';
    const blush = '#FF8A80';
    const foot = '#43A047';

    // 1. Грустный динозаврик (ошибка / пустое избранное)
    if (mood === 'sad') {
      return `
        <svg class="${sizeClass}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M 45 22 Q 48 11, 53 20 Z" fill="${spike}"/>
          <path d="M 55 18 Q 60 7, 65 18 Z" fill="${spike}"/>
          <path d="M 67 22 Q 72 12, 76 22 Z" fill="${spike}"/>
          <path d="M 84 80 Q 98 84, 108 88 Q 104 96, 88 92 Q 82 90, 80 84 Z" fill="${body}"/>
          <ellipse cx="44" cy="99" rx="10" ry="5.5" fill="${foot}"/>
          <ellipse cx="76" cy="99" rx="10" ry="5.5" fill="${foot}"/>
          <ellipse cx="60" cy="76" rx="31" ry="27" fill="${body}"/>
          <ellipse cx="60" cy="80" rx="19" ry="18" fill="${belly}"/>
          <circle cx="60" cy="42" r="23" fill="${body}"/>
          <!-- Грустные бровки -->
          <path d="M 47 30 L 53 32" stroke="${eye}" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M 73 30 L 67 32" stroke="${eye}" stroke-width="1.8" stroke-linecap="round"/>
          <!-- Глазки со слезинкой -->
          <ellipse cx="50" cy="38" rx="4.5" ry="4" fill="${eye}"/>
          <ellipse cx="70" cy="38" rx="4.5" ry="4" fill="${eye}"/>
          <circle cx="49" cy="36.5" r="1.6" fill="white"/>
          <circle cx="69" cy="36.5" r="1.6" fill="white"/>
          <path d="M 75 42 Q 77 47, 75 49 Q 73 47, 75 42 Z" fill="#64B5F6"/>
          <circle cx="42" cy="44" r="3.5" fill="${blush}" opacity="0.35"/>
          <circle cx="78" cy="44" r="3.5" fill="${blush}" opacity="0.35"/>
          <!-- Поникший ротик -->
          <path d="M 53 48 Q 60 43, 67 48" stroke="${eye}" stroke-width="2" fill="none" stroke-linecap="round"/>
          <ellipse cx="46" cy="72" rx="6" ry="5" fill="${body}" transform="rotate(-10 46 72)"/>
          <ellipse cx="74" cy="72" rx="6" ry="5" fill="${body}" transform="rotate(10 74 72)"/>
        </svg>
      `;
    }

    // 2. Крутой динозаврик в солнцезащитных очках (Комбо 3+ / 5+ подряд)
    if (mood === 'cool') {
      return `
        <svg class="${sizeClass}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M 45 20 Q 49 8, 54 18 Z" fill="${spike}"/>
          <path d="M 55 16 Q 60 4, 65 16 Z" fill="${spike}"/>
          <path d="M 66 20 Q 71 8, 75 20 Z" fill="${spike}"/>
          <path d="M 85 75 C 99 71, 109 63, 112 56 C 112 68, 103 86, 85 87 Z" fill="${body}"/>
          <path d="M 99 66 Q 103 60, 107 65 Z" fill="${spike}"/>
          <ellipse cx="44" cy="99" rx="10" ry="5.5" fill="${foot}"/>
          <ellipse cx="76" cy="99" rx="10" ry="5.5" fill="${foot}"/>
          <ellipse cx="60" cy="76" rx="31" ry="27" fill="${body}"/>
          <ellipse cx="60" cy="80" rx="19" ry="18" fill="${belly}"/>
          <circle cx="60" cy="42" r="23" fill="${body}"/>
          <!-- Солнцезащитные очки 😎 -->
          <rect x="40" y="32" width="18" height="13" rx="3.5" fill="#1E293B"/>
          <rect x="62" y="32" width="18" height="13" rx="3.5" fill="#1E293B"/>
          <line x1="58" y1="38" x2="62" y2="38" stroke="#1E293B" stroke-width="2.5"/>
          <line x1="42" y1="34" x2="48" y2="42" stroke="rgba(255,255,255,0.5)" stroke-width="1.6" stroke-linecap="round"/>
          <line x1="64" y1="34" x2="70" y2="42" stroke="rgba(255,255,255,0.5)" stroke-width="1.6" stroke-linecap="round"/>
          <circle cx="41" cy="46" r="3.5" fill="${blush}" opacity="0.45"/>
          <circle cx="79" cy="46" r="3.5" fill="${blush}" opacity="0.45"/>
          <!-- Уверенная улыбка -->
          <path d="M 52 47 Q 60 55, 69 47" stroke="${eye}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
          <!-- Лапки победные -->
          <ellipse cx="46" cy="70" rx="6" ry="5" fill="${body}" transform="rotate(-20 46 70)"/>
          <ellipse cx="74" cy="70" rx="6" ry="5" fill="${body}" transform="rotate(20 74 70)"/>
        </svg>
      `;
    }

    // 3. Ликующий динозаврик (правильный ответ)
    if (mood === 'cheer') {
      return `
        <svg class="${sizeClass}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M 45 20 Q 49 8, 54 18 Z" fill="${spike}"/>
          <path d="M 55 16 Q 60 4, 65 16 Z" fill="${spike}"/>
          <path d="M 66 20 Q 71 8, 75 20 Z" fill="${spike}"/>
          <path d="M 85 75 C 99 71, 109 63, 112 56 C 112 68, 103 86, 85 87 Z" fill="${body}"/>
          <ellipse cx="44" cy="99" rx="10" ry="5.5" fill="${foot}"/>
          <ellipse cx="76" cy="99" rx="10" ry="5.5" fill="${foot}"/>
          <ellipse cx="60" cy="76" rx="31" ry="27" fill="${body}"/>
          <ellipse cx="60" cy="80" rx="19" ry="18" fill="${belly}"/>
          <circle cx="60" cy="42" r="23" fill="${body}"/>
          <!-- Глазки-дуги от счастья ^ ^ -->
          <path d="M 45 39 Q 50 32, 55 39" stroke="${eye}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <path d="M 65 39 Q 70 32, 75 39" stroke="${eye}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <circle cx="42" cy="44" r="4.5" fill="${blush}" opacity="0.55"/>
          <circle cx="78" cy="44" r="4.5" fill="${blush}" opacity="0.55"/>
          <!-- Открытая радостная улыбка с язычком -->
          <path d="M 52 45 Q 60 55, 68 45 Z" fill="${eye}"/>
          <path d="M 55 49 Q 60 46, 65 49" stroke="${blush}" stroke-width="2" fill="none" stroke-linecap="round"/>
          <ellipse cx="46" cy="68" rx="6" ry="5" fill="${body}" transform="rotate(-30 46 68)"/>
          <ellipse cx="74" cy="68" rx="6" ry="5" fill="${body}" transform="rotate(30 74 68)"/>
        </svg>
      `;
    }

    // 4. Обычный милый динозаврик с книжкой
    return `
      <svg class="${sizeClass}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M 45 20 Q 49 8, 54 18 Z" fill="${spike}"/>
        <path d="M 55 16 Q 60 4, 65 16 Z" fill="${spike}"/>
        <path d="M 66 20 Q 71 8, 75 20 Z" fill="${spike}"/>
        <path d="M 85 75 C 99 71, 109 63, 112 56 C 112 68, 103 86, 85 87 Z" fill="${body}"/>
        <path d="M 99 66 Q 103 60, 107 65 Z" fill="${spike}"/>
        <ellipse cx="44" cy="99" rx="10" ry="5.5" fill="${foot}"/>
        <ellipse cx="76" cy="99" rx="10" ry="5.5" fill="${foot}"/>
        <ellipse cx="60" cy="76" rx="31" ry="27" fill="${body}"/>
        <ellipse cx="60" cy="80" rx="19" ry="18" fill="${belly}"/>
        <circle cx="60" cy="42" r="23" fill="${body}"/>
        <!-- Глазки с двойными бликами -->
        <circle cx="50" cy="38" r="4.8" fill="${eye}"/>
        <circle cx="70" cy="38" r="4.8" fill="${eye}"/>
        <circle cx="48.5" cy="36.5" r="1.8" fill="white"/>
        <circle cx="68.5" cy="36.5" r="1.8" fill="white"/>
        <circle cx="51.5" cy="39.5" r="0.9" fill="white"/>
        <circle cx="71.5" cy="39.5" r="0.9" fill="white"/>
        <circle cx="42" cy="44" r="4" fill="${blush}" opacity="0.45"/>
        <circle cx="78" cy="44" r="4" fill="${blush}" opacity="0.45"/>
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
