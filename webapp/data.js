/**
 * Полная база данных слов для тренажёра ЕГЭ (Задания №9 и №4)
 * Составлена по официальным материалам Умскул и ФИПИ.
 * Задание 9 (Словарные слова): 537 слов
 * Задание 4 (Ударения): 240 слов
 */

const WORDS_TASK9 = [
  {
    "id": "t9_001",
    "word": "абитуриент",
    "display": "аб_туриент",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "а"
  },
  {
    "id": "t9_002",
    "word": "абонемент",
    "display": "аб_немент",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_003",
    "word": "абрикос",
    "display": "абр_кос",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "а"
  },
  {
    "id": "t9_004",
    "word": "абрикосовый",
    "display": "абр_косовый",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "а"
  },
  {
    "id": "t9_005",
    "word": "академия",
    "display": "ак_демия",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "а"
  },
  {
    "id": "t9_006",
    "word": "академический",
    "display": "ак_демический",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "а"
  },
  {
    "id": "t9_007",
    "word": "аквамарин",
    "display": "акв_марин",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "а"
  },
  {
    "id": "t9_008",
    "word": "акварель",
    "display": "акв_рель",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "а"
  },
  {
    "id": "t9_009",
    "word": "акварельный",
    "display": "акв_рельный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "а"
  },
  {
    "id": "t9_010",
    "word": "аккомпанемент",
    "display": "акк_мпанемент",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_011",
    "word": "аккомпанировать",
    "display": "акк_мпанировать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_012",
    "word": "аккомпаниатор",
    "display": "акк_мпаниатор",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_013",
    "word": "аннотация",
    "display": "анн_тация",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_014",
    "word": "антресоли",
    "display": "антр_соли",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "а"
  },
  {
    "id": "t9_015",
    "word": "апелляция",
    "display": "ап_лляция",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "а"
  },
  {
    "id": "t9_016",
    "word": "апеллировать",
    "display": "ап_ллировать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "а"
  },
  {
    "id": "t9_017",
    "word": "аплодировать",
    "display": "апл_дировать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_018",
    "word": "аплодисменты",
    "display": "апл_дисменты",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_019",
    "word": "аппаратура",
    "display": "апп_ратура",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "а"
  },
  {
    "id": "t9_020",
    "word": "аппетит",
    "display": "апп_тит",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "а"
  },
  {
    "id": "t9_021",
    "word": "аромат",
    "display": "ар_мат",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_022",
    "word": "ароматный",
    "display": "ар_матный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_023",
    "word": "архитектор",
    "display": "арх_тектор",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "а"
  },
  {
    "id": "t9_024",
    "word": "архитектура",
    "display": "арх_тектура",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "а"
  },
  {
    "id": "t9_025",
    "word": "асфальт",
    "display": "асф_льт",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "а"
  },
  {
    "id": "t9_026",
    "word": "асфальтировать",
    "display": "асф_льтировать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "а"
  },
  {
    "id": "t9_027",
    "word": "атмосфера",
    "display": "атм_сфера",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_028",
    "word": "атмосферный",
    "display": "атм_сферный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "а"
  },
  {
    "id": "t9_029",
    "word": "аттракцион",
    "display": "аттр_кцион",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "а"
  },
  {
    "id": "t9_030",
    "word": "аукцион",
    "display": "аукц_он",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "а"
  },
  {
    "id": "t9_031",
    "word": "багаж",
    "display": "б_гаж",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_032",
    "word": "багажный",
    "display": "б_гажный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_033",
    "word": "багровый",
    "display": "б_гровый",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_034",
    "word": "багроветь",
    "display": "б_гроветь",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_035",
    "word": "багряный",
    "display": "б_гряный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_036",
    "word": "бадминтон",
    "display": "б_дминтон",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_037",
    "word": "баланс",
    "display": "б_ланс",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_038",
    "word": "балансировать",
    "display": "б_лансировать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_039",
    "word": "балкон",
    "display": "б_лкон",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_040",
    "word": "балконный",
    "display": "б_лконный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_041",
    "word": "барельеф",
    "display": "б_рельеф",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_042",
    "word": "баскетбол",
    "display": "б_скетбол",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_043",
    "word": "баскетбольный",
    "display": "б_скетбольный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_044",
    "word": "бассейн",
    "display": "б_ссейн",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "б"
  },
  {
    "id": "t9_045",
    "word": "берёза",
    "display": "б_рёза",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "б"
  },
  {
    "id": "t9_046",
    "word": "берёзовый",
    "display": "б_рёзовый",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "б"
  },
  {
    "id": "t9_047",
    "word": "бирюзовый",
    "display": "б_рюзовый",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "б"
  },
  {
    "id": "t9_048",
    "word": "богатый",
    "display": "б_гатый",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "б"
  },
  {
    "id": "t9_049",
    "word": "богатство",
    "display": "б_гатство",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "б"
  },
  {
    "id": "t9_050",
    "word": "богатырь",
    "display": "б_гатырь",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "б"
  },
  {
    "id": "t9_051",
    "word": "брошюра",
    "display": "брош_ра",
    "correctLetter": "ю",
    "wrongLetters": [
      "у"
    ],
    "tag": "ю",
    "firstLetter": "б"
  },
  {
    "id": "t9_052",
    "word": "брошюровать",
    "display": "брош_ровать",
    "correctLetter": "ю",
    "wrongLetters": [
      "у"
    ],
    "tag": "ю",
    "firstLetter": "б"
  },
  {
    "id": "t9_053",
    "word": "бюллетень",
    "display": "бюлл_тень",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "б"
  },
  {
    "id": "t9_054",
    "word": "вакцина",
    "display": "в_кцина",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_055",
    "word": "вакцинация",
    "display": "в_кцинация",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_056",
    "word": "вакцинировать",
    "display": "в_кцинировать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_057",
    "word": "вариант",
    "display": "в_риант",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_058",
    "word": "вариативный",
    "display": "в_риативный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_059",
    "word": "велосипед",
    "display": "в_лосипед",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_060",
    "word": "велосипедный",
    "display": "в_лосипедный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_061",
    "word": "вентилятор",
    "display": "в_нтилятор",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_062",
    "word": "вентиляторный",
    "display": "в_нтиляторный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_063",
    "word": "вермишель",
    "display": "в_рмишель",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_064",
    "word": "вестибюль",
    "display": "в_стибюль",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_065",
    "word": "ветеран",
    "display": "в_теран",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_066",
    "word": "ветеранский",
    "display": "в_теранский",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_067",
    "word": "винегрет",
    "display": "в_негрет",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "в"
  },
  {
    "id": "t9_068",
    "word": "виртуальный",
    "display": "в_ртуальный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "в"
  },
  {
    "id": "t9_069",
    "word": "виртуоз",
    "display": "в_ртуоз",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "в"
  },
  {
    "id": "t9_070",
    "word": "виртуозный",
    "display": "в_ртуозный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "в"
  },
  {
    "id": "t9_071",
    "word": "витраж",
    "display": "в_траж",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "в"
  },
  {
    "id": "t9_072",
    "word": "витражный",
    "display": "в_тражный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "в"
  },
  {
    "id": "t9_073",
    "word": "владелец",
    "display": "вл_делец",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_074",
    "word": "владеть",
    "display": "вл_деть",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_075",
    "word": "возражать",
    "display": "в_зражать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_076",
    "word": "возражение",
    "display": "в_зражение",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_077",
    "word": "вокзал",
    "display": "в_кзал",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_078",
    "word": "вокзальный",
    "display": "в_кзальный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_079",
    "word": "волейбол",
    "display": "в_лейбол",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_080",
    "word": "волейбольный",
    "display": "в_лейбольный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_081",
    "word": "воображать",
    "display": "во_бражать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_082",
    "word": "воображение",
    "display": "во_бражение",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_083",
    "word": "воплотить",
    "display": "в_плотить",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_084",
    "word": "воплощать",
    "display": "в_площать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_085",
    "word": "воплощение",
    "display": "в_площение",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "в"
  },
  {
    "id": "t9_086",
    "word": "впечатлить",
    "display": "вп_чатлить",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_087",
    "word": "впечатление",
    "display": "вп_чатление",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "в"
  },
  {
    "id": "t9_088",
    "word": "выразительный",
    "display": "выр_зительный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_089",
    "word": "выразить",
    "display": "выр_зить",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_090",
    "word": "выражать",
    "display": "выр_жать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_091",
    "word": "выражение",
    "display": "выр_жение",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "в"
  },
  {
    "id": "t9_092",
    "word": "газон",
    "display": "г_зон",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_093",
    "word": "галактика",
    "display": "г_лактика",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_094",
    "word": "галактический",
    "display": "г_лактический",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_095",
    "word": "галерея",
    "display": "г_лерея",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_096",
    "word": "гармония",
    "display": "г_рмония",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_097",
    "word": "гармоничный",
    "display": "г_рмоничный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_098",
    "word": "гарнизон",
    "display": "г_рнизон",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_099",
    "word": "геолог",
    "display": "г_олог",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "г"
  },
  {
    "id": "t9_100",
    "word": "геологический",
    "display": "г_ологический",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "г"
  },
  {
    "id": "t9_101",
    "word": "геология",
    "display": "г_ология",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "г"
  },
  {
    "id": "t9_102",
    "word": "герой",
    "display": "г_рой",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "г"
  },
  {
    "id": "t9_103",
    "word": "героизм",
    "display": "г_роизм",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "г"
  },
  {
    "id": "t9_104",
    "word": "героический",
    "display": "г_роический",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "г"
  },
  {
    "id": "t9_105",
    "word": "гипотеза",
    "display": "г_потеза",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "г"
  },
  {
    "id": "t9_106",
    "word": "гипотетический",
    "display": "г_потетический",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "г"
  },
  {
    "id": "t9_107",
    "word": "гормон",
    "display": "г_рмон",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "г"
  },
  {
    "id": "t9_108",
    "word": "горячий",
    "display": "г_рячий",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "г"
  },
  {
    "id": "t9_109",
    "word": "горизонт",
    "display": "г_ризонт",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "г"
  },
  {
    "id": "t9_110",
    "word": "горизонтальный",
    "display": "г_ризонтальный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "г"
  },
  {
    "id": "t9_111",
    "word": "грамматика",
    "display": "гр_мматика",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_112",
    "word": "грамматический",
    "display": "гр_мматический",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_113",
    "word": "грамота",
    "display": "гр_мота",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_114",
    "word": "грамотный",
    "display": "гр_мотный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "г"
  },
  {
    "id": "t9_115",
    "word": "громадный",
    "display": "гр_мадный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "г"
  },
  {
    "id": "t9_116",
    "word": "громоздкий",
    "display": "гр_моздкий",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "г"
  },
  {
    "id": "t9_117",
    "word": "громоздить",
    "display": "гр_моздить",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "г"
  },
  {
    "id": "t9_118",
    "word": "дебаты",
    "display": "д_баты",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_119",
    "word": "декларация",
    "display": "д_кларация",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_120",
    "word": "декорация",
    "display": "д_корация",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_121",
    "word": "декоративный",
    "display": "д_коративный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_122",
    "word": "деликатес",
    "display": "д_ликатес",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_123",
    "word": "деликатный",
    "display": "д_ликатный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_124",
    "word": "демократ",
    "display": "д_мократ",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_125",
    "word": "демократичный",
    "display": "д_мократичный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_126",
    "word": "демонстрировать",
    "display": "д_монстрировать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_127",
    "word": "демонстрация",
    "display": "д_монстрация",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "д"
  },
  {
    "id": "t9_128",
    "word": "диалог",
    "display": "ди_лог",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "д"
  },
  {
    "id": "t9_129",
    "word": "диалоговый",
    "display": "ди_логовый",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "д"
  },
  {
    "id": "t9_130",
    "word": "диалогический",
    "display": "ди_логический",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "д"
  },
  {
    "id": "t9_131",
    "word": "диапазон",
    "display": "ди_пазон",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "д"
  },
  {
    "id": "t9_132",
    "word": "динамика",
    "display": "д_намика",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_133",
    "word": "динамический",
    "display": "д_намический",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_134",
    "word": "динамичный",
    "display": "д_намичный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_135",
    "word": "дирижёр",
    "display": "д_рижёр",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_136",
    "word": "дирижировать",
    "display": "д_рижировать",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_137",
    "word": "диспетчер",
    "display": "д_спетчер",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_138",
    "word": "диспетчерский",
    "display": "д_спетчерский",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_139",
    "word": "дистанция",
    "display": "д_станция",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_140",
    "word": "дистанционный",
    "display": "д_станционный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_141",
    "word": "дисциплина",
    "display": "д_сциплина",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_142",
    "word": "дисциплинарный",
    "display": "д_сциплинарный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_143",
    "word": "дисциплинировать",
    "display": "д_сциплинировать",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "д"
  },
  {
    "id": "t9_144",
    "word": "желание",
    "display": "ж_лание",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ж"
  },
  {
    "id": "t9_145",
    "word": "желать",
    "display": "ж_лать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ж"
  },
  {
    "id": "t9_146",
    "word": "жираф",
    "display": "ж_раф",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ж"
  },
  {
    "id": "t9_147",
    "word": "жокей",
    "display": "ж_кей",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "ж"
  },
  {
    "id": "t9_148",
    "word": "жонглёр",
    "display": "ж_нглёр",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "ж"
  },
  {
    "id": "t9_149",
    "word": "жюри",
    "display": "ж_ри",
    "correctLetter": "ю",
    "wrongLetters": [
      "у"
    ],
    "tag": "ю",
    "firstLetter": "ж"
  },
  {
    "id": "t9_150",
    "word": "знакомить",
    "display": "зн_комить",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "з"
  },
  {
    "id": "t9_151",
    "word": "знакомиться",
    "display": "зн_комиться",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "з"
  },
  {
    "id": "t9_152",
    "word": "знакомый",
    "display": "зн_комый",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "з"
  },
  {
    "id": "t9_153",
    "word": "знаменитый",
    "display": "знам_нитый",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "з"
  },
  {
    "id": "t9_154",
    "word": "знаменовать",
    "display": "знам_новать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "з"
  },
  {
    "id": "t9_155",
    "word": "игнорировать",
    "display": "игн_рировать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "и"
  },
  {
    "id": "t9_156",
    "word": "идеал",
    "display": "ид_ал",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_157",
    "word": "идеализировать",
    "display": "ид_ализировать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_158",
    "word": "идеалист",
    "display": "ид_алист",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_159",
    "word": "идеальный",
    "display": "ид_альный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_160",
    "word": "иждивенец",
    "display": "ижд_венец",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "и"
  },
  {
    "id": "t9_161",
    "word": "иллюзия",
    "display": "илл_зия",
    "correctLetter": "ю",
    "wrongLetters": [
      "у"
    ],
    "tag": "ю",
    "firstLetter": "и"
  },
  {
    "id": "t9_162",
    "word": "иллюзионист",
    "display": "илл_зионист",
    "correctLetter": "ю",
    "wrongLetters": [
      "у"
    ],
    "tag": "ю",
    "firstLetter": "и"
  },
  {
    "id": "t9_163",
    "word": "индивид",
    "display": "инд_вид",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "и"
  },
  {
    "id": "t9_164",
    "word": "индивидуальный",
    "display": "инд_видуальный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "и"
  },
  {
    "id": "t9_165",
    "word": "иней",
    "display": "ин_й",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_166",
    "word": "инженер",
    "display": "инж_нер",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_167",
    "word": "инженерный",
    "display": "инж_нерный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_168",
    "word": "инженерский",
    "display": "инж_нерский",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_169",
    "word": "инициатива",
    "display": "ин_циатива",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "и"
  },
  {
    "id": "t9_170",
    "word": "инициативный",
    "display": "ин_циативный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "и"
  },
  {
    "id": "t9_171",
    "word": "интеллект",
    "display": "инт_ллект",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_172",
    "word": "интеллектуальный",
    "display": "инт_ллектуальный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_173",
    "word": "интеллигент",
    "display": "инт_ллигент",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_174",
    "word": "интеллигентный",
    "display": "инт_ллигентный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_175",
    "word": "интеллигенция",
    "display": "_нтеллигенция",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "и"
  },
  {
    "id": "t9_176",
    "word": "интенсивный",
    "display": "инт_нсивный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_177",
    "word": "интерьер",
    "display": "инт_рьер",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_178",
    "word": "интерьерный",
    "display": "инт_рьерный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "и"
  },
  {
    "id": "t9_179",
    "word": "исказить",
    "display": "иск_зить",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "и"
  },
  {
    "id": "t9_180",
    "word": "искажение",
    "display": "_скажение",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "и"
  },
  {
    "id": "t9_181",
    "word": "истина",
    "display": "ист_на",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "и"
  },
  {
    "id": "t9_182",
    "word": "истинный",
    "display": "ист_нный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "и"
  },
  {
    "id": "t9_183",
    "word": "кампания",
    "display": "к_мпания",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_184",
    "word": "каморка",
    "display": "к_морка",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_185",
    "word": "каникулы",
    "display": "к_никулы",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_186",
    "word": "канитель",
    "display": "к_нитель",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_187",
    "word": "канонада",
    "display": "к_нонада",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_188",
    "word": "канцелярия",
    "display": "к_нцелярия",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_189",
    "word": "канцелярский",
    "display": "к_нцелярский",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_190",
    "word": "капюшон",
    "display": "к_пюшон",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_191",
    "word": "кардинальный",
    "display": "к_рдинальный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_192",
    "word": "карикатура",
    "display": "к_рикатура",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_193",
    "word": "карикатурный",
    "display": "к_рикатурный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_194",
    "word": "карикатурист",
    "display": "к_рикатурист",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_195",
    "word": "касатка",
    "display": "к_сатка",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_196",
    "word": "катакомба",
    "display": "к_такомба",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_197",
    "word": "катастрофа",
    "display": "к_тастрофа",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_198",
    "word": "квалификация",
    "display": "кв_лификация",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "к"
  },
  {
    "id": "t9_199",
    "word": "квитанция",
    "display": "кв_танция",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "к"
  },
  {
    "id": "t9_200",
    "word": "кинематограф",
    "display": "к_нематограф",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "к"
  },
  {
    "id": "t9_201",
    "word": "коварный",
    "display": "к_варный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_202",
    "word": "коварство",
    "display": "к_варство",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_203",
    "word": "колдун",
    "display": "к_лдун",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_204",
    "word": "колдовать",
    "display": "к_лдовать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_205",
    "word": "колдовской",
    "display": "к_лдовской",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_206",
    "word": "колебание",
    "display": "к_лебание",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_207",
    "word": "колебаться",
    "display": "к_лебаться",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_208",
    "word": "коллектив",
    "display": "к_ллектив",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_209",
    "word": "коллективный",
    "display": "к_ллективный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_210",
    "word": "коллекция",
    "display": "к_ллекция",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_211",
    "word": "коллекционный",
    "display": "к_ллекционный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_212",
    "word": "коллекционировать",
    "display": "к_ллекционировать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_213",
    "word": "колоссальный",
    "display": "к_лоссальный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_214",
    "word": "колыхать",
    "display": "к_лыхать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_215",
    "word": "колыхаться",
    "display": "к_лыхаться",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_216",
    "word": "комбинация",
    "display": "к_мбинация",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_217",
    "word": "комбинировать",
    "display": "к_мбинировать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_218",
    "word": "комедия",
    "display": "к_медия",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_219",
    "word": "комедийный",
    "display": "к_медийный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_220",
    "word": "компания",
    "display": "к_мпания",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_221",
    "word": "компетентный",
    "display": "к_мпетентный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_222",
    "word": "компетенция",
    "display": "к_мпетенция",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_223",
    "word": "компонент",
    "display": "к_мпонент",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_224",
    "word": "компьютер",
    "display": "к_мпьютер",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_225",
    "word": "компьютерный",
    "display": "к_мпьютерный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_226",
    "word": "комфорт",
    "display": "к_мфорт",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_227",
    "word": "комфортный",
    "display": "к_мфортный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_228",
    "word": "конверт",
    "display": "к_нверт",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_229",
    "word": "конкурент",
    "display": "к_нкурент",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_230",
    "word": "конкуренция",
    "display": "к_нкуренция",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_231",
    "word": "континент",
    "display": "к_нтинент",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_232",
    "word": "конференция",
    "display": "к_нференция",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_233",
    "word": "конфликт",
    "display": "к_нфликт",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_234",
    "word": "конфликтовать",
    "display": "к_нфликтовать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_235",
    "word": "конфорка",
    "display": "к_нфорка",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_236",
    "word": "корифей",
    "display": "к_рифей",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_237",
    "word": "коричневый",
    "display": "к_ричневый",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_238",
    "word": "корзина",
    "display": "к_рзина",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_239",
    "word": "король",
    "display": "к_роль",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_240",
    "word": "королевство",
    "display": "к_ролевство",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_241",
    "word": "косатка",
    "display": "к_сатка",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_242",
    "word": "космос",
    "display": "к_смос",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_243",
    "word": "космический",
    "display": "к_смический",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_244",
    "word": "кромешный",
    "display": "кр_мешный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "к"
  },
  {
    "id": "t9_245",
    "word": "лабиринт",
    "display": "л_биринт",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "л"
  },
  {
    "id": "t9_246",
    "word": "легенда",
    "display": "л_генда",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "л"
  },
  {
    "id": "t9_247",
    "word": "легендарный",
    "display": "л_гендарный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "л"
  },
  {
    "id": "t9_248",
    "word": "лелеять",
    "display": "л_леять",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "л"
  },
  {
    "id": "t9_249",
    "word": "либерал",
    "display": "л_берал",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "л"
  },
  {
    "id": "t9_250",
    "word": "либеральный",
    "display": "л_беральный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "л"
  },
  {
    "id": "t9_251",
    "word": "мажор",
    "display": "м_жор",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "м"
  },
  {
    "id": "t9_252",
    "word": "мажорный",
    "display": "м_жорный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "м"
  },
  {
    "id": "t9_253",
    "word": "материал",
    "display": "м_териал",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "м"
  },
  {
    "id": "t9_254",
    "word": "материальный",
    "display": "м_териальный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "м"
  },
  {
    "id": "t9_255",
    "word": "материализм",
    "display": "м_териализм",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "м"
  },
  {
    "id": "t9_256",
    "word": "материализовать",
    "display": "м_териализовать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "м"
  },
  {
    "id": "t9_257",
    "word": "мгновение",
    "display": "мгн_вение",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "м"
  },
  {
    "id": "t9_258",
    "word": "мгновенный",
    "display": "мгн_венный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "м"
  },
  {
    "id": "t9_259",
    "word": "менталитет",
    "display": "м_нталитет",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "м"
  },
  {
    "id": "t9_260",
    "word": "ментальный",
    "display": "м_нтальный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "м"
  },
  {
    "id": "t9_261",
    "word": "меридиан",
    "display": "м_ридиан",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "м"
  },
  {
    "id": "t9_262",
    "word": "мероприятие",
    "display": "м_роприятие",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "м"
  },
  {
    "id": "t9_263",
    "word": "метафора",
    "display": "м_тафора",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "м"
  },
  {
    "id": "t9_264",
    "word": "метафорический",
    "display": "м_тафорический",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "м"
  },
  {
    "id": "t9_265",
    "word": "механизм",
    "display": "м_ханизм",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "м"
  },
  {
    "id": "t9_266",
    "word": "механический",
    "display": "м_ханический",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "м"
  },
  {
    "id": "t9_267",
    "word": "минерал",
    "display": "м_нерал",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "м"
  },
  {
    "id": "t9_268",
    "word": "минеральный",
    "display": "м_неральный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "м"
  },
  {
    "id": "t9_269",
    "word": "минор",
    "display": "м_нор",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "м"
  },
  {
    "id": "t9_270",
    "word": "минорный",
    "display": "м_норный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "м"
  },
  {
    "id": "t9_271",
    "word": "монолит",
    "display": "м_нолит",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "м"
  },
  {
    "id": "t9_272",
    "word": "монолитный",
    "display": "м_нолитный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "м"
  },
  {
    "id": "t9_273",
    "word": "мораторий",
    "display": "м_раторий",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "м"
  },
  {
    "id": "t9_274",
    "word": "мотив",
    "display": "м_тив",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "м"
  },
  {
    "id": "t9_275",
    "word": "мотивировать",
    "display": "м_тивировать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "м"
  },
  {
    "id": "t9_276",
    "word": "мотивация",
    "display": "м_тивация",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "м"
  },
  {
    "id": "t9_277",
    "word": "мятеж",
    "display": "м_теж",
    "correctLetter": "я",
    "wrongLetters": [
      "е"
    ],
    "tag": "я",
    "firstLetter": "м"
  },
  {
    "id": "t9_278",
    "word": "мятежный",
    "display": "м_тежный",
    "correctLetter": "я",
    "wrongLetters": [
      "е"
    ],
    "tag": "я",
    "firstLetter": "м"
  },
  {
    "id": "t9_279",
    "word": "наваждение",
    "display": "н_важдение",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "н"
  },
  {
    "id": "t9_280",
    "word": "насекомые",
    "display": "н_секомые",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "н"
  },
  {
    "id": "t9_281",
    "word": "наслаждаться",
    "display": "н_слаждаться",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "н"
  },
  {
    "id": "t9_282",
    "word": "наслаждение",
    "display": "н_слаждение",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "н"
  },
  {
    "id": "t9_283",
    "word": "недосягаемый",
    "display": "недос_гаемый",
    "correctLetter": "я",
    "wrongLetters": [
      "е"
    ],
    "tag": "я",
    "firstLetter": "н"
  },
  {
    "id": "t9_284",
    "word": "новелла",
    "display": "н_велла",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "н"
  },
  {
    "id": "t9_285",
    "word": "обаяние",
    "display": "об_яние",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "о"
  },
  {
    "id": "t9_286",
    "word": "обаятельный",
    "display": "_баятельный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_287",
    "word": "обитать",
    "display": "об_тать",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_288",
    "word": "обитатель",
    "display": "об_татель",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_289",
    "word": "обнаружить",
    "display": "обн_ружить",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "о"
  },
  {
    "id": "t9_290",
    "word": "обоняние",
    "display": "об_няние",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_291",
    "word": "обонятельный",
    "display": "_бонятельный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_292",
    "word": "оборона",
    "display": "об_рона",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_293",
    "word": "оборонять",
    "display": "об_ронять",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_294",
    "word": "одолеть",
    "display": "од_леть",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_295",
    "word": "озорной",
    "display": "оз_рной",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_296",
    "word": "озорничать",
    "display": "оз_рничать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_297",
    "word": "озорник",
    "display": "оз_рник",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_298",
    "word": "опекун",
    "display": "оп_кун",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "о"
  },
  {
    "id": "t9_299",
    "word": "опекунский",
    "display": "оп_кунский",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "о"
  },
  {
    "id": "t9_300",
    "word": "оптимист",
    "display": "опт_мист",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_301",
    "word": "оптимистичный",
    "display": "опт_мистичный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_302",
    "word": "оптимизм",
    "display": "_птимизм",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_303",
    "word": "оранжерея",
    "display": "ор_нжерея",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "о"
  },
  {
    "id": "t9_304",
    "word": "орбита",
    "display": "орб_та",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_305",
    "word": "орбитальный",
    "display": "орб_тальный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_306",
    "word": "организовать",
    "display": "орг_низовать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "о"
  },
  {
    "id": "t9_307",
    "word": "организация",
    "display": "орг_низация",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "о"
  },
  {
    "id": "t9_308",
    "word": "оригинальный",
    "display": "ор_гинальный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_309",
    "word": "ориентир",
    "display": "ор_ентир",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_310",
    "word": "ориентировать",
    "display": "ор_ентировать",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_311",
    "word": "ориентироваться",
    "display": "ор_ентироваться",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_312",
    "word": "ориентация",
    "display": "_риентация",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_313",
    "word": "орнамент",
    "display": "орн_мент",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "о"
  },
  {
    "id": "t9_314",
    "word": "осторожный",
    "display": "ост_рожный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_315",
    "word": "осторожность",
    "display": "ост_рожность",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "о"
  },
  {
    "id": "t9_316",
    "word": "офицер",
    "display": "оф_цер",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_317",
    "word": "офицерский",
    "display": "оф_церский",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "о"
  },
  {
    "id": "t9_318",
    "word": "ошеломить",
    "display": "ош_ломить",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "о"
  },
  {
    "id": "t9_319",
    "word": "ошеломительный",
    "display": "ош_ломительный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "о"
  },
  {
    "id": "t9_320",
    "word": "ошеломлённый",
    "display": "ош_ломлённый",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "о"
  },
  {
    "id": "t9_321",
    "word": "палисадник",
    "display": "п_лисадник",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_322",
    "word": "палитра",
    "display": "п_литра",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_323",
    "word": "панорама",
    "display": "п_норама",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_324",
    "word": "панорамный",
    "display": "п_норамный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_325",
    "word": "панцирь",
    "display": "п_нцирь",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_326",
    "word": "параграф",
    "display": "п_раграф",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_327",
    "word": "парадокс",
    "display": "п_радокс",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_328",
    "word": "парадоксальный",
    "display": "п_радоксальный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_329",
    "word": "парашют",
    "display": "параш_т",
    "correctLetter": "ю",
    "wrongLetters": [
      "у"
    ],
    "tag": "ю",
    "firstLetter": "п"
  },
  {
    "id": "t9_330",
    "word": "патриот",
    "display": "п_триот",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_331",
    "word": "патриотизм",
    "display": "п_триотизм",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_332",
    "word": "патриотический",
    "display": "п_триотический",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_333",
    "word": "пейзаж",
    "display": "п_йзаж",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_334",
    "word": "пейзажный",
    "display": "п_йзажный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_335",
    "word": "перила",
    "display": "п_рила",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_336",
    "word": "период",
    "display": "п_риод",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_337",
    "word": "периодический",
    "display": "п_риодический",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_338",
    "word": "пессимист",
    "display": "п_ссимист",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_339",
    "word": "пессимистичный",
    "display": "п_ссимистичный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_340",
    "word": "пессимизм",
    "display": "п_ссимизм",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_341",
    "word": "подлинный",
    "display": "п_длинный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_342",
    "word": "подражать",
    "display": "п_дражать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_343",
    "word": "подражание",
    "display": "п_дражание",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_344",
    "word": "подражатель",
    "display": "п_дражатель",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_345",
    "word": "позиция",
    "display": "п_зиция",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_346",
    "word": "покой",
    "display": "п_кой",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_347",
    "word": "поколение",
    "display": "п_коление",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_348",
    "word": "полемика",
    "display": "п_лемика",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_349",
    "word": "полемичный",
    "display": "п_лемичный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_350",
    "word": "полировать",
    "display": "п_лировать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_351",
    "word": "полированный",
    "display": "п_лированный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_352",
    "word": "поражать",
    "display": "п_ражать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_353",
    "word": "поражение",
    "display": "п_ражение",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_354",
    "word": "поразить",
    "display": "п_разить",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_355",
    "word": "поразительный",
    "display": "п_разительный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_356",
    "word": "посещать",
    "display": "п_сещать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_357",
    "word": "посещение",
    "display": "п_сещение",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_358",
    "word": "посетитель",
    "display": "п_сетитель",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_359",
    "word": "правило",
    "display": "пр_вило",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_360",
    "word": "правильный",
    "display": "пр_вильный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_361",
    "word": "предварительный",
    "display": "предв_рительный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "п"
  },
  {
    "id": "t9_362",
    "word": "презентация",
    "display": "пр_зентация",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_363",
    "word": "президент",
    "display": "пр_зидент",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_364",
    "word": "президентский",
    "display": "пр_зидентский",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_365",
    "word": "президиум",
    "display": "пр_зидиум",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_366",
    "word": "преобразить",
    "display": "пр_образить",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_367",
    "word": "преображение",
    "display": "пр_ображение",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_368",
    "word": "преобразовать",
    "display": "пр_образовать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_369",
    "word": "преобразование",
    "display": "пр_образование",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_370",
    "word": "преобразователь",
    "display": "пр_образователь",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_371",
    "word": "преодолеть",
    "display": "пр_одолеть",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_372",
    "word": "преодоление",
    "display": "пр_одоление",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_373",
    "word": "прецедент",
    "display": "пр_цедент",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "п"
  },
  {
    "id": "t9_374",
    "word": "привилегия",
    "display": "пр_вилегия",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "п"
  },
  {
    "id": "t9_375",
    "word": "привилегированный",
    "display": "пр_вилегированный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "п"
  },
  {
    "id": "t9_376",
    "word": "примитивный",
    "display": "пр_митивный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "п"
  },
  {
    "id": "t9_377",
    "word": "приоритет",
    "display": "пр_оритет",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "п"
  },
  {
    "id": "t9_378",
    "word": "приоритетный",
    "display": "пр_оритетный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "п"
  },
  {
    "id": "t9_379",
    "word": "провинция",
    "display": "пр_винция",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_380",
    "word": "провинциальный",
    "display": "пр_винциальный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_381",
    "word": "провоцировать",
    "display": "пр_воцировать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_382",
    "word": "проницательный",
    "display": "пр_ницательный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "п"
  },
  {
    "id": "t9_383",
    "word": "радиатор",
    "display": "р_диатор",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "р"
  },
  {
    "id": "t9_384",
    "word": "рациональный",
    "display": "р_циональный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "р"
  },
  {
    "id": "t9_385",
    "word": "рационализировать",
    "display": "р_ционализировать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "р"
  },
  {
    "id": "t9_386",
    "word": "реалист",
    "display": "р_алист",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_387",
    "word": "реалистичный",
    "display": "р_алистичный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_388",
    "word": "реализм",
    "display": "р_ализм",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_389",
    "word": "режиссёр",
    "display": "р_жиссёр",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_390",
    "word": "режиссёрский",
    "display": "р_жиссёрский",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_391",
    "word": "резидент",
    "display": "р_зидент",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_392",
    "word": "резиденция",
    "display": "р_зиденция",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_393",
    "word": "ремесло",
    "display": "р_месло",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_394",
    "word": "ремесленный",
    "display": "р_месленный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_395",
    "word": "реставрация",
    "display": "р_ставрация",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_396",
    "word": "реставрационный",
    "display": "р_ставрационный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_397",
    "word": "реферат",
    "display": "р_ферат",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_398",
    "word": "реферировать",
    "display": "р_ферировать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_399",
    "word": "реформа",
    "display": "р_форма",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_400",
    "word": "реформатор",
    "display": "р_форматор",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_401",
    "word": "реформировать",
    "display": "р_формировать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_402",
    "word": "рецензия",
    "display": "р_цензия",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_403",
    "word": "рецензент",
    "display": "р_цензент",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_404",
    "word": "рецензировать",
    "display": "р_цензировать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "р"
  },
  {
    "id": "t9_405",
    "word": "риторика",
    "display": "р_торика",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "р"
  },
  {
    "id": "t9_406",
    "word": "риторический",
    "display": "р_торический",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "р"
  },
  {
    "id": "t9_407",
    "word": "ровесники",
    "display": "р_весники",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "р"
  },
  {
    "id": "t9_408",
    "word": "романтичный",
    "display": "р_мантичный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "р"
  },
  {
    "id": "t9_409",
    "word": "романтический",
    "display": "р_мантический",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "р"
  },
  {
    "id": "t9_410",
    "word": "романтизм",
    "display": "р_мантизм",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "р"
  },
  {
    "id": "t9_411",
    "word": "салют",
    "display": "с_лют",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_412",
    "word": "салютовать",
    "display": "с_лютовать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_413",
    "word": "сатира",
    "display": "с_тира",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_414",
    "word": "сатирический",
    "display": "с_тирический",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_415",
    "word": "сварливый",
    "display": "св_рливый",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_416",
    "word": "свидетель",
    "display": "св_детель",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_417",
    "word": "сезон",
    "display": "с_зон",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "с"
  },
  {
    "id": "t9_418",
    "word": "сезонный",
    "display": "с_зонный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "с"
  },
  {
    "id": "t9_419",
    "word": "симпатия",
    "display": "с_мпатия",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_420",
    "word": "симпатичный",
    "display": "с_мпатичный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_421",
    "word": "симптом",
    "display": "с_мптом",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_422",
    "word": "симфония",
    "display": "с_мфония",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_423",
    "word": "симфонический",
    "display": "с_мфонический",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_424",
    "word": "синхронный",
    "display": "с_нхронный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_425",
    "word": "сирень",
    "display": "с_рень",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_426",
    "word": "сиреневый",
    "display": "с_реневый",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_427",
    "word": "система",
    "display": "с_стема",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_428",
    "word": "систематичный",
    "display": "с_стематичный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_429",
    "word": "систематизировать",
    "display": "с_стематизировать",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_430",
    "word": "смятение",
    "display": "см_тение",
    "correctLetter": "я",
    "wrongLetters": [
      "е"
    ],
    "tag": "я",
    "firstLetter": "с"
  },
  {
    "id": "t9_431",
    "word": "снарядить",
    "display": "сн_рядить",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_432",
    "word": "снаряжение",
    "display": "сн_ряжение",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_433",
    "word": "сокровенный",
    "display": "с_кровенный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "с"
  },
  {
    "id": "t9_434",
    "word": "сонет",
    "display": "с_нет",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "с"
  },
  {
    "id": "t9_435",
    "word": "сострадать",
    "display": "с_страдать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "с"
  },
  {
    "id": "t9_436",
    "word": "сострадание",
    "display": "с_страдание",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "с"
  },
  {
    "id": "t9_437",
    "word": "состязаться",
    "display": "с_стязаться",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "с"
  },
  {
    "id": "t9_438",
    "word": "состязание",
    "display": "с_стязание",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "с"
  },
  {
    "id": "t9_439",
    "word": "социальный",
    "display": "с_циальный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "с"
  },
  {
    "id": "t9_440",
    "word": "спартакиада",
    "display": "сп_ртакиада",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_441",
    "word": "спокойный",
    "display": "сп_койный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "с"
  },
  {
    "id": "t9_442",
    "word": "стадион",
    "display": "ст_дион",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_443",
    "word": "стипендия",
    "display": "ст_пендия",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "с"
  },
  {
    "id": "t9_444",
    "word": "страховать",
    "display": "стр_ховать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_445",
    "word": "страховка",
    "display": "стр_ховка",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "с"
  },
  {
    "id": "t9_446",
    "word": "стремиться",
    "display": "стр_миться",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "с"
  },
  {
    "id": "t9_447",
    "word": "стремление",
    "display": "стр_мление",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "с"
  },
  {
    "id": "t9_448",
    "word": "суверенитет",
    "display": "сув_ренитет",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "с"
  },
  {
    "id": "t9_449",
    "word": "суверенный",
    "display": "сув_ренный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "с"
  },
  {
    "id": "t9_450",
    "word": "сувенир",
    "display": "сув_нир",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "с"
  },
  {
    "id": "t9_451",
    "word": "талант",
    "display": "т_лант",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "т"
  },
  {
    "id": "t9_452",
    "word": "талантливый",
    "display": "т_лантливый",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "т"
  },
  {
    "id": "t9_453",
    "word": "теория",
    "display": "т_ория",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "т"
  },
  {
    "id": "t9_454",
    "word": "теоретический",
    "display": "т_оретический",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "т"
  },
  {
    "id": "t9_455",
    "word": "территория",
    "display": "т_рритория",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "т"
  },
  {
    "id": "t9_456",
    "word": "территориальный",
    "display": "т_рриториальный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "т"
  },
  {
    "id": "t9_457",
    "word": "торжество",
    "display": "т_ржество",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "т"
  },
  {
    "id": "t9_458",
    "word": "торжественный",
    "display": "т_ржественный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "т"
  },
  {
    "id": "t9_459",
    "word": "традиция",
    "display": "тр_диция",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "т"
  },
  {
    "id": "t9_460",
    "word": "традиционный",
    "display": "тр_диционный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "т"
  },
  {
    "id": "t9_461",
    "word": "трафарет",
    "display": "тр_фарет",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "т"
  },
  {
    "id": "t9_462",
    "word": "трафаретный",
    "display": "тр_фаретный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "т"
  },
  {
    "id": "t9_463",
    "word": "тревога",
    "display": "тр_вога",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "т"
  },
  {
    "id": "t9_464",
    "word": "тревожный",
    "display": "тр_вожный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "т"
  },
  {
    "id": "t9_465",
    "word": "тревожить",
    "display": "тр_вожить",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "т"
  },
  {
    "id": "t9_466",
    "word": "трамвай",
    "display": "тр_мвай",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "т"
  },
  {
    "id": "t9_467",
    "word": "трамвайный",
    "display": "тр_мвайный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "т"
  },
  {
    "id": "t9_468",
    "word": "троллейбус",
    "display": "тр_ллейбус",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "т"
  },
  {
    "id": "t9_469",
    "word": "троллейбусный",
    "display": "тр_ллейбусный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "т"
  },
  {
    "id": "t9_470",
    "word": "тростник",
    "display": "тр_стник",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "т"
  },
  {
    "id": "t9_471",
    "word": "тростниковый",
    "display": "тр_стниковый",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "т"
  },
  {
    "id": "t9_472",
    "word": "тротуар",
    "display": "тр_туар",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "т"
  },
  {
    "id": "t9_473",
    "word": "университет",
    "display": "ун_верситет",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "у"
  },
  {
    "id": "t9_474",
    "word": "университетский",
    "display": "ун_верситетский",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "у"
  },
  {
    "id": "t9_475",
    "word": "уникальный",
    "display": "ун_кальный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "у"
  },
  {
    "id": "t9_476",
    "word": "уничтожить",
    "display": "ун_чтожить",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "у"
  },
  {
    "id": "t9_477",
    "word": "утрамбовать",
    "display": "утр_мбовать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "у"
  },
  {
    "id": "t9_478",
    "word": "фантастика",
    "display": "ф_нтастика",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "ф"
  },
  {
    "id": "t9_479",
    "word": "фантастический",
    "display": "ф_нтастический",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "ф"
  },
  {
    "id": "t9_480",
    "word": "фестиваль",
    "display": "ф_стиваль",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ф"
  },
  {
    "id": "t9_481",
    "word": "фигура",
    "display": "ф_гура",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ф"
  },
  {
    "id": "t9_482",
    "word": "фигурировать",
    "display": "ф_гурировать",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ф"
  },
  {
    "id": "t9_483",
    "word": "фигурист",
    "display": "ф_гурист",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ф"
  },
  {
    "id": "t9_484",
    "word": "фигурный",
    "display": "ф_гурный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ф"
  },
  {
    "id": "t9_485",
    "word": "финансы",
    "display": "ф_нансы",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ф"
  },
  {
    "id": "t9_486",
    "word": "финансовый",
    "display": "ф_нансовый",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ф"
  },
  {
    "id": "t9_487",
    "word": "фиолетовый",
    "display": "ф_олетовый",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ф"
  },
  {
    "id": "t9_488",
    "word": "фрагмент",
    "display": "фр_гмент",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "ф"
  },
  {
    "id": "t9_489",
    "word": "фрагментарный",
    "display": "фр_гментарный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "ф"
  },
  {
    "id": "t9_490",
    "word": "фразеология",
    "display": "фр_зеология",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "ф"
  },
  {
    "id": "t9_491",
    "word": "фразеологический",
    "display": "фр_зеологический",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "ф"
  },
  {
    "id": "t9_492",
    "word": "хаос",
    "display": "х_ос",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "х"
  },
  {
    "id": "t9_493",
    "word": "хаотичный",
    "display": "х_отичный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "х"
  },
  {
    "id": "t9_494",
    "word": "характер",
    "display": "х_рактер",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "х"
  },
  {
    "id": "t9_495",
    "word": "характерный",
    "display": "х_рактерный",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "х"
  },
  {
    "id": "t9_496",
    "word": "характеризовать",
    "display": "х_рактеризовать",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "х"
  },
  {
    "id": "t9_497",
    "word": "цемент",
    "display": "ц_мент",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ц"
  },
  {
    "id": "t9_498",
    "word": "цементный",
    "display": "ц_ментный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ц"
  },
  {
    "id": "t9_499",
    "word": "цивилизация",
    "display": "цив_лизация",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ц"
  },
  {
    "id": "t9_500",
    "word": "цивилизационный",
    "display": "цив_лизационный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ц"
  },
  {
    "id": "t9_501",
    "word": "цивилизованный",
    "display": "ц_вилизованный",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ц"
  },
  {
    "id": "t9_502",
    "word": "циклон",
    "display": "ц_клон",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ц"
  },
  {
    "id": "t9_503",
    "word": "цилиндр",
    "display": "ц_линдр",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ц"
  },
  {
    "id": "t9_504",
    "word": "цилиндрический",
    "display": "ц_линдрический",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ц"
  },
  {
    "id": "t9_505",
    "word": "цистерна",
    "display": "ц_стерна",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ц"
  },
  {
    "id": "t9_506",
    "word": "цитата",
    "display": "ц_тата",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ц"
  },
  {
    "id": "t9_507",
    "word": "цитировать",
    "display": "ц_тировать",
    "correctLetter": "и",
    "wrongLetters": [
      "е"
    ],
    "tag": "и",
    "firstLetter": "ц"
  },
  {
    "id": "t9_508",
    "word": "человек",
    "display": "ч_ловек",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ч"
  },
  {
    "id": "t9_509",
    "word": "человеческий",
    "display": "ч_ловеческий",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ч"
  },
  {
    "id": "t9_510",
    "word": "человечный",
    "display": "ч_ловечный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ч"
  },
  {
    "id": "t9_511",
    "word": "чемпион",
    "display": "ч_мпион",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ч"
  },
  {
    "id": "t9_512",
    "word": "чемпионат",
    "display": "ч_мпионат",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ч"
  },
  {
    "id": "t9_513",
    "word": "чемпионский",
    "display": "ч_мпионский",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ч"
  },
  {
    "id": "t9_514",
    "word": "шеренга",
    "display": "ш_ренга",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "ш"
  },
  {
    "id": "t9_515",
    "word": "шоколад",
    "display": "ш_колад",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "ш"
  },
  {
    "id": "t9_516",
    "word": "шоколадный",
    "display": "ш_коладный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "ш"
  },
  {
    "id": "t9_517",
    "word": "шоссе",
    "display": "ш_ссе",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "ш"
  },
  {
    "id": "t9_518",
    "word": "шоссейный",
    "display": "ш_ссейный",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "ш"
  },
  {
    "id": "t9_519",
    "word": "шофёр",
    "display": "ш_фёр",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "ш"
  },
  {
    "id": "t9_520",
    "word": "шофёрский",
    "display": "ш_фёрский",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "ш"
  },
  {
    "id": "t9_521",
    "word": "эволюция",
    "display": "эв_люция",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "э"
  },
  {
    "id": "t9_522",
    "word": "эволюционировать",
    "display": "эв_люционировать",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "э"
  },
  {
    "id": "t9_523",
    "word": "экономика",
    "display": "эк_номика",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "э"
  },
  {
    "id": "t9_524",
    "word": "экономический",
    "display": "_кономический",
    "correctLetter": "э",
    "wrongLetters": [
      "е"
    ],
    "tag": "э",
    "firstLetter": "э"
  },
  {
    "id": "t9_525",
    "word": "экономичный",
    "display": "_кономичный",
    "correctLetter": "э",
    "wrongLetters": [
      "е"
    ],
    "tag": "э",
    "firstLetter": "э"
  },
  {
    "id": "t9_526",
    "word": "эксперимент",
    "display": "эксп_римент",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "э"
  },
  {
    "id": "t9_527",
    "word": "экспериментальный",
    "display": "эксп_риментальный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "э"
  },
  {
    "id": "t9_528",
    "word": "экспериментировать",
    "display": "эксп_риментировать",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "э"
  },
  {
    "id": "t9_529",
    "word": "экспонат",
    "display": "эксп_нат",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "э"
  },
  {
    "id": "t9_530",
    "word": "экстремальный",
    "display": "экстр_мальный",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "э"
  },
  {
    "id": "t9_531",
    "word": "электроника",
    "display": "эл_ктроника",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "э"
  },
  {
    "id": "t9_532",
    "word": "электрический",
    "display": "эл_ктрический",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "э"
  },
  {
    "id": "t9_533",
    "word": "электричество",
    "display": "эл_ктричество",
    "correctLetter": "е",
    "wrongLetters": [
      "и"
    ],
    "tag": "е",
    "firstLetter": "э"
  },
  {
    "id": "t9_534",
    "word": "энциклопедия",
    "display": "энцикл_педия",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "э"
  },
  {
    "id": "t9_535",
    "word": "энциклопедист",
    "display": "энцикл_педист",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "э"
  },
  {
    "id": "t9_536",
    "word": "энциклопедический",
    "display": "энцикл_педический",
    "correctLetter": "о",
    "wrongLetters": [
      "а"
    ],
    "tag": "о",
    "firstLetter": "э"
  },
  {
    "id": "t9_537",
    "word": "эстакада",
    "display": "эст_када",
    "correctLetter": "а",
    "wrongLetters": [
      "о"
    ],
    "tag": "а",
    "firstLetter": "э"
  }
];

