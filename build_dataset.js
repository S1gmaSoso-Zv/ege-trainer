const fs = require('fs');
const path = require('path');

// ==========================================
// 1. ЗАДАНИЕ 4 — УДАРЕНИЯ (ИЗ PDF УМСКУЛ)
// ==========================================
const rawAccentsList = [
  // А
  "аэропОрты", "аэропОрт",
  // Б
  "бАнты", "бОроду", "бородА", "бухгАлтеров", "бухгАлтер", "бралА", "бралАсь",
  // В
  "вероисповЕдание", "водопровОд", "вернА", "взялА", "взялАсь", "влилАсь", "ворвалАсь", 
  "воспринЯть", "воспринялА", "воссоздалА", "вручИт", "вОвремя",
  // Г
  "газопровОд", "граждАнство", "гналА", "гналАсь",
  // Д
  "дефИс", "дешевИзна", "диспансЕр", "договорЁнность", "докумЕнт", "досУг", "добралА", 
  "добралАсь", "дождалАсь", "дозвонИтся", "дозИровать", "довезЁнный", "дОверху", "донЕльзя", "дОнизу", "дОсуха",
  // Е
  "еретИк",
  // Ж
  "жалюзИ", "ждалА", "жилОсь",
  // З
  "знАчимость", "знАчимый", "закУпорить", "занЯть", "зАнял", "занялА", "зАняли", "заперлА", 
  "запломбировАть", "защемИт", "звалА", "звонИт", "зАгнутый", "зАнятый", "занятА", 
  "зАпертый", "заселЁнный", "заселенА", "закУпорив", "зАсветло", "зАтемно",
  // И
  "Иксы",
  // К
  "каталОг", "квартАл", "киломЕтр", "кОнусов", "кОнус", "корЫсть", "крАны", "кремЕнь", "кремнЯ", 
  "красИвее", "красИвейший", "кУхонный", "кАшлянуть", "клАла", "клЕить", "крАлась", 
  "кровоточИть", "кормЯщий", "кровоточАщий",
  // Л
  "лЕкторов", "лЕктор", "лОктя", "лОкоть", "локтЕй", "лыжнЯ", "ловкА", "лгалА", "лилА", "лилАсь",
  // М
  "мЕстностей", "мЕстность", "мозаИчный",
  // Н
  "намЕрение", "нарОст", "нЕдруг", "недУг", "некролОг", "нЕнависть", "нефтепровОд", "новостЕй", 
  "нОвость", "нОгтя", "нОготь", "ногтЕй", "навралА", "наделИт", "надорвалАсь", "назвалАсь", 
  "накренИтся", "налилА", "нарвалА", "начАть", "нАчал", "началА", "нАчали", "нажИвший", 
  "налИвший", "нанЯвшийся", "начАвший", "нАчатый", "низведЁнный", "начАв", "начАвшись", "надОлго", "ненадОлго",
  // О
  "Отзыв", "отзЫв", "Отрочество", "оптОвый", "обзвонИт", "облегчИть", "облегчИт", "облилАсь", 
  "обнялАсь", "обогналА", "ободралА", "ободрИть", "ободрИт", "ободрИться", "ободрИтся", 
  "обострИть", "одолжИть", "одолжИт", "озлОбить", "оклЕить", "окружИт", "опОшлить", 
  "освЕдомиться", "освЕдомится", "отбылА", "отдалА", "откУпорить", "отозвалА", "отозвалАсь", 
  "облегчЁнный", "ободрЁнный", "обострЁнный", "отключЁнный", "отдАв",
  // П
  "партЕр", "портфЕль", "пОручни", "придАное", "призЫв", "прозорлИвый", "прозорлИва", 
  "перезвонИт", "перелилА", "плодоносИть", "пломбировАть", "повторИт", "позвалА", "позвонИт", 
  "полилА", "положИть", "положИл", "понЯть", "понялА", "послАла", "прибЫть", "прИбыл", 
  "прибылА", "прИбыли", "принЯть", "прИнял", "принялА", "прИняли", "повторЁнный", "поделЁнный", 
  "понЯвший", "прИнятый", "принятА", "приручЁнный", "прожИвший", "поднЯв", "понЯв", "прибЫв",
  // Р
  "рвалА",
  // С
  "свЁкла", "сирОты", "сиротА", "созЫв", "сосредотОчение", "срЕдства", "срЕдство", "стАтуя", 
  "столЯр", "слИвовый", "сверлИт", "снялА", " совралА".trim(), "создалА", "сорвалА", "сорИт", 
  "снятА", "сОгнутый", "создАв",
  // Т
  "тамОжня", "тОрты", "тУфля",
  // У
  "убралА", "углубИть", "укрепИт", "углублЁнный",
  // Ц
  "цемЕнт", "цЕнтнер", "цепОчка",
  // Ч
  "чЕрпать",
  // Ш
  "шАрфы", "шофЁр",
  // Щ
  "щемИт", "щЁлкать",
  // Э
  "экспЕрт"
];

// Вспомогательная функция для гласных
const VOWELS = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];

