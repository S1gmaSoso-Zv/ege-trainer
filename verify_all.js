const fs = require('fs');
const path = require('path');

console.log('=== ЗАПУСК ПОЛНОЙ ВЕРИФИКАЦИИ ДАННЫХ И ЛОГИКИ ===\n');

// 1. Чтение data.js
const dataPath = path.join(__dirname, 'webapp', 'data.js');
const dataCode = fs.readFileSync(dataPath, 'utf8');

// Выполняем в изолированном контексте
let WORDS_TASK9, WORDS_TASK4;
new Function(dataCode + '; globalThis.__T9 = WORDS_TASK9; globalThis.__T4 = WORDS_TASK4;')();
WORDS_TASK9 = globalThis.__T9;
WORDS_TASK4 = globalThis.__T4;

console.log(`Загружено слов: Задание 9 = ${WORDS_TASK9.length}, Задание 4 = ${WORDS_TASK4.length}`);

const VOWELS = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
const RUSSIAN_ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

let errorsCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error('❌ ОШИБКА: ' + message);
    errorsCount++;
  }
}

// ==========================================
// ПРОВЕРКА ЗАДАНИЯ 9
// ==========================================
console.log('\n--- Проверка Задания №9 ---');
const ids9 = new Set();

WORDS_TASK9.forEach((w, index) => {
  assert(w.id && !ids9.has(w.id), `Слово #${index}: дубликат или пустой ID: ${w.id}`);
  ids9.add(w.id);

  assert(typeof w.word === 'string' && w.word.length > 1, `Некорректное слово: ${JSON.stringify(w)}`);
  assert(w.display.includes('_'), `Нет символа _ в display: ${w.display}`);
  assert((w.display.match(/_/g) || []).length === 1, `Больше одного _ в display: ${w.display}`);

  const gapIndex = w.display.indexOf('_');
  const reconstructed = w.display.substring(0, gapIndex) + w.correctLetter + w.display.substring(gapIndex + 1);
  assert(reconstructed === w.word, `Слово ${w.word}: восстановленное из пропуска '${reconstructed}' не совпадает с '${w.word}'`);

  assert(w.firstLetter.toLowerCase() === w.word[0].toLowerCase(), `Слово ${w.word}: firstLetter '${w.firstLetter}' не совпадает с '${w.word[0]}'`);
  assert(w.tag === w.correctLetter, `Слово ${w.word}: tag '${w.tag}' не равен correctLetter '${w.correctLetter}'`);

  assert(Array.isArray(w.wrongLetters) && w.wrongLetters.length > 0, `Слово ${w.word}: пустые wrongLetters`);
  w.wrongLetters.forEach(wl => {
    assert(wl !== w.correctLetter, `КРИТИЧНО: В слове '${w.word}' ошибочная буква '${wl}' совпадает с правильной '${w.correctLetter}'!`);
    const wrongWord = w.display.replace('_', wl);
    assert(wrongWord !== w.word, `КРИТИЧНО: Ошибочное слово '${wrongWord}' совпадает с правильным '${w.word}'!`);
  });
});

console.log(`Задание 9: проверено ${WORDS_TASK9.length} слов. Ошибок: ${errorsCount}`);

// ==========================================
// ПРОВЕРКА ЗАДАНИЯ 4
// ==========================================
console.log('\n--- Проверка Задания №4 ---');
const ids4 = new Set();
const prevErrors = errorsCount;

WORDS_TASK4.forEach((w, index) => {
  assert(w.id && !ids4.has(w.id), `Задание 4 #${index}: дубликат ID: ${w.id}`);
  ids4.add(w.id);

  assert(w.word === w.word.toLowerCase(), `Слово не в нижнем регистре: ${w.word}`);
  assert(w.correct.toLowerCase() === w.word, `Слово ${w.word}: correct '${w.correct}' не совпадает с word '${w.word}'`);

  // Найти заглавную ударную гласную
  const upperVowels = [];
  for (let i = 0; i < w.correct.length; i++) {
    const ch = w.correct[i];
    if (ch === ch.toUpperCase() && VOWELS.includes(ch.toLowerCase())) {
      upperVowels.push({ char: ch, index: i });
    }
  }
  assert(upperVowels.length === 1, `Слово ${w.correct}: должно быть ровно 1 ударение, найдено ${upperVowels.length}`);

  assert(Array.isArray(w.wrong) && w.wrong.length > 0, `Слово ${w.correct}: нет ошибочных вариантов`);
  w.wrong.forEach(wr => {
    assert(wr !== w.correct, `КРИТИЧНО: В слове '${w.word}' ошибочный вариант '${wr}' совпадает с правильным '${w.correct}'!`);
    assert(wr.toLowerCase() === w.word, `Ошибочный вариант '${wr}' отличается от слова '${w.word}'`);
    
    // Проверка что в wrong есть ударение
    let wrongUpperVowels = 0;
    for (let j = 0; j < wr.length; j++) {
      const c = wr[j];
      if (c === c.toUpperCase() && VOWELS.includes(c.toLowerCase())) wrongUpperVowels++;
    }
    assert(wrongUpperVowels === 1, `Ошибочный вариант '${wr}' должен содержать 1 ударение`);
  });

  assert(w.firstLetter.toLowerCase() === w.word[0].toLowerCase(), `Слово ${w.word}: firstLetter '${w.firstLetter}' не совпадает`);
  assert(['глагол', 'существительное', 'прилагательное', 'наречие', 'причастие', 'деепричастие'].includes(w.partOfSpeech), `Неизвестная часть речи: ${w.partOfSpeech} в ${w.word}`);
});