const WORDS_TASK4 = [
  {
    "id": "t4_001",
    "word": "аэропорты",
    "correct": "аэропОрты",
    "wrong": [
      "аэропортЫ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "а"
  },
  {
    "id": "t4_002",
    "word": "аэропорт",
    "correct": "аэропОрт",
    "wrong": [
      "Аэропорт",
      "аЭропорт",
      "аэрОпорт"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "а"
  },
  {
    "id": "t4_003",
    "word": "банты",
    "correct": "бАнты",
    "wrong": [
      "бантЫ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "б"
  },
  {
    "id": "t4_004",
    "word": "бороду",
    "correct": "бОроду",
    "wrong": [
      "борОду",
      "бородУ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "б"
  },
  {
    "id": "t4_005",
    "word": "борода",
    "correct": "бородА",
    "wrong": [
      "бОрода",
      "борОда"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "б"
  },
  {
    "id": "t4_006",
    "word": "бухгалтеров",
    "correct": "бухгАлтеров",
    "wrong": [
      "бухгалтерОв",
      "бУхгалтеров"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "б"
  },
  {
    "id": "t4_007",
    "word": "бухгалтер",
    "correct": "бухгАлтер",
    "wrong": [
      "бухгалтЕр",
      "бУхгалтер"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "б"
  },
  {
    "id": "t4_008",
    "word": "брала",
    "correct": "бралА",
    "wrong": [
      "брАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "б"
  },
  {
    "id": "t4_009",
    "word": "бралась",
    "correct": "бралАсь",
    "wrong": [
      "брАлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "б"
  },
  {
    "id": "t4_010",
    "word": "вероисповедание",
    "correct": "вероисповЕдание",
    "wrong": [
      "вероисповедАние",
      "вероиспОведание"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "в"
  },
  {
    "id": "t4_011",
    "word": "водопровод",
    "correct": "водопровОд",
    "wrong": [
      "водопрОвод"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "в"
  },
  {
    "id": "t4_012",
    "word": "верна",
    "correct": "вернА",
    "wrong": [
      "вЕрна"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "в"
  },
  {
    "id": "t4_013",
    "word": "взяла",
    "correct": "взялА",
    "wrong": [
      "взЯла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "в"
  },
  {
    "id": "t4_014",
    "word": "взялась",
    "correct": "взялАсь",
    "wrong": [
      "взЯлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "в"
  },
  {
    "id": "t4_015",
    "word": "влилась",
    "correct": "влилАсь",
    "wrong": [
      "влИлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "в"
  },
  {
    "id": "t4_016",
    "word": "ворвалась",
    "correct": "ворвалАсь",
    "wrong": [
      "вОрвалась",
      "ворвАлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "в"
  },
  {
    "id": "t4_017",
    "word": "воспринять",
    "correct": "воспринЯть",
    "wrong": [
      "вОспринять",
      "воспрИнять"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "в"
  },
  {
    "id": "t4_018",
    "word": "восприняла",
    "correct": "воспринялА",
    "wrong": [
      "вОсприняла",
      "воспрИняла",
      "воспринЯла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "в"
  },
  {
    "id": "t4_019",
    "word": "воссоздала",
    "correct": "воссоздалА",
    "wrong": [
      "вОссоздала",
      "воссОздала",
      "воссоздАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "в"
  },
  {
    "id": "t4_020",
    "word": "вручит",
    "correct": "вручИт",
    "wrong": [
      "врУчит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "в"
  },
  {
    "id": "t4_021",
    "word": "вовремя",
    "correct": "вОвремя",
    "wrong": [
      "воврЕмя",
      "вовремЯ"
    ],
    "partOfSpeech": "наречие",
    "firstLetter": "в"
  },
  {
    "id": "t4_022",
    "word": "газопровод",
    "correct": "газопровОд",
    "wrong": [
      "газопрОвод"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "г"
  },
  {
    "id": "t4_023",
    "word": "гражданство",
    "correct": "граждАнство",
    "wrong": [
      "грАжданство",
      "гражданствО"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "г"
  },
  {
    "id": "t4_024",
    "word": "гнала",
    "correct": "гналА",
    "wrong": [
      "гнАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "г"
  },
  {
    "id": "t4_025",
    "word": "гналась",
    "correct": "гналАсь",
    "wrong": [
      "гнАлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "г"
  },
  {
    "id": "t4_026",
    "word": "дефис",
    "correct": "дефИс",
    "wrong": [
      "дЕфис"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "д"
  },
  {
    "id": "t4_027",
    "word": "дешевизна",
    "correct": "дешевИзна",
    "wrong": [
      "дЕшевизна",
      "дешЕвизна",
      "дешевизнА"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "д"
  },
  {
    "id": "t4_028",
    "word": "диспансер",
    "correct": "диспансЕр",
    "wrong": [
      "диспАнсер"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "д"
  },
  {
    "id": "t4_029",
    "word": "договорённость",
    "correct": "договорЁнность",
    "wrong": [
      "дОговорённость",
      "догОворённость",
      "договОрённость"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "д"
  },
  {
    "id": "t4_030",
    "word": "документ",
    "correct": "докумЕнт",
    "wrong": [
      "дОкумент",
      "докУмент"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "д"
  },
  {
    "id": "t4_031",
    "word": "досуг",
    "correct": "досУг",
    "wrong": [
      "дОсуг"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "д"
  },
  {
    "id": "t4_032",
    "word": "добрала",
    "correct": "добралА",
    "wrong": [
      "дОбрала",
      "добрАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "д"
  },
  {
    "id": "t4_033",
    "word": "добралась",
    "correct": "добралАсь",
    "wrong": [
      "дОбралась",
      "добрАлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "д"
  },
  {
    "id": "t4_034",
    "word": "дождалась",
    "correct": "дождалАсь",
    "wrong": [
      "дОждалась",
      "дождАлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "д"
  },
  {
    "id": "t4_035",
    "word": "дозвонится",
    "correct": "дозвонИтся",
    "wrong": [
      "дОзвонится",
      "дозвОнится",
      "дозвонитсЯ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "д"
  },
  {
    "id": "t4_036",
    "word": "дозировать",
    "correct": "дозИровать",
    "wrong": [
      "дОзировать",
      "дозирОвать",
      "дозировАть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "д"
  },
  {
    "id": "t4_037",
    "word": "довезённый",
    "correct": "довезЁнный",
    "wrong": [
      "дОвезённый",
      "довЕзённый",
      "довезённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "д"
  },
  {
    "id": "t4_038",
    "word": "доверху",
    "correct": "дОверху",
    "wrong": [
      "довЕрху",
      "доверхУ"
    ],
    "partOfSpeech": "наречие",
    "firstLetter": "д"
  },
  {
    "id": "t4_039",
    "word": "донельзя",
    "correct": "донЕльзя",
    "wrong": [
      "дОнельзя",
      "донельзЯ"
    ],
    "partOfSpeech": "наречие",
    "firstLetter": "д"
  },
  {
    "id": "t4_040",
    "word": "донизу",
    "correct": "дОнизу",
    "wrong": [
      "донИзу",
      "донизУ"
    ],
    "partOfSpeech": "наречие",
    "firstLetter": "д"
  },
  {
    "id": "t4_041",
    "word": "досуха",
    "correct": "дОсуха",
    "wrong": [
      "досУха",
      "досухА"
    ],
    "partOfSpeech": "наречие",
    "firstLetter": "д"
  },
  {
    "id": "t4_042",
    "word": "еретик",
    "correct": "еретИк",
    "wrong": [
      "Еретик",
      "ерЕтик"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "е"
  },
  {
    "id": "t4_043",
    "word": "жалюзи",
    "correct": "жалюзИ",
    "wrong": [
      "жАлюзи"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "ж"
  },
  {
    "id": "t4_044",
    "word": "ждала",
    "correct": "ждалА",
    "wrong": [
      "ждАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "ж"
  },
  {
    "id": "t4_045",
    "word": "жилось",
    "correct": "жилОсь",
    "wrong": [
      "жИлось"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "ж"
  },
  {
    "id": "t4_046",
    "word": "значимость",
    "correct": "знАчимость",
    "wrong": [
      "значИмость",
      "значимОсть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_047",
    "word": "значимый",
    "correct": "знАчимый",
    "wrong": [
      "значИмый",
      "значимЫй"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "з"
  },
  {
    "id": "t4_048",
    "word": "закупорить",
    "correct": "закУпорить",
    "wrong": [
      "зАкупорить",
      "закупОрить",
      "закупорИть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_049",
    "word": "занять",
    "correct": "занЯть",
    "wrong": [
      "зАнять"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_050",
    "word": "занял",
    "correct": "зАнял",
    "wrong": [
      "занЯл"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "з"
  },
  {
    "id": "t4_051",
    "word": "заняла",
    "correct": "занялА",
    "wrong": [
      "зАняла",
      "занЯла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_052",
    "word": "заняли",
    "correct": "зАняли",
    "wrong": [
      "занЯли",
      "занялИ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_053",
    "word": "заперла",
    "correct": "заперлА",
    "wrong": [
      "зАперла",
      "запЕрла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_054",
    "word": "запломбировать",
    "correct": "запломбировАть",
    "wrong": [
      "зАпломбировать",
      "заплОмбировать",
      "запломбИровать"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_055",
    "word": "защемит",
    "correct": "защемИт",
    "wrong": [
      "зАщемит",
      "защЕмит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_056",
    "word": "звала",
    "correct": "звалА",
    "wrong": [
      "звАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_057",
    "word": "звонит",
    "correct": "звонИт",
    "wrong": [
      "звОнит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_058",
    "word": "загнутый",
    "correct": "зАгнутый",
    "wrong": [
      "загнУтый",
      "загнутЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "з"
  },
  {
    "id": "t4_059",
    "word": "занятый",
    "correct": "зАнятый",
    "wrong": [
      "занЯтый",
      "занятЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "з"
  },
  {
    "id": "t4_060",
    "word": "занята",
    "correct": "занятА",
    "wrong": [
      "зАнята",
      "занЯта"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "з"
  },
  {
    "id": "t4_061",
    "word": "запертый",
    "correct": "зАпертый",
    "wrong": [
      "запЕртый",
      "запертЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "з"
  },
  {
    "id": "t4_062",
    "word": "заселённый",
    "correct": "заселЁнный",
    "wrong": [
      "зАселённый",
      "засЕлённый",
      "заселённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "з"
  },
  {
    "id": "t4_063",
    "word": "заселена",
    "correct": "заселенА",
    "wrong": [
      "зАселена",
      "засЕлена",
      "заселЕна"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "з"
  },
  {
    "id": "t4_064",
    "word": "закупорив",
    "correct": "закУпорив",
    "wrong": [
      "зАкупорив",
      "закупОрив",
      "закупорИв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "з"
  },
  {
    "id": "t4_065",
    "word": "засветло",
    "correct": "зАсветло",
    "wrong": [
      "засвЕтло",
      "засветлО"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "з"
  },
  {
    "id": "t4_066",
    "word": "затемно",
    "correct": "зАтемно",
    "wrong": [
      "затЕмно",
      "затемнО"
    ],
    "partOfSpeech": "наречие",
    "firstLetter": "з"
  },
  {
    "id": "t4_067",
    "word": "иксы",
    "correct": "Иксы",
    "wrong": [
      "иксЫ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "и"
  },
  {
    "id": "t4_068",
    "word": "каталог",
    "correct": "каталОг",
    "wrong": [
      "катАлог"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "к"
  },
  {
    "id": "t4_069",
    "word": "квартал",
    "correct": "квартАл",
    "wrong": [
      "квАртал"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "к"
  },
  {
    "id": "t4_070",
    "word": "километр",
    "correct": "киломЕтр",
    "wrong": [
      "кИлометр",
      "килОметр"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "к"
  },
  {
    "id": "t4_071",
    "word": "конусов",
    "correct": "кОнусов",
    "wrong": [
      "конУсов",
      "конусОв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "к"
  },
  {
    "id": "t4_072",
    "word": "конус",
    "correct": "кОнус",
    "wrong": [
      "конУс"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "к"
  },
  {
    "id": "t4_073",
    "word": "корысть",
    "correct": "корЫсть",
    "wrong": [
      "кОрысть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "к"
  },
  {
    "id": "t4_074",
    "word": "краны",
    "correct": "крАны",
    "wrong": [
      "кранЫ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "к"
  },
  {
    "id": "t4_075",
    "word": "кремень",
    "correct": "кремЕнь",
    "wrong": [
      "крЕмень"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "к"
  },
  {
    "id": "t4_076",
    "word": "кремня",
    "correct": "кремнЯ",
    "wrong": [
      "крЕмня"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "к"
  },
  {
    "id": "t4_077",
    "word": "красивее",
    "correct": "красИвее",
    "wrong": [
      "красивЕе"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "к"
  },
  {
    "id": "t4_078",
    "word": "красивейший",
    "correct": "красИвейший",
    "wrong": [
      "крАсивейший",
      "красивЕйший",
      "красивейшИй"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "к"
  },
  {
    "id": "t4_079",
    "word": "кухонный",
    "correct": "кУхонный",
    "wrong": [
      "кухОнный"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "к"
  },
  {
    "id": "t4_080",
    "word": "кашлянуть",
    "correct": "кАшлянуть",
    "wrong": [
      "кашлЯнуть",
      "кашлянУть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "к"
  },
  {
    "id": "t4_081",
    "word": "клала",
    "correct": "клАла",
    "wrong": [
      "клалА"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "к"
  },
  {
    "id": "t4_082",
    "word": "клеить",
    "correct": "клЕить",
    "wrong": [
      "клеИть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "к"
  },
  {
    "id": "t4_083",
    "word": "кралась",
    "correct": "крАлась",
    "wrong": [
      "кралАсь"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "к"
  },
  {
    "id": "t4_084",
    "word": "кровоточить",
    "correct": "кровоточИть",
    "wrong": [
      "крОвоточить",
      "кровОточить",
      "кровотОчить"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "к"
  },
  {
    "id": "t4_085",
    "word": "кормящий",
    "correct": "кормЯщий",
    "wrong": [
      "кОрмящий",
      "кормящИй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "к"
  },
  {
    "id": "t4_086",
    "word": "кровоточащий",
    "correct": "кровоточАщий",
    "wrong": [
      "крОвоточащий",
      "кровОточащий",
      "кровотОчащий"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "к"
  },
  {
    "id": "t4_087",
    "word": "лекторов",
    "correct": "лЕкторов",
    "wrong": [
      "лектОров",
      "лекторОв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "л"
  },
  {
    "id": "t4_088",
    "word": "лектор",
    "correct": "лЕктор",
    "wrong": [
      "лектОр"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "л"
  },
  {
    "id": "t4_089",
    "word": "локтя",
    "correct": "лОктя",
    "wrong": [
      "локтЯ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "л"
  },
  {
    "id": "t4_090",
    "word": "локоть",
    "correct": "лОкоть",
    "wrong": [
      "локОть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "л"
  },
  {
    "id": "t4_091",
    "word": "локтей",
    "correct": "локтЕй",
    "wrong": [
      "лОктей"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "л"
  },
  {
    "id": "t4_092",
    "word": "лыжня",
    "correct": "лыжнЯ",
    "wrong": [
      "лЫжня"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "л"
  },
  {
    "id": "t4_093",
    "word": "ловка",
    "correct": "ловкА",
    "wrong": [
      "лОвка"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "л"
  },
  {
    "id": "t4_094",
    "word": "лгала",
    "correct": "лгалА",
    "wrong": [
      "лгАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "л"
  },
  {
    "id": "t4_095",
    "word": "лила",
    "correct": "лилА",
    "wrong": [
      "лИла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "л"
  },
  {
    "id": "t4_096",
    "word": "лилась",
    "correct": "лилАсь",
    "wrong": [
      "лИлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "л"
  },
  {
    "id": "t4_097",
    "word": "местностей",
    "correct": "мЕстностей",
    "wrong": [
      "местнОстей",
      "местностЕй"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "м"
  },
  {
    "id": "t4_098",
    "word": "местность",
    "correct": "мЕстность",
    "wrong": [
      "местнОсть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "м"
  },
  {
    "id": "t4_099",
    "word": "мозаичный",
    "correct": "мозаИчный",
    "wrong": [
      "мОзаичный",
      "мозАичный",
      "мозаичнЫй"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "м"
  },
  {
    "id": "t4_100",
    "word": "намерение",
    "correct": "намЕрение",
    "wrong": [
      "намерЕние"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "н"
  },
  {
    "id": "t4_101",
    "word": "нарост",
    "correct": "нарОст",
    "wrong": [
      "нАрост"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "н"
  },
  {
    "id": "t4_102",
    "word": "недруг",
    "correct": "нЕдруг",
    "wrong": [
      "недрУг"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "н"
  },
  {
    "id": "t4_103",
    "word": "недуг",
    "correct": "недУг",
    "wrong": [
      "нЕдуг"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "н"
  },
  {
    "id": "t4_104",
    "word": "некролог",
    "correct": "некролОг",
    "wrong": [
      "нЕкролог",
      "некрОлог"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "н"
  },
  {
    "id": "t4_105",
    "word": "ненависть",
    "correct": "нЕнависть",
    "wrong": [
      "ненАвисть",
      "ненавИсть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_106",
    "word": "нефтепровод",
    "correct": "нефтепровОд",
    "wrong": [
      "нефтепрОвод"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "н"
  },
  {
    "id": "t4_107",
    "word": "новостей",
    "correct": "новостЕй",
    "wrong": [
      "нОвостей"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "н"
  },
  {
    "id": "t4_108",
    "word": "новость",
    "correct": "нОвость",
    "wrong": [
      "новОсть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_109",
    "word": "ногтя",
    "correct": "нОгтя",
    "wrong": [
      "ногтЯ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "н"
  },
  {
    "id": "t4_110",
    "word": "ноготь",
    "correct": "нОготь",
    "wrong": [
      "ногОть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_111",
    "word": "ногтей",
    "correct": "ногтЕй",
    "wrong": [
      "нОгтей"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "н"
  },
  {
    "id": "t4_112",
    "word": "наврала",
    "correct": "навралА",
    "wrong": [
      "нАврала",
      "наврАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_113",
    "word": "наделит",
    "correct": "наделИт",
    "wrong": [
      "нАделит",
      "надЕлит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_114",
    "word": "надорвалась",
    "correct": "надорвалАсь",
    "wrong": [
      "нАдорвалась",
      "надОрвалась",
      "надорвАлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_115",
    "word": "назвалась",
    "correct": "назвалАсь",
    "wrong": [
      "нАзвалась",
      "назвАлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_116",
    "word": "накренится",
    "correct": "накренИтся",
    "wrong": [
      "нАкренится",
      "накрЕнится",
      "накренитсЯ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_117",
    "word": "налила",
    "correct": "налилА",
    "wrong": [
      "нАлила",
      "налИла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_118",
    "word": "нарвала",
    "correct": "нарвалА",
    "wrong": [
      "нАрвала",
      "нарвАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_119",
    "word": "начать",
    "correct": "начАть",
    "wrong": [
      "нАчать"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_120",
    "word": "начал",
    "correct": "нАчал",
    "wrong": [
      "начАл"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_121",
    "word": "начала",
    "correct": "началА",
    "wrong": [
      "нАчала",
      "начАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_122",
    "word": "начали",
    "correct": "нАчали",
    "wrong": [
      "начАли",
      "началИ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "н"
  },
  {
    "id": "t4_123",
    "word": "наживший",
    "correct": "нажИвший",
    "wrong": [
      "нАживший",
      "нажившИй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "н"
  },
  {
    "id": "t4_124",
    "word": "наливший",
    "correct": "налИвший",
    "wrong": [
      "нАливший",
      "налившИй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "н"
  },
  {
    "id": "t4_125",
    "word": "нанявшийся",
    "correct": "нанЯвшийся",
    "wrong": [
      "нАнявшийся",
      "нанявшИйся",
      "нанявшийсЯ"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "н"
  },
  {
    "id": "t4_126",
    "word": "начавший",
    "correct": "начАвший",
    "wrong": [
      "нАчавший",
      "начавшИй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "н"
  },
  {
    "id": "t4_127",
    "word": "начатый",
    "correct": "нАчатый",
    "wrong": [
      "начАтый",
      "начатЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "н"
  },
  {
    "id": "t4_128",
    "word": "низведённый",
    "correct": "низведЁнный",
    "wrong": [
      "нИзведённый",
      "низвЕдённый",
      "низведённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "н"
  },
  {
    "id": "t4_129",
    "word": "начав",
    "correct": "начАв",
    "wrong": [
      "нАчав"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "н"
  },
  {
    "id": "t4_130",
    "word": "начавшись",
    "correct": "начАвшись",
    "wrong": [
      "нАчавшись",
      "начавшИсь"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "н"
  },
  {
    "id": "t4_131",
    "word": "надолго",
    "correct": "надОлго",
    "wrong": [
      "нАдолго",
      "надолгО"
    ],
    "partOfSpeech": "наречие",
    "firstLetter": "н"
  },
  {
    "id": "t4_132",
    "word": "ненадолго",
    "correct": "ненадОлго",
    "wrong": [
      "нЕнадолго",
      "ненАдолго",
      "ненадолгО"
    ],
    "partOfSpeech": "наречие",
    "firstLetter": "н"
  },
  {
    "id": "t4_133",
    "word": "отзыв",
    "correct": "Отзыв",
    "wrong": [
      "отзЫв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "о"
  },
  {
    "id": "t4_134",
    "word": "отзыв",
    "correct": "отзЫв",
    "wrong": [
      "Отзыв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "о"
  },
  {
    "id": "t4_135",
    "word": "отрочество",
    "correct": "Отрочество",
    "wrong": [
      "отрОчество"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "о"
  },
  {
    "id": "t4_136",
    "word": "оптовый",
    "correct": "оптОвый",
    "wrong": [
      "Оптовый"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "о"
  },
  {
    "id": "t4_137",
    "word": "обзвонит",
    "correct": "обзвонИт",
    "wrong": [
      "Обзвонит",
      "обзвОнит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_138",
    "word": "облегчить",
    "correct": "облегчИть",
    "wrong": [
      "облЕгчить"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_139",
    "word": "облегчит",
    "correct": "облегчИт",
    "wrong": [
      "облЕгчит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_140",
    "word": "облилась",
    "correct": "облилАсь",
    "wrong": [
      "Облилась",
      "облИлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_141",
    "word": "обнялась",
    "correct": "обнялАсь",
    "wrong": [
      "Обнялась",
      "обнЯлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_142",
    "word": "обогнала",
    "correct": "обогналА",
    "wrong": [
      "Обогнала",
      "обОгнала",
      "обогнАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_143",
    "word": "ободрала",
    "correct": "ободралА",
    "wrong": [
      "Ободрала",
      "обОдрала",
      "ободрАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_144",
    "word": "ободрить",
    "correct": "ободрИть",
    "wrong": [
      "Ободрить",
      "обОдрить"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_145",
    "word": "ободрит",
    "correct": "ободрИт",
    "wrong": [
      "Ободрит",
      "обОдрит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_146",
    "word": "ободриться",
    "correct": "ободрИться",
    "wrong": [
      "Ободриться",
      "обОдриться",
      "ободритьсЯ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_147",
    "word": "ободрится",
    "correct": "ободрИтся",
    "wrong": [
      "Ободрится",
      "обОдрится",
      "ободритсЯ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_148",
    "word": "обострить",
    "correct": "обострИть",
    "wrong": [
      "Обострить",
      "обОстрить"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_149",
    "word": "одолжить",
    "correct": "одолжИть",
    "wrong": [
      "Одолжить",
      "одОлжить"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_150",
    "word": "одолжит",
    "correct": "одолжИт",
    "wrong": [
      "Одолжит",
      "одОлжит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_151",
    "word": "озлобить",
    "correct": "озлОбить",
    "wrong": [
      "Озлобить",
      "озлобИть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_152",
    "word": "оклеить",
    "correct": "оклЕить",
    "wrong": [
      "Оклеить",
      "оклеИть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_153",
    "word": "окружит",
    "correct": "окружИт",
    "wrong": [
      "Окружит",
      "окрУжит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_154",
    "word": "опошлить",
    "correct": "опОшлить",
    "wrong": [
      "Опошлить",
      "опошлИть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_155",
    "word": "осведомиться",
    "correct": "освЕдомиться",
    "wrong": [
      "осведОмиться",
      "осведомИться",
      "осведомитьсЯ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_156",
    "word": "осведомится",
    "correct": "освЕдомится",
    "wrong": [
      "осведОмится",
      "осведомИтся",
      "осведомитсЯ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_157",
    "word": "отбыла",
    "correct": "отбылА",
    "wrong": [
      "Отбыла",
      "отбЫла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_158",
    "word": "отдала",
    "correct": "отдалА",
    "wrong": [
      "Отдала",
      "отдАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_159",
    "word": "откупорить",
    "correct": "откУпорить",
    "wrong": [
      "Откупорить",
      "откупОрить",
      "откупорИть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_160",
    "word": "отозвала",
    "correct": "отозвалА",
    "wrong": [
      "Отозвала",
      "отОзвала",
      "отозвАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_161",
    "word": "отозвалась",
    "correct": "отозвалАсь",
    "wrong": [
      "Отозвалась",
      "отОзвалась",
      "отозвАлась"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "о"
  },
  {
    "id": "t4_162",
    "word": "облегчённый",
    "correct": "облегчЁнный",
    "wrong": [
      "Облегчённый",
      "облЕгчённый",
      "облегчённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "о"
  },
  {
    "id": "t4_163",
    "word": "ободрённый",
    "correct": "ободрЁнный",
    "wrong": [
      "Ободрённый",
      "обОдрённый",
      "ободрённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "о"
  },
  {
    "id": "t4_164",
    "word": "обострённый",
    "correct": "обострЁнный",
    "wrong": [
      "Обострённый",
      "обОстрённый",
      "обострённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "о"
  },
  {
    "id": "t4_165",
    "word": "отключённый",
    "correct": "отключЁнный",
    "wrong": [
      "Отключённый",
      "отклЮчённый",
      "отключённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "о"
  },
  {
    "id": "t4_166",
    "word": "отдав",
    "correct": "отдАв",
    "wrong": [
      "Отдав"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "о"
  },
  {
    "id": "t4_167",
    "word": "партер",
    "correct": "партЕр",
    "wrong": [
      "пАртер"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "п"
  },
  {
    "id": "t4_168",
    "word": "портфель",
    "correct": "портфЕль",
    "wrong": [
      "пОртфель"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "п"
  },
  {
    "id": "t4_169",
    "word": "поручни",
    "correct": "пОручни",
    "wrong": [
      "поручнИ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "п"
  },
  {
    "id": "t4_170",
    "word": "приданое",
    "correct": "придАное",
    "wrong": [
      "прИданое"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "п"
  },
  {
    "id": "t4_171",
    "word": "призыв",
    "correct": "призЫв",
    "wrong": [
      "прИзыв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_172",
    "word": "прозорливый",
    "correct": "прозорлИвый",
    "wrong": [
      "прОзорливый",
      "прозОрливый",
      "прозорливЫй"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "п"
  },
  {
    "id": "t4_173",
    "word": "прозорлива",
    "correct": "прозорлИва",
    "wrong": [
      "прОзорлива",
      "прозОрлива",
      "прозорливА"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "п"
  },
  {
    "id": "t4_174",
    "word": "перезвонит",
    "correct": "перезвонИт",
    "wrong": [
      "пЕрезвонит",
      "перЕзвонит",
      "перезвОнит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_175",
    "word": "перелила",
    "correct": "перелилА",
    "wrong": [
      "пЕрелила",
      "перЕлила",
      "перелИла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_176",
    "word": "плодоносить",
    "correct": "плодоносИть",
    "wrong": [
      "плОдоносить",
      "плодОносить",
      "плодонОсить"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_177",
    "word": "пломбировать",
    "correct": "пломбировАть",
    "wrong": [
      "плОмбировать",
      "пломбИровать",
      "пломбирОвать"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_178",
    "word": "повторит",
    "correct": "повторИт",
    "wrong": [
      "пОвторит",
      "повтОрит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_179",
    "word": "позвала",
    "correct": "позвалА",
    "wrong": [
      "пОзвала",
      "позвАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_180",
    "word": "позвонит",
    "correct": "позвонИт",
    "wrong": [
      "позвОнит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_181",
    "word": "полила",
    "correct": "полилА",
    "wrong": [
      "пОлила",
      "полИла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_182",
    "word": "положить",
    "correct": "положИть",
    "wrong": [
      "пОложить",
      "полОжить"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_183",
    "word": "положил",
    "correct": "положИл",
    "wrong": [
      "пОложил",
      "полОжил"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_184",
    "word": "понять",
    "correct": "понЯть",
    "wrong": [
      "пОнять"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_185",
    "word": "поняла",
    "correct": "понялА",
    "wrong": [
      "пОняла",
      "понЯла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_186",
    "word": "послала",
    "correct": "послАла",
    "wrong": [
      "пОслала",
      "послалА"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_187",
    "word": "прибыть",
    "correct": "прибЫть",
    "wrong": [
      "прИбыть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_188",
    "word": "прибыл",
    "correct": "прИбыл",
    "wrong": [
      "прибЫл"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "п"
  },
  {
    "id": "t4_189",
    "word": "прибыла",
    "correct": "прибылА",
    "wrong": [
      "прИбыла",
      "прибЫла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_190",
    "word": "прибыли",
    "correct": "прИбыли",
    "wrong": [
      "прибЫли",
      "прибылИ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_191",
    "word": "принять",
    "correct": "принЯть",
    "wrong": [
      "прИнять"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_192",
    "word": "принял",
    "correct": "прИнял",
    "wrong": [
      "принЯл"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "п"
  },
  {
    "id": "t4_193",
    "word": "приняла",
    "correct": "принялА",
    "wrong": [
      "прИняла",
      "принЯла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_194",
    "word": "приняли",
    "correct": "прИняли",
    "wrong": [
      "принЯли",
      "принялИ"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "п"
  },
  {
    "id": "t4_195",
    "word": "повторённый",
    "correct": "повторЁнный",
    "wrong": [
      "пОвторённый",
      "повтОрённый",
      "повторённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_196",
    "word": "поделённый",
    "correct": "поделЁнный",
    "wrong": [
      "пОделённый",
      "подЕлённый",
      "поделённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_197",
    "word": "понявший",
    "correct": "понЯвший",
    "wrong": [
      "пОнявший",
      "понявшИй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_198",
    "word": "принятый",
    "correct": "прИнятый",
    "wrong": [
      "принЯтый",
      "принятЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_199",
    "word": "принята",
    "correct": "принятА",
    "wrong": [
      "прИнята",
      "принЯта"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_200",
    "word": "приручённый",
    "correct": "приручЁнный",
    "wrong": [
      "прИручённый",
      "прирУчённый",
      "приручённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_201",
    "word": "проживший",
    "correct": "прожИвший",
    "wrong": [
      "прОживший",
      "прожившИй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_202",
    "word": "подняв",
    "correct": "поднЯв",
    "wrong": [
      "пОдняв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_203",
    "word": "поняв",
    "correct": "понЯв",
    "wrong": [
      "пОняв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_204",
    "word": "прибыв",
    "correct": "прибЫв",
    "wrong": [
      "прИбыв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "п"
  },
  {
    "id": "t4_205",
    "word": "рвала",
    "correct": "рвалА",
    "wrong": [
      "рвАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "р"
  },
  {
    "id": "t4_206",
    "word": "свёкла",
    "correct": "свЁкла",
    "wrong": [
      "свёклА"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "с"
  },
  {
    "id": "t4_207",
    "word": "сироты",
    "correct": "сирОты",
    "wrong": [
      "сИроты",
      "сиротЫ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "с"
  },
  {
    "id": "t4_208",
    "word": "сирота",
    "correct": "сиротА",
    "wrong": [
      "сИрота",
      "сирОта"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "с"
  },
  {
    "id": "t4_209",
    "word": "созыв",
    "correct": "созЫв",
    "wrong": [
      "сОзыв"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "с"
  },
  {
    "id": "t4_210",
    "word": "сосредоточение",
    "correct": "сосредотОчение",
    "wrong": [
      "сОсредоточение",
      "сосрЕдоточение",
      "сосредОточение"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "с"
  },
  {
    "id": "t4_211",
    "word": "средства",
    "correct": "срЕдства",
    "wrong": [
      "средствА"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "с"
  },
  {
    "id": "t4_212",
    "word": "средство",
    "correct": "срЕдство",
    "wrong": [
      "средствО"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "с"
  },
  {
    "id": "t4_213",
    "word": "статуя",
    "correct": "стАтуя",
    "wrong": [
      "статУя"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "с"
  },
  {
    "id": "t4_214",
    "word": "столяр",
    "correct": "столЯр",
    "wrong": [
      "стОляр"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "с"
  },
  {
    "id": "t4_215",
    "word": "сливовый",
    "correct": "слИвовый",
    "wrong": [
      "сливОвый",
      "сливовЫй"
    ],
    "partOfSpeech": "прилагательное",
    "firstLetter": "с"
  },
  {
    "id": "t4_216",
    "word": "сверлит",
    "correct": "сверлИт",
    "wrong": [
      "свЕрлит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "с"
  },
  {
    "id": "t4_217",
    "word": "сняла",
    "correct": "снялА",
    "wrong": [
      "снЯла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "с"
  },
  {
    "id": "t4_218",
    "word": "соврала",
    "correct": "совралА",
    "wrong": [
      "сОврала",
      "соврАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "с"
  },
  {
    "id": "t4_219",
    "word": "создала",
    "correct": "создалА",
    "wrong": [
      "сОздала",
      "создАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "с"
  },
  {
    "id": "t4_220",
    "word": "сорвала",
    "correct": "сорвалА",
    "wrong": [
      "сОрвала",
      "сорвАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "с"
  },
  {
    "id": "t4_221",
    "word": "сорит",
    "correct": "сорИт",
    "wrong": [
      "сОрит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "с"
  },
  {
    "id": "t4_222",
    "word": "снята",
    "correct": "снятА",
    "wrong": [
      "снЯта"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "с"
  },
  {
    "id": "t4_223",
    "word": "согнутый",
    "correct": "сОгнутый",
    "wrong": [
      "согнУтый",
      "согнутЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "с"
  },
  {
    "id": "t4_224",
    "word": "создав",
    "correct": "создАв",
    "wrong": [
      "сОздав"
    ],
    "partOfSpeech": "деепричастие",
    "firstLetter": "с"
  },
  {
    "id": "t4_225",
    "word": "таможня",
    "correct": "тамОжня",
    "wrong": [
      "тАможня"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "т"
  },
  {
    "id": "t4_226",
    "word": "торты",
    "correct": "тОрты",
    "wrong": [
      "тортЫ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "т"
  },
  {
    "id": "t4_227",
    "word": "туфля",
    "correct": "тУфля",
    "wrong": [
      "туфлЯ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "т"
  },
  {
    "id": "t4_228",
    "word": "убрала",
    "correct": "убралА",
    "wrong": [
      "Убрала",
      "убрАла"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "у"
  },
  {
    "id": "t4_229",
    "word": "углубить",
    "correct": "углубИть",
    "wrong": [
      "Углубить",
      "углУбить"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "у"
  },
  {
    "id": "t4_230",
    "word": "укрепит",
    "correct": "укрепИт",
    "wrong": [
      "Укрепит",
      "укрЕпит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "у"
  },
  {
    "id": "t4_231",
    "word": "углублённый",
    "correct": "углублЁнный",
    "wrong": [
      "Углублённый",
      "углУблённый",
      "углублённЫй"
    ],
    "partOfSpeech": "причастие",
    "firstLetter": "у"
  },
  {
    "id": "t4_232",
    "word": "цемент",
    "correct": "цемЕнт",
    "wrong": [
      "цЕмент"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "ц"
  },
  {
    "id": "t4_233",
    "word": "центнер",
    "correct": "цЕнтнер",
    "wrong": [
      "центнЕр"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "ц"
  },
  {
    "id": "t4_234",
    "word": "цепочка",
    "correct": "цепОчка",
    "wrong": [
      "цЕпочка"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "ц"
  },
  {
    "id": "t4_235",
    "word": "черпать",
    "correct": "чЕрпать",
    "wrong": [
      "черпАть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "ч"
  },
  {
    "id": "t4_236",
    "word": "шарфы",
    "correct": "шАрфы",
    "wrong": [
      "шарфЫ"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "ш"
  },
  {
    "id": "t4_237",
    "word": "шофёр",
    "correct": "шофЁр",
    "wrong": [
      "шОфёр"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "ш"
  },
  {
    "id": "t4_238",
    "word": "щемит",
    "correct": "щемИт",
    "wrong": [
      "щЕмит"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "щ"
  },
  {
    "id": "t4_239",
    "word": "щёлкать",
    "correct": "щЁлкать",
    "wrong": [
      "щёлкАть"
    ],
    "partOfSpeech": "глагол",
    "firstLetter": "щ"
  },
  {
    "id": "t4_240",
    "word": "эксперт",
    "correct": "экспЕрт",
    "wrong": [
      "Эксперт"
    ],
    "partOfSpeech": "существительное",
    "firstLetter": "э"
  }
];