function getVowelIndices(word) {
  const lower = word.toLowerCase();
  const indices = [];
  for (let i = 0; i < lower.length; i++) {
    if (VOWELS.includes(lower[i])) indices.push(i);
  }
  return indices;
}

function makeStressedWord(lowerWord, stressIndex) {
  let result = '';
  for (let i = 0; i < lowerWord.length; i++) {
    if (i === stressIndex) {
      result += lowerWord[i].toUpperCase();
    } else {
      result += lowerWord[i].toLowerCase();
    }
  }
  return result;
}

function detectPartOfSpeech(word, stressed) {
  const w = word.toLowerCase();
  if (w.endsWith('ть') || w.endsWith('ться') || w.endsWith('ит') || w.endsWith('ится') || w.endsWith('ат') || w.endsWith('ут') || w.endsWith('ют') || w.endsWith('ла') || w.endsWith('лась') || w.endsWith('ло') || w.endsWith('лось') || w.endsWith('ли') || w.endsWith('лись') || w.endsWith('нул') || w.endsWith('ал')) {
    return 'глагол';
  }
  if (w.endsWith('в') || w.endsWith('вшись')) {
    return 'деепричастие';
  }
  if (w.endsWith('нный') || w.endsWith('тый') || w.endsWith('вший') || w.endsWith('вшийся') || w.endsWith('щий') || w.endsWith('ая') && stressed.endsWith('А')) {
    return 'причастие';
  }
  if (w.endsWith('ее') || w.endsWith('ый') || w.endsWith('ий') || w.endsWith('ой') || w.endsWith('овый') || w.endsWith('евший')) {
    return 'прилагательное';
  }
  if (w === 'вОвремя' || w === 'дОверху' || w === 'донЕльзя' || w === 'дОнизу' || w === 'дОсуха' || w === 'зАсветло' || w === 'зАтемно' || w === 'надОлго' || w === 'ненадОлго' || w === 'наверх' || w === 'добела') {
    return 'наречие';
  }
  return 'существительное';
}

// Генерация WORDS_TASK4
const task4List = [];
let t4Counter = 1;

rawAccentsList.forEach(rawItem => {
  const stressed = rawItem.trim();
  const lower = stressed.toLowerCase();
  const vowelIndices = getVowelIndices(lower);

  if (vowelIndices.length <= 1) {
    // Односложное слово (бант, кран, икс) - пропускаем, ошибки невозможны
    return;
  }

  // Найти какая гласная ударная в stressed
  let correctIndex = -1;
  for (let i = 0; i < stressed.length; i++) {
    const ch = stressed[i];
    if (ch === ch.toUpperCase() && VOWELS.includes(ch.toLowerCase())) {
      correctIndex = i;
      break;
    }
  }

  if (correctIndex === -1) {
    console.warn('Cannot find stress in:', rawItem);
    return;
  }

  // Генерируем неправильные варианты
  const otherIndices = vowelIndices.filter(idx => idx !== correctIndex);
  if (otherIndices.length === 0) return;

  const wrongVariants = [];
  otherIndices.forEach(idx => {
    const variant = makeStressedWord(lower, idx);
    if (variant !== stressed && !wrongVariants.includes(variant)) {
      wrongVariants.push(variant);
    }
  });

  const partOfSpeech = detectPartOfSpeech(lower, stressed);
  const firstLetter = lower[0];

  task4List.push({
    id: `t4_${String(t4Counter++).padStart(3, '0')}`,
    word: lower,
    correct: stressed,
    wrong: wrongVariants,
    partOfSpeech: partOfSpeech,
    firstLetter: firstLetter
  });
});

console.log(`Generated ${task4List.length} words for Task 4.`);

