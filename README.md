# 🦕 Тренажёр ЕГЭ по русскому языку — Telegram Mini App

Интерактивный тренажёр для подготовки к заданиям **№4 (Ударения)** и **№9 (Словарные слова)** ЕГЭ по русскому языку.

---

## 📋 Содержание

1. [Регистрация бота в Telegram](#1-регистрация-бота-в-telegram)
2. [Установка и запуск локально](#2-установка-и-запуск-локально)
3. [Настройка Web App (HTTPS через ngrok)](#3-настройка-web-app-https-через-ngrok)
4. [Привязка Web App к боту](#4-привязка-web-app-к-боту)
5. [Как заменить слова на свои](#5-как-заменить-слова-на-свои)
6. [Деплой на сервер (опционально)](#6-деплой-на-сервер-опционально)
7. [Структура проекта](#7-структура-проекта)

---

## 1. Регистрация бота в Telegram

### Шаг 1: Откройте @BotFather

Откройте Telegram и найдите бота **@BotFather** (с синей галочкой).

Ссылка: [https://t.me/BotFather](https://t.me/BotFather)

### Шаг 2: Создайте нового бота

Отправьте команду:

```
/newbot
```

BotFather спросит **имя бота** (отображаемое):

```
Тренажёр ЕГЭ 🦕
```

Затем спросит **username бота** (должен заканчиваться на `bot`):

```
ege_trainer_mybot
```

> 💡 Username должен быть уникальным. Если занят — попробуйте другой, например: `ege_spelling_trainer_bot`

### Шаг 3: Сохраните токен

BotFather ответит сообщением с токеном:

```
Done! Congratulations on your new bot.
...
Use this token to access the HTTP API:
7123456789:AAF-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Скопируйте этот токен** — он понадобится дальше.

> ⚠️ **Никому не показывайте токен!** Это пароль от вашего бота.

### Шаг 4 (необязательно): Настройте описание и аватарку

```
/setdescription
```
→ Выберите бота → Введите описание:
```
Тренажёр для подготовки к ЕГЭ по русскому языку. Задания №4 и №9.
```

```
/setuserpic
```
→ Выберите бота → Отправьте картинку (можно сделать скриншот динозаврика из приложения)

---

## 2. Установка и запуск локально

### Требования

- **Python 3.9+** — [скачать](https://www.python.org/downloads/)
- **pip** — обычно устанавливается вместе с Python

### Шаг 1: Откройте папку проекта в терминале

```powershell
cd C:\Users\sigma\Desktop\ege-trainer
```

### Шаг 2: Создайте виртуальное окружение (рекомендуется)

```powershell
python -m venv venv
.\venv\Scripts\activate
```

После активации в начале строки терминала появится `(venv)`.

### Шаг 3: Установите зависимости

```powershell
pip install -r requirements.txt
```

Ожидаемый вывод:
```
Successfully installed aiogram-3.x.x python-dotenv-1.x.x ...
```

### Шаг 4: Создайте файл .env

Скопируйте шаблон:

```powershell
copy .env.example .env
```

Откройте файл `.env` в текстовом редакторе и вставьте ваш токен:

```env
BOT_TOKEN=7123456789:AAF-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WEBAPP_URL=https://your-url.ngrok-free.app/webapp/
```

> URL для WEBAPP_URL мы получим в следующем шаге.

### Шаг 5: Запустите бота

```powershell
python bot.py
```

Ожидаемый вывод:
```
INFO:__main__:🦕 Бот запущен!
```

Теперь откройте вашего бота в Telegram и отправьте `/start`.

---

## 3. Настройка Web App (HTTPS через ngrok)

Telegram требует **HTTPS** для Web App. Для локальной разработки используйте **ngrok**.

### Шаг 1: Установите ngrok

Скачайте с [https://ngrok.com/download](https://ngrok.com/download) и распакуйте.

Или установите через Chocolatey:
```powershell
choco install ngrok
```

### Шаг 2: Зарегистрируйтесь на ngrok.com

Перейдите на [https://dashboard.ngrok.com/signup](https://dashboard.ngrok.com/signup) и создайте бесплатный аккаунт.

### Шаг 3: Авторизуйте ngrok

На странице [https://dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) скопируйте токен и выполните:

```powershell
ngrok config add-authtoken YOUR_NGROK_TOKEN
```

### Шаг 4: Запустите локальный HTTP-сервер для Web App

Откройте **новый терминал** (бот должен продолжать работать в первом):

```powershell
cd C:\Users\sigma\Desktop\ege-trainer\webapp
python -m http.server 8080
```

Ожидаемый вывод:
```
Serving HTTP on :: port 8080 ...
```

### Шаг 5: Запустите ngrok

Откройте **ещё один терминал**:

```powershell
ngrok http 8080
```

Ожидаемый вывод:
```
Session Status    online
Forwarding        https://xxxx-xx-xx.ngrok-free.app -> http://localhost:8080
```

**Скопируйте HTTPS-ссылку** (например: `https://a1b2-93-184.ngrok-free.app`)

### Шаг 6: Обновите .env

Откройте `.env` и укажите URL:

```env
WEBAPP_URL=https://a1b2-93-184.ngrok-free.app
```

### Шаг 7: Перезапустите бота

Остановите бота (Ctrl+C) и запустите снова:

```powershell
python bot.py
```

Теперь в Telegram при нажатии «🦕 Открыть тренажёр» откроется ваш Web App!

---

## 4. Привязка Web App к боту

### Через кнопку меню (опционально)

Если хотите добавить кнопку Web App в меню бота (рядом с полем ввода):

Откройте @BotFather и отправьте:

```
/setmenubutton
```

→ Выберите бота

→ Отправьте URL вашего Web App:
```
https://a1b2-93-184.ngrok-free.app
```

→ Отправьте текст кнопки:
```
🦕 Тренажёр
```

Теперь в чате с ботом появится кнопка меню для быстрого запуска.

---

## 5. Как заменить слова на свои

Файл со словами: `webapp/data.js`

### Формат задания №9 (Словарные слова)

```javascript
{
  id: "t9_01",              // уникальный ID (не повторяйте!)
  word: "абитуриент",       // правильное написание
  display: "аб_туриент",   // с пропуском (_)
  correctLetter: "и",      // правильная буква
  wrongLetters: ["е"],      // неправильные варианты
  tag: "и"                  // для фильтрации по буквам
}
```

### Формат задания №4 (Ударения)

```javascript
{
  id: "t4_01",              // уникальный ID
  word: "звонит",           // слово строчными
  correct: "звонИт",       // правильное ударение (ЗАГЛАВНАЯ = ударная)
  wrong: ["звОнит"],        // неправильные варианты
  partOfSpeech: "глагол"   // часть речи
}
```

### Как добавить слово

1. Откройте `webapp/data.js`
2. Найдите массив `WORDS_TASK9` или `WORDS_TASK4`
3. Добавьте новый объект в массив, следуя формату выше
4. Убедитесь, что `id` уникален
5. Сохраните файл — изменения применятся сразу (обновите страницу)

### Пример добавления слова в №9

```javascript
{
  id: "t9_26",
  word: "пессимист",
  display: "п_ссимист",
  correctLetter: "е",
  wrongLetters: ["и"],
  tag: "е"
},
```

### Пример добавления слова в №4

```javascript
{
  id: "t4_26",
  word: "досуг",
  correct: "досУг",
  wrong: ["дОсуг"],
  partOfSpeech: "существительное"
},
```

---

## 6. Деплой на сервер (опционально)

Для постоянной работы без ngrok можно развернуть на бесплатном хостинге.

### Вариант 1: GitHub Pages (только Web App)

1. Создайте репозиторий на GitHub
2. Загрузите папку `webapp/` в репозиторий
3. Включите GitHub Pages в настройках репозитория
4. URL будет: `https://username.github.io/repo-name/`
5. Укажите этот URL в `.env` как `WEBAPP_URL`

### Вариант 2: Railway (бот + Web App)

1. Зарегистрируйтесь на [railway.app](https://railway.app)
2. Создайте новый проект → Deploy from GitHub
3. Добавьте переменную окружения `BOT_TOKEN`
4. Railway автоматически запустит бота

### Вариант 3: VPS (полный контроль)

1. Арендуйте VPS (например, на [reg.ru](https://reg.ru) или [timeweb.cloud](https://timeweb.cloud))
2. Установите Python 3.9+, nginx
3. Настройте nginx для отдачи `webapp/` по HTTPS
4. Запустите `bot.py` через systemd или screen

---

## 7. Структура проекта

```
ege-trainer/
├── bot.py              # Telegram-бот (Python, aiogram 3)
├── requirements.txt    # Python-зависимости
├── .env.example        # Шаблон переменных окружения
├── .env                # Ваши настройки (НЕ коммитить!)
├── README.md           # Эта инструкция
└── webapp/             # Web-приложение (Mini App)
    ├── index.html      # Главная страница
    ├── style.css       # Стили (зелёная тема)
    ├── app.js          # Логика приложения (SPA)
    ├── data.js         # Данные слов (замените на свои!)
    └── storage.js      # Управление localStorage
```

---

## ❓ FAQ

**Q: Бот не отвечает на /start**
A: Проверьте, что `BOT_TOKEN` в `.env` указан правильно и бот запущен (`python bot.py`).

**Q: Web App не открывается в Telegram**
A: Убедитесь, что `WEBAPP_URL` содержит HTTPS-ссылку и ngrok/сервер работает.

**Q: Как обновить слова?**
A: Отредактируйте `webapp/data.js`, сохраните и обновите страницу в Telegram.

**Q: Статистика пропала**
A: Статистика хранится в localStorage браузера. При очистке кэша Telegram она может сброситься.