console.log(`Задание 4: проверено ${WORDS_TASK4.length} слов. Ошибок: ${errorsCount - prevErrors}`);

// ==========================================
// ПРОВЕРКА APP.JS И STORAGE.JS
// ==========================================
console.log('\n--- Проверка синтаксиса приложения и логики статистики ---');
const storageCode = fs.readFileSync(path.join(__dirname, 'webapp', 'storage.js'), 'utf8');
const appCode = fs.readFileSync(path.join(__dirname, 'webapp', 'app.js'), 'utf8');

const mockDOM = `
const __store = {};
const localStorage = {
  getItem: (k) => __store[k] || null,
  setItem: (k, v) => { __store[k] = String(v); },
  removeItem: (k) => { delete __store[k]; }
};
const window = { Telegram: { WebApp: null } };
const document = {
  addEventListener: () => {},
  getElementById: () => ({
    innerHTML: '',
    addEventListener: () => {},
    classList: { toggle: () => {} },
    querySelectorAll: () => []
  }),
  body: { appendChild: () => {}, classList: { add: () => {} } },
  createElement: () => ({
    innerHTML: '',
    querySelector: () => ({ onclick: null }),
    querySelectorAll: () => [],
    appendChild: () => {},
    remove: () => {}
  })
};
`;

try {
  new Function(dataCode + mockDOM + storageCode + appCode + `
    // 1. Тест пустого состояния статистики
    const emptyStats = Storage.getStats();
    if (emptyStats.totalPracticed !== 0 || emptyStats.overallPercent !== 0) {
      throw new Error('Некорректная начальная статистика');
    }
    const emptyHTML = App.renderStats();
    if (emptyHTML.includes('NaN')) throw new Error('NaN в HTML пустой статистики');

    // 2. Тест записи сессий и ответов
    Storage.addSession({ taskType: 'task9', total: 10, correct: 8, wrong: 2, mistakes: ['t9_001'] });
    Storage.recordAnswer('t9_001', false);
    Storage.recordAnswer('t4_001', false);
    Storage.recordAnswer('t4_001', false);
    const filledStats = Storage.getStats();
    if (filledStats.totalPracticed !== 10 || filledStats.task9.percent !== 80) {
      throw new Error('Ошибка расчета статистики после сессии');
    }
    const filledHTML = App.renderStats();
    if (filledHTML.includes('NaN')) throw new Error('NaN в HTML заполненной статистики');
    if (!filledHTML.includes('Отработать сложные слова')) throw new Error('Нет кнопки отработки сложных слов');

    // 3. Тест ударений на первую букву и середину
    if (!App.highlightStress('Иксы').includes('dict-word-highlight')) throw new Error('Ударение на Иксы не сработало');
    if (!App.highlightStress('звонИт').includes('dict-word-highlight')) throw new Error('Ударение на звонИт не сработало');

    // 4. Тест сброса статистики
    __store['ege_stats'] = '{"sessions":[{"total":99}]}';
    Storage.resetStats();
    if (Storage.getStats().totalPracticed !== 0) throw new Error('Статистика воскресла после сброса');
  `)();
  console.log('✅ app.js и storage.js выполнены без ошибок!');
  console.log('✅ Полный цикл статистики, сессий и ударений протестирован успешно!');
} catch (e) {
  assert(false, 'Сбой выполнения app.js / storage.js: ' + e.message);
}

// ИТОГ
console.log('\n==========================================');
if (errorsCount === 0) {
  console.log('🎉 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ УСПЕШНО НА 100%! БОТ И ПРИЛОЖЕНИЕ ГОТОВЫ К РЕЛИЗУ!');
} else {
  console.error(`❌ ОБНАРУЖЕНО ${errorsCount} ОШИБОК!`);
  process.exit(1);
}
console.log('==========================================');