// ==========================================
// 2. ЗАДАНИЕ 9 — СЛОВАРНЫЕ СЛОВА (ИЗ PDF)
// ==========================================
// Слова и их проблемная безударная гласная в корне
const task9RawData = [
  // А
  { word: "абитуриент", gapIdx: 2, wrong: ["е"] }, // аб_туриент -> и
  { word: "абонемент", gapIdx: 2, wrong: ["а"] }, // аб_немент -> о
  { word: "абрикос", gapIdx: 3, wrong: ["е"] }, // абр_кос -> и
  { word: "академия", gapIdx: 2, wrong: ["о"] }, // ак_демия -> а
  { word: "аквамарин", gapIdx: 3, wrong: ["о"] }, // акв_марин -> а
  { word: "акварель", gapIdx: 3, wrong: ["о"] }, // акв_рель -> а
  { word: "аккомпанемент", gapIdx: 7, wrong: ["о"] }, // аккомп_немент -> а
  { word: "аннотация", gapIdx: 3, wrong: ["а"] }, // анн_тация -> о
  { word: "антресоли", gapIdx: 4, wrong: ["и"] }, // антр_соли -> е
  { word: "апелляция", gapIdx: 2, wrong: ["и"] }, // ап_лляция -> е
  { word: "аплодисменты", gapIdx: 3, wrong: ["а"] }, // апл_дисменты -> о
  { word: "аппаратура", gapIdx: 3, wrong: ["о"] }, // апп_ратура -> а
  { word: "аппетит", gapIdx: 3, wrong: ["и"] }, // апп_тит -> е
  { word: "аромат", gapIdx: 2, wrong: ["а"] }, // ар_мат -> о
  { word: "архитектор", gapIdx: 3, wrong: ["е"] }, // арх_тектор -> и
  { word: "асфальт", gapIdx: 3, wrong: ["о"] }, // асф_льт -> а
  { word: "атмосфера", gapIdx: 3, wrong: ["а"] }, // атм_сфера -> о
  { word: "аттракцион", gapIdx: 3, wrong: ["о"] }, // аттр_кцион -> а
  { word: "аукцион", gapIdx: 3, wrong: ["е"] }, // аукц_он -> и

  // Б
  { word: "багаж", gapIdx: 1, wrong: ["о"] }, // б_гаж -> а
  { word: "багряный", gapIdx: 1, wrong: ["о"] }, // б_гряный -> а
  { word: "бадминтон", gapIdx: 1, wrong: ["о"] }, // б_дминтон -> а
  { word: "баланс", gapIdx: 1, wrong: ["о"] }, // б_ланс -> а
  { word: "балкон", gapIdx: 1, wrong: ["о"] }, // б_лкон -> а
  { word: "барельеф", gapIdx: 1, wrong: ["о"] }, // б_рельеф -> а
  { word: "баскетбол", gapIdx: 1, wrong: ["о"] }, // б_скетбол -> а
  { word: "бассейн", gapIdx: 1, wrong: ["о"] }, // б_ссейн -> а
  { word: "берёза", gapIdx: 1, wrong: ["и"] }, // б_рёза -> е
  { word: "бирюзовый", gapIdx: 1, wrong: ["е"] }, // б_рюзовый -> и
  { word: "богатырь", gapIdx: 1, wrong: ["а"] }, // б_гатырь -> о
  { word: "брошюра", gapIdx: 4, wrong: ["у"] }, // брош_ра -> ю
  { word: "бюллетень", gapIdx: 5, wrong: ["и"] }, // бюлл_тень -> е

  // В
  { word: "вакцина", gapIdx: 1, wrong: ["о"] }, // в_кцина -> а
  { word: "вариант", gapIdx: 1, wrong: ["о"] }, // в_риант -> а
  { word: "велосипед", gapIdx: 1, wrong: ["и"] }, // в_лосипед -> е
  { word: "вентилятор", gapIdx: 1, wrong: ["и"] }, // в_нтилятор -> е
  { word: "вермишель", gapIdx: 1, wrong: ["и"] }, // в_рмишель -> е
  { word: "вестибюль", gapIdx: 1, wrong: ["и"] }, // в_стибюль -> е
  { word: "ветеран", gapIdx: 1, wrong: ["и"] }, // в_теран -> е
  { word: "винегрет", gapIdx: 1, wrong: ["е"] }, // в_негрет -> и
  { word: "виртуальный", gapIdx: 1, wrong: ["е"] }, // в_ртуальный -> и
  { word: "виртуоз", gapIdx: 1, wrong: ["е"] }, // в_ртуоз -> и
  { word: "витраж", gapIdx: 1, wrong: ["е"] }, // в_траж -> и
  { word: "владелец", gapIdx: 2, wrong: ["о"] }, // вл_делец -> а
  { word: "возражать", gapIdx: 1, wrong: ["а"] }, // в_зражать -> о
  { word: "вокзал", gapIdx: 1, wrong: ["а"] }, // в_кзал -> о
  { word: "волейбол", gapIdx: 1, wrong: ["а"] }, // в_лейбол -> о
  { word: "воображать", gapIdx: 2, wrong: ["а"] }, // во_бражать -> о
  { word: "воплотить", gapIdx: 1, wrong: ["а"] }, // в_плотить -> о
  { word: "впечатление", gapIdx: 2, wrong: ["и"] }, // вп_чатление -> е
  { word: "выражение", gapIdx: 3, wrong: ["о"] }, // выр_жение -> а

  // Г
  { word: "газон", gapIdx: 1, wrong: ["о"] }, // г_зон -> а
  { word: "галактика", gapIdx: 1, wrong: ["о"] }, // г_лактика -> а
  { word: "галерея", gapIdx: 1, wrong: ["о"] }, // г_лерея -> а
  { word: "гармония", gapIdx: 1, wrong: ["о"] }, // г_рмония -> а
  { word: "гарнизон", gapIdx: 1, wrong: ["о"] }, // г_рнизон -> а
  { word: "геолог", gapIdx: 1, wrong: ["и"] }, // г_олог -> е
  { word: "герой", gapIdx: 1, wrong: ["и"] }, // г_рой -> е
  { word: "гипотеза", gapIdx: 1, wrong: ["е"] }, // г_потеза -> и
  { word: "гормон", gapIdx: 1, wrong: ["а"] }, // г_рмон -> о
  { word: "горячий", gapIdx: 1, wrong: ["а"] }, // г_рячий -> о
  { word: "горизонт", gapIdx: 1, wrong: ["а"] }, // г_ризонт -> о
  { word: "грамматика", gapIdx: 2, wrong: ["о"] }, // гр_мматика -> а
  { word: "громадный", gapIdx: 2, wrong: ["а"] }, // гр_мадный -> о
  { word: "громоздкий", gapIdx: 2, wrong: ["а"] }, // гр_моздкий -> о

  // Д
  { word: "дебаты", gapIdx: 1, wrong: ["и"] }, // д_баты -> е
  { word: "декларация", gapIdx: 1, wrong: ["и"] }, // д_кларация -> е
  { word: "декорация", gapIdx: 1, wrong: ["и"] }, // д_корация -> е
  { word: "деликатес", gapIdx: 1, wrong: ["и"] }, // д_ликатес -> е
  { word: "деликатный", gapIdx: 1, wrong: ["и"] }, // д_ликатный -> е
  { word: "демократ", gapIdx: 1, wrong: ["и"] }, // д_мократ -> е
  { word: "демонстрация", gapIdx: 1, wrong: ["и"] }, // д_монстрация -> е
  { word: "диалог", gapIdx: 2, wrong: ["о"] }, // ди_лог -> а
  { word: "диапазон", gapIdx: 2, wrong: ["о"] }, // ди_пазон -> а
  { word: "динамика", gapIdx: 1, wrong: ["е"] }, // д_намика -> и
  { word: "дирижёр", gapIdx: 1, wrong: ["е"] }, // д_рижёр -> и
  { word: "диспетчер", gapIdx: 1, wrong: ["е"] }, // д_спетчер -> и
  { word: "дистанция", gapIdx: 1, wrong: ["е"] }, // д_станция -> и
  { word: "дисциплина", gapIdx: 1, wrong: ["е"] }, // д_сциплина -> и

  // Ж, З
  { word: "желание", gapIdx: 1, wrong: ["и"] }, // ж_лание -> е
  { word: "жираф", gapIdx: 1, wrong: ["е"] }, // ж_раф -> и
  { word: "жокей", gapIdx: 1, wrong: ["а"] }, // ж_кей -> о
  { word: "жонглёр", gapIdx: 1, wrong: ["а"] }, // ж_нглёр -> о
  { word: "жюри", gapIdx: 1, wrong: ["у"] }, // ж_ри -> ю
  { word: "знаменитый", gapIdx: 4, wrong: ["и"] }, // знам_нитый -> е

  // И
  { word: "игнорировать", gapIdx: 3, wrong: ["а"] }, // игн_рировать -> о
  { word: "идеал", gapIdx: 2, wrong: ["и"] }, // ид_ал -> е
  { word: "иждивенец", gapIdx: 4, wrong: ["е"] }, // ижд_венец -> и
  { word: "иллюзия", gapIdx: 3, wrong: ["у"] }, // илл_зия -> ю (ошибка: иллузия)
  { word: "индивид", gapIdx: 3, wrong: ["е"] }, // инд_вид -> и
  { word: "инженер", gapIdx: 2, wrong: ["и"] }, // инж_нер -> е
  { word: "инициатива", gapIdx: 2, wrong: ["е"] }, // ин_циатива -> и
  { word: "интеллект", gapIdx: 3, wrong: ["и"] }, // инт_ллект -> е
  { word: "интеллигенция", gapIdx: 3, wrong: ["и"] }, // инт_ллигенция -> е
  { word: "интенсивный", gapIdx: 3, wrong: ["и"] }, // инт_нсивный -> е
  { word: "интерьер", gapIdx: 3, wrong: ["и"] }, // инт_рьер -> е
  { word: "искажение", gapIdx: 3, wrong: ["о"] }, // иск_жение -> а
  { word: "истина", gapIdx: 3, wrong: ["е"] }, // ист_на -> и

  // К
  { word: "кампания", gapIdx: 1, wrong: ["о"] }, // к_мпания -> а (мероприятие)
  { word: "каморка", gapIdx: 1, wrong: ["о"] }, // к_морка -> а
  { word: "каникулы", gapIdx: 1, wrong: ["о"] }, // к_никулы -> а
  { word: "канитель", gapIdx: 1, wrong: ["о"] }, // к_нитель -> а
  { word: "канонада", gapIdx: 1, wrong: ["о"] }, // к_нонада -> а
  { word: "канцелярия", gapIdx: 1, wrong: ["о"] }, // к_нцелярия -> а
  { word: "капюшон", gapIdx: 1, wrong: ["о"] }, // к_пюшон -> а
  { word: "кардинальный", gapIdx: 1, wrong: ["о"] }, // к_рдинальный -> а
  { word: "карикатура", gapIdx: 1, wrong: ["о"] }, // к_рикатура -> а
  { word: "касатка", gapIdx: 1, wrong: ["о"] }, // к_сатка (ласточка) -> а
  { word: "катакомба", gapIdx: 1, wrong: ["о"] }, // к_такомба -> а
  { word: "катастрофа", gapIdx: 1, wrong: ["о"] }, // к_тастрофа -> а
  { word: "квалификация", gapIdx: 2, wrong: ["о"] }, // кв_лификация -> а
  { word: "квитанция", gapIdx: 2, wrong: ["е"] }, // кв_танция -> и
  { word: "кинематограф", gapIdx: 1, wrong: ["е"] }, // к_нематограф -> и
  { word: "коварный", gapIdx: 1, wrong: ["а"] }, // к_варный -> о
  { word: "колдовской", gapIdx: 1, wrong: ["а"] }, // к_лдовской -> о
  { word: "колебание", gapIdx: 1, wrong: ["а"] }, // к_лебание -> о
  { word: "коллектив", gapIdx: 1, wrong: ["а"] }, // к_ллектив -> о
  { word: "коллекция", gapIdx: 1, wrong: ["а"] }, // к_ллекция -> о
  { word: "колоссальный", gapIdx: 1, wrong: ["а"] }, // к_лоссальный -> о
  { word: "колыхаться", gapIdx: 1, wrong: ["а"] }, // к_лыхаться -> о
  { word: "комбинация", gapIdx: 1, wrong: ["а"] }, // к_мбинация -> о
  { word: "комедия", gapIdx: 1, wrong: ["а"] }, // к_медия -> о
  { word: "компания", gapIdx: 1, wrong: ["а"] }, // к_мпания -> о (фирма)
  { word: "компетентный", gapIdx: 1, wrong: ["а"] }, // к_мпетентный -> о
  { word: "компонент", gapIdx: 1, wrong: ["а"] }, // к_мпонент -> о
  { word: "компьютер", gapIdx: 1, wrong: ["а"] }, // к_мпьютер -> о
  { word: "комфорт", gapIdx: 1, wrong: ["а"] }, // к_мфорт -> о
  { word: "конверт", gapIdx: 1, wrong: ["а"] }, // к_нверт -> о
  { word: "конкурент", gapIdx: 1, wrong: ["а"] }, // к_нкурент -> о
  { word: "континент", gapIdx: 1, wrong: ["а"] }, // к_нтинент -> о
  { word: "конференция", gapIdx: 1, wrong: ["а"] }, // к_нференция -> о
  { word: "конфликт", gapIdx: 1, wrong: ["а"] }, // к_нфликт -> о
  { word: "конфорка", gapIdx: 1, wrong: ["а"] }, // к_нфорка -> о
  { word: "корифей", gapIdx: 1, wrong: ["а"] }, // к_рифей -> о
  { word: "коричневый", gapIdx: 1, wrong: ["а"] }, // к_ричневый -> о
  { word: "корзина", gapIdx: 1, wrong: ["а"] }, // к_рзина -> о
  { word: "косатка", gapIdx: 1, wrong: ["а"] }, // к_сатка (дельфин) -> о
  { word: "космос", gapIdx: 1, wrong: ["а"] }, // к_смос -> о
  { word: "кромешный", gapIdx: 2, wrong: ["а"] }, // кр_мешный -> о

  // Л
  { word: "лабиринт", gapIdx: 1, wrong: ["о"] }, // л_биринт -> а
  { word: "легенда", gapIdx: 1, wrong: ["и"] }, // л_генда -> е
  { word: "лелеять", gapIdx: 1, wrong: ["и"] }, // л_леять -> е
  { word: "либерал", gapIdx: 1, wrong: ["е"] }, // л_берал -> и

  // М
  { word: "мажор", gapIdx: 1, wrong: ["о"] }, // м_жор -> а
  { word: "материал", gapIdx: 1, wrong: ["о"] }, // м_териал -> а
  { word: "мгновение", gapIdx: 3, wrong: ["а"] }, // мгн_вение -> о
  { word: "менталитет", gapIdx: 1, wrong: ["и"] }, // м_нталитет -> е
  { word: "меридиан", gapIdx: 1, wrong: ["и"] }, // м_ридиан -> е
  { word: "мероприятие", gapIdx: 1, wrong: ["и"] }, // м_роприятие -> е
  { word: "метафора", gapIdx: 1, wrong: ["и"] }, // м_тафора -> е
  { word: "механизм", gapIdx: 1, wrong: ["и"] }, // м_ханизм -> е
  { word: "минерал", gapIdx: 1, wrong: ["е"] }, // м_нерал -> и
  { word: "минор", gapIdx: 1, wrong: ["е"] }, // м_нор -> и
  { word: "монолит", gapIdx: 1, wrong: ["а"] }, // м_нолит -> о
  { word: "мораторий", gapIdx: 1, wrong: ["а"] }, // м_раторий -> о
  { word: "мотив", gapIdx: 1, wrong: ["а"] }, // м_тив -> о
  { word: "мятеж", gapIdx: 1, wrong: ["е"] }, // м_теж -> я

  // Н
  { word: "наваждение", gapIdx: 1, wrong: ["о"] }, // н_важдение -> а
  { word: "насекомые", gapIdx: 1, wrong: ["о"] }, // н_секомые -> а
  { word: "наслаждение", gapIdx: 1, wrong: ["о"] }, // н_слаждение -> а
  { word: "недосягаемый", gapIdx: 4, wrong: ["а"] }, // недос_гаемый -> я
  { word: "новелла", gapIdx: 1, wrong: ["а"] }, // н_велла -> о

  // О
  { word: "обаяние", gapIdx: 2, wrong: ["о"] }, // об_яние -> а
  { word: "обитать", gapIdx: 2, wrong: ["е"] }, // об_тать -> и
  { word: "обнаружить", gapIdx: 2, wrong: ["о"] }, // обн_ружить -> а
  { word: "обоняние", gapIdx: 2, wrong: ["а"] }, // об_няние -> о
  { word: "оборона", gapIdx: 2, wrong: ["а"] }, // об_рона -> о
  { word: "одолеть", gapIdx: 2, wrong: ["а"] }, // од_леть -> о
  { word: "озорник", gapIdx: 2, wrong: ["а"] }, // оз_рник -> о
  { word: "опекун", gapIdx: 2, wrong: ["и"] }, // оп_кун -> е
  { word: "оптимист", gapIdx: 3, wrong: ["е"] }, // опт_мист -> и
  { word: "оранжерея", gapIdx: 2, wrong: ["о"] }, // ор_нжерея -> а
  { word: "орбита", gapIdx: 3, wrong: ["е"] }, // орб_та -> и
  { word: "организация", gapIdx: 3, wrong: ["о"] }, // орг_низация -> а
  { word: "оригинальный", gapIdx: 2, wrong: ["е"] }, // ор_гинальный -> и
  { word: "ориентир", gapIdx: 2, wrong: ["е"] }, // ор_ентир -> и
  { word: "орнамент", gapIdx: 3, wrong: ["о"] }, // орн_мент -> а
  { word: "осторожный", gapIdx: 3, wrong: ["а"] }, // ост_рожный -> о
  { word: "офицер", gapIdx: 2, wrong: ["е"] }, // оф_цер -> и
  { word: "ошеломить", gapIdx: 2, wrong: ["и"] }, // ош_ломить -> е

  // П
  { word: "палисадник", gapIdx: 1, wrong: ["о"] }, // п_лисадник -> а
  { word: "палитра", gapIdx: 1, wrong: ["о"] }, // п_литра -> а
  { word: "панорама", gapIdx: 1, wrong: ["о"] }, // п_норама -> а
  { word: "панцирь", gapIdx: 1, wrong: ["о"] }, // п_нцирь -> а
  { word: "параграф", gapIdx: 1, wrong: ["о"] }, // п_раграф -> а
  { word: "парадокс", gapIdx: 1, wrong: ["о"] }, // п_радокс -> а
  { word: "парашют", gapIdx: 5, wrong: ["у"] }, // параш_т -> ю
  { word: "патриот", gapIdx: 1, wrong: ["о"] }, // п_триот -> а
  { word: "пейзаж", gapIdx: 1, wrong: ["и"] }, // п_йзаж -> е
  { word: "перила", gapIdx: 1, wrong: ["и"] }, // п_рила -> е
  { word: "период", gapIdx: 1, wrong: ["и"] }, // п_риод -> е
  { word: "пессимист", gapIdx: 1, wrong: ["и"] }, // п_ссимист -> е
  { word: "подлинный", gapIdx: 1, wrong: ["а"] }, // п_длинный -> о
  { word: "подражатель", gapIdx: 1, wrong: ["а"] }, // п_дражатель -> о
  { word: "позиция", gapIdx: 1, wrong: ["а"] }, // п_зиция -> о
  { word: "поколение", gapIdx: 1, wrong: ["а"] }, // п_коление -> о
  { word: "полемика", gapIdx: 1, wrong: ["а"] }, // п_лемика -> о
  { word: "полировать", gapIdx: 1, wrong: ["а"] }, // п_лировать -> о
  { word: "поражение", gapIdx: 1, wrong: ["а"] }, // п_ражение -> о
  { word: "поразить", gapIdx: 1, wrong: ["а"] }, // п_разить -> о
  { word: "посещение", gapIdx: 1, wrong: ["а"] }, // п_сещение -> о
  { word: "предварительный", gapIdx: 5, wrong: ["о"] }, // предв_рительный -> а
  { word: "презентация", gapIdx: 2, wrong: ["и"] }, // пр_зентация -> е
  { word: "президент", gapIdx: 2, wrong: ["и"] }, // пр_зидент -> е
  { word: "президиум", gapIdx: 2, wrong: ["и"] }, // пр_зидиум -> е
  { word: "преображение", gapIdx: 2, wrong: ["и"] }, // пр_ображение -> е
  { word: "преобразователь", gapIdx: 2, wrong: ["и"] }, // пр_образователь -> е
  { word: "преодоление", gapIdx: 2, wrong: ["и"] }, // пр_одоление -> е
  { word: "прецедент", gapIdx: 2, wrong: ["и"] }, // пр_цедент -> е
  { word: "привилегия", gapIdx: 2, wrong: ["е"] }, // пр_вилегия -> и
  { word: "примитивный", gapIdx: 2, wrong: ["е"] }, // пр_митивный -> и
  { word: "приоритет", gapIdx: 2, wrong: ["е"] }, // пр_оритет -> и
  { word: "провинция", gapIdx: 2, wrong: ["а"] }, // пр_винция -> о
  { word: "провоцировать", gapIdx: 2, wrong: ["а"] }, // пр_воцировать -> о
  { word: "проницательный", gapIdx: 2, wrong: ["а"] }, // пр_ницательный -> о

  // Р
  { word: "радиатор", gapIdx: 1, wrong: ["о"] }, // р_диатор -> а
  { word: "рациональный", gapIdx: 1, wrong: ["о"] }, // р_циональный -> а
  { word: "реалист", gapIdx: 1, wrong: ["и"] }, // р_алист -> е
  { word: "режиссёр", gapIdx: 1, wrong: ["и"] }, // р_жиссёр -> е
  { word: "резидент", gapIdx: 1, wrong: ["и"] }, // р_зидент -> е
  { word: "резиденция", gapIdx: 1, wrong: ["и"] }, // р_зиденция -> е
  { word: "ремесло", gapIdx: 1, wrong: ["и"] }, // р_месло -> е
  { word: "реставрация", gapIdx: 1, wrong: ["и"] }, // р_ставрация -> е
  { word: "реферат", gapIdx: 1, wrong: ["и"] }, // р_ферат -> е
  { word: "реформа", gapIdx: 1, wrong: ["и"] }, // р_форма -> е
  { word: "рецензия", gapIdx: 1, wrong: ["и"] }, // р_цензия -> е
  { word: "риторика", gapIdx: 1, wrong: ["е"] }, // р_торика -> и
  { word: "ровесники", gapIdx: 1, wrong: ["а"] }, // р_весники -> о
  { word: "романтизм", gapIdx: 1, wrong: ["а"] }, // р_мантизм -> о

  // С
  { word: "салют", gapIdx: 1, wrong: ["о"] }, // с_лют -> а
  { word: "сатира", gapIdx: 1, wrong: ["о"] }, // с_тира -> а
  { word: "сварливый", gapIdx: 2, wrong: ["о"] }, // св_рливый -> а
  { word: "свидетель", gapIdx: 2, wrong: ["е"] }, // св_детель -> и
  { word: "сезон", gapIdx: 1, wrong: ["и"] }, // с_зон -> е
  { word: "симпатия", gapIdx: 1, wrong: ["е"] }, // с_мпатия -> и
  { word: "симптом", gapIdx: 1, wrong: ["е"] }, // с_мптом -> и
  { word: "симфония", gapIdx: 1, wrong: ["е"] }, // с_мфония -> и
  { word: "синхронный", gapIdx: 1, wrong: ["е"] }, // с_нхронный -> и
  { word: "сирень", gapIdx: 1, wrong: ["е"] }, // с_рень -> и
  { word: "система", gapIdx: 1, wrong: ["е"] }, // с_стема -> и
  { word: "смятение", gapIdx: 2, wrong: ["е"] }, // см_тение -> я
  { word: "снаряжение", gapIdx: 2, wrong: ["о"] }, // сн_ряжение -> а
  { word: "сокровенный", gapIdx: 1, wrong: ["а"] }, // с_кровенный -> о
  { word: "сонет", gapIdx: 1, wrong: ["а"] }, // с_нет -> о
  { word: "сострадание", gapIdx: 1, wrong: ["а"] }, // с_страдание -> о
  { word: "состязание", gapIdx: 1, wrong: ["а"] }, // с_стязание -> о
  { word: "социальный", gapIdx: 1, wrong: ["а"] }, // с_циальный -> о
  { word: "спартакиада", gapIdx: 2, wrong: ["о"] }, // сп_ртакиада -> а
  { word: "спокойный", gapIdx: 2, wrong: ["а"] }, // сп_койный -> о
  { word: "стадион", gapIdx: 2, wrong: ["о"] }, // ст_дион -> а
  { word: "стипендия", gapIdx: 2, wrong: ["е"] }, // ст_пендия -> и
  { word: "страховка", gapIdx: 3, wrong: ["о"] }, // стр_ховка -> а
  { word: "стремление", gapIdx: 3, wrong: ["и"] }, // стр_мление -> е
  { word: "суверенитет", gapIdx: 1, wrong: ["о"] }, // с_веренитет -> у
  { word: "сувенир", gapIdx: 1, wrong: ["о"] }, // с_венир -> у

  // Т
  { word: "талант", gapIdx: 1, wrong: ["о"] }, // т_лант -> а
  { word: "теория", gapIdx: 1, wrong: ["и"] }, // т_ория -> е
  { word: "территория", gapIdx: 1, wrong: ["и"] }, // т_рритория -> е
  { word: "торжество", gapIdx: 1, wrong: ["а"] }, // т_ржество -> о
  { word: "традиция", gapIdx: 2, wrong: ["о"] }, // тр_диция -> а
  { word: "трафарет", gapIdx: 2, wrong: ["о"] }, // тр_фарет -> а
  { word: "тревога", gapIdx: 2, wrong: ["и"] }, // тр_вога -> е
  { word: "трамвай", gapIdx: 2, wrong: ["о"] }, // тр_мвай -> а
  { word: "троллейбус", gapIdx: 2, wrong: ["а"] }, // тр_ллейбус -> о
  { word: "тростник", gapIdx: 2, wrong: ["а"] }, // тр_стник -> о
  { word: "тротуар", gapIdx: 2, wrong: ["а"] }, // тр_туар -> о

  // У
  { word: "университет", gapIdx: 2, wrong: ["е"] }, // ун_верситет -> и
  { word: "уникальный", gapIdx: 2, wrong: ["е"] }, // ун_кальный -> и
  { word: "уничтожить", gapIdx: 2, wrong: ["е"] }, // ун_чтожить -> и
  { word: "утрамбовать", gapIdx: 3, wrong: ["о"] }, // утр_мбовать -> а

  // Ф
  { word: "фантастика", gapIdx: 1, wrong: ["о"] }, // ф_нтастика -> а
  { word: "фестиваль", gapIdx: 1, wrong: ["и"] }, // ф_стиваль -> е
  { word: "фигура", gapIdx: 1, wrong: ["е"] }, // ф_гура -> и
  { word: "финансы", gapIdx: 1, wrong: ["е"] }, // ф_нансы -> и
  { word: "фиолетовый", gapIdx: 1, wrong: ["е"] }, // ф_олетовый -> и
  { word: "фрагмент", gapIdx: 2, wrong: ["о"] }, // фр_гмент -> а
  { word: "фразеология", gapIdx: 2, wrong: ["о"] }, // фр_зеология -> а

  // Х, Ц, Ч
  { word: "хаос", gapIdx: 1, wrong: ["о"] }, // х_ос -> а
  { word: "характер", gapIdx: 1, wrong: ["о"] }, // х_рактер -> а
  { word: "цемент", gapIdx: 1, wrong: ["и"] }, // ц_мент -> е
  { word: "цивилизация", gapIdx: 3, wrong: ["е"] }, // цив_лизация -> и
  { word: "циклон", gapIdx: 1, wrong: ["е"] }, // ц_клон -> и
  { word: "цилиндр", gapIdx: 1, wrong: ["е"] }, // ц_линдр -> и
  { word: "цистерна", gapIdx: 1, wrong: ["е"] }, // ц_стерна -> и
  { word: "цитата", gapIdx: 1, wrong: ["е"] }, // ц_тата -> и
  { word: "человек", gapIdx: 1, wrong: ["и"] }, // ч_ловек -> е
  { word: "чемпион", gapIdx: 1, wrong: ["и"] }, // ч_мпион -> е

  // Ш
  { word: "шеренга", gapIdx: 1, wrong: ["и"] }, // ш_ренга -> е
  { word: "шоколад", gapIdx: 1, wrong: ["а"] }, // ш_колад -> о
  { word: "шоссе", gapIdx: 1, wrong: ["а"] }, // ш_ссе -> о
  { word: "шофёр", gapIdx: 1, wrong: ["а"] }, // ш_фёр -> о

  // Э
  { word: "эволюция", gapIdx: 2, wrong: ["а"] }, // эв_люция -> о
  { word: "экономика", gapIdx: 2, wrong: ["а"] }, // эк_номика -> о
  { word: "эксперимент", gapIdx: 4, wrong: ["и"] }, // эксп_римент -> е
  { word: "экспонат", gapIdx: 4, wrong: ["а"] }, // эксп_нат -> о
  { word: "экстремальный", gapIdx: 5, wrong: ["и"] }, // экстр_мальный -> е
  { word: "электроника", gapIdx: 2, wrong: ["и"] }, // эл_ктроника -> е
  { word: "энциклопедия", gapIdx: 4, wrong: ["е"] }, // энц_клопедия -> и
  { word: "эстакада", gapIdx: 3, wrong: ["о"] } // эст_када -> а
];

const task9List = [];
let t9Counter = 1;

task9RawData.forEach(item => {
  const word = item.word.toLowerCase();
  const gapIdx = item.gapIdx;
  const correctLetter = word[gapIdx];

  // Формируем display
  const display = word.substring(0, gapIdx) + '_' + word.substring(gapIdx + 1);

  // Фильтруем неправильные варианты, чтобы они НИКОГДА не совпадали с правильной буквой
  const wrongLetters = item.wrong.filter(wl => wl !== correctLetter);
  if (wrongLetters.length === 0) {
    throw new Error(`Word ${word} has no wrong letters different from correct!`);
  }

  // Проверка что display.replace('_', wl) !== word
  wrongLetters.forEach(wl => {
    const wrongWord = display.replace('_', wl);
    if (wrongWord === word) {
      throw new Error(`CRITICAL: Wrong word matches correct word for: ${word}!`);
    }
  });

  task9List.push({
    id: `t9_${String(t9Counter++).padStart(3, '0')}`,
    word: word,
    display: display,
    correctLetter: correctLetter,
    wrongLetters: wrongLetters,
    tag: correctLetter,
    firstLetter: word[0]
  });
});

console.log(`Generated ${task9List.length} words for Task 9.`);

// ==========================================
// 3. ЗАПИСЬ В WEBAPP/DATA.JS
// ==========================================
const dataFileContent = `/**
 * База данных слов для тренажёра ЕГЭ (Задания №9 и №4)
 * Составлена по официальным материалам Умскул и ФИПИ.
 * Задание 9: ${task9List.length} словарных слов
 * Задание 4: ${task4List.length} слов с ударениями
 */

const WORDS_TASK9 = ${JSON.stringify(task9List, null, 2)};

const WORDS_TASK4 = ${JSON.stringify(task4List, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'webapp', 'data.js'), dataFileContent, 'utf8');
console.log('Successfully written to webapp/data.js!');
