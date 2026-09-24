import os
import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart, Command
from aiogram.client.default import DefaultBotProperties
from aiogram.types import (
    InlineKeyboardMarkup, 
    InlineKeyboardButton, 
    WebAppInfo, 
    MenuButtonWebApp, 
    ReplyKeyboardMarkup, 
    KeyboardButton
)

# Загрузка .env если есть python-dotenv
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

BOT_TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL", "")

if not BOT_TOKEN:
    print("❌ Внимание: укажите BOT_TOKEN в файле .env")
    print("   Подробная инструкция — в README.md")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

bot = Bot(
    token=BOT_TOKEN or "dummy_token",
    default=DefaultBotProperties(parse_mode="HTML")
)
dp = Dispatcher()


def get_inline_keyboard():
    """Инлайн-кнопка для запуска Mini App"""
    if WEBAPP_URL:
        return InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(
                text="🦕 Открыть тренажёр ЕГЭ",
                web_app=WebAppInfo(url=WEBAPP_URL)
            )]
        ])
    return None


def get_reply_keyboard():
    """Нижняя постоянная клавиатура с кнопкой WebApp"""
    if WEBAPP_URL:
        return ReplyKeyboardMarkup(
            keyboard=[
                [KeyboardButton(text="🦕 Открыть тренажёр", web_app=WebAppInfo(url=WEBAPP_URL))]
            ],
            resize_keyboard=True,
            is_persistent=True
        )
    return None


@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    """Обработчик команды /start"""
    welcome_text = (
        "👋 <b>Добро пожаловать в Тренажёр ЕГЭ по русскому языку!</b> 🦕\n\n"
        "Здесь собраны <b>все официальные слова</b> для подготовки к экзамену:\n\n"
        "📝 <b>Задание №9</b> — 537 словарных слов (все непроверяемые гласные корня со всеми формами)\n"
        "🔤 <b>Задание №4</b> — 240 слов с нормативными ударениями из орфоэпического словника ФИПИ\n\n"
        "✨ <b>Возможности:</b>\n"
        "• Тренировки по отдельным буквам алфавита\n"
        "• Блиц-повтор ошибок и отработка сложных слов\n"
        "• Избранные слова и подробная статистика\n\n"
    )

    if WEBAPP_URL:
        welcome_text += "Нажмите кнопку <b>«🦕 Открыть тренажёр»</b> ниже, чтобы начать! 👇"
    else:
        welcome_text += (
            "⚠️ <i>Ссылка WEBAPP_URL ещё не указана в файле .env.</i>\n"
            "Запустите ngrok или укажите адрес хостинга, чтобы открывать тренажёр прямо в Telegram."
        )

    await message.answer(
        welcome_text,
        reply_markup=get_inline_keyboard()
    )


@dp.message(Command("help"))
@dp.message(lambda msg: msg.text == "📊 Помощь и команды")
async def cmd_help(message: types.Message):
    """Справка и список команд"""
    help_text = (
        "📚 <b>Справка по тренажёру:</b>\n\n"
        "/start — Главное меню и запуск приложения\n"
        "/help — Эта инструкция\n\n"
        "💡 <b>Как тренироваться эффективно:</b>\n"
        "1. Занимайтесь по 10–15 минут каждый день.\n"
        "2. В Задании №9 выбирайте буквы, где чаще всего сомневаетесь.\n"
        "3. Добавляйте сложные слова в <b>Избранное ⭐</b> прямо во время сессии.\n"
        "4. Всегда нажимайте <b>«Повторить ошибки»</b> в конце сессии!"
    )
    await message.answer(help_text, reply_markup=get_inline_keyboard())


@dp.callback_query(lambda c: c.data == "about")
async def cb_about(callback: types.CallbackQuery):
    """Информация о базе слов"""
    await callback.message.answer(
        "📖 <b>Банк слов ЕГЭ 2025–2026:</b>\n\n"
        "• <b>537 слов в Задании №9</b> — полный официальный список всех корней с непроверяемыми безударными гласными.\n"
        "• <b>240 слов в Задании №4</b> — полный орфоэпический словник с трудными ударениями.\n\n"
        "Все слова выверены преподавателями и соответствуют критериям ФИПИ."
    )
    await callback.answer()


@dp.callback_query(lambda c: c.data == "tips")
async def cb_tips(callback: types.CallbackQuery):
    """Советы к экзамену"""
    await callback.message.answer(
        "💡 <b>Лайфхаки для ЕГЭ:</b>\n\n"
        "• В глаголах на <i>-ить</i> ударение чаще всего падает на окончание: <i>звонИт, включИт, облегчИть</i>.\n"
        "• В женском роде прошедшего времени ударение переходит на окончание <i>-А</i>: <i>бралА, ждалА, снялА</i> (исключение: <i>клАла, крАлась</i>).\n"
        "• Словарные слова запоминаются через зрительную память — тренируйте их регулярно!"
    )
    await callback.answer()


@dp.message()
async def default_handler(message: types.Message):
    """Любое сообщение"""
    await message.answer(
        "Нажмите <b>«🦕 Открыть тренажёр ЕГЭ»</b> ниже, чтобы запустить приложение:",
        reply_markup=get_inline_keyboard()
    )


async def start_health_server():
    """Запуск легкого HTTP-сервера для совместимости с Render/Koyeb Web Service"""
    port_str = os.getenv("PORT")
    if not port_str:
        return
    try:
        port = int(port_str)
        from aiohttp import web

        async def handle_ping(request):
            return web.Response(text="EGE Trainer Bot is running! 🦕")

        app = web.Application()
        app.router.add_get("/", handle_ping)
        app.router.add_get("/health", handle_ping)

        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, "0.0.0.0", port)
        await site.start()
        logger.info(f"🌐 Health-сервер успешно запущен на порту {port}")
    except Exception as e:
        logger.warning(f"Не удалось запустить health-сервер на порту {port_str}: {e}")


async def main():
    if not BOT_TOKEN or BOT_TOKEN == "dummy_token":
        logger.error("BOT_TOKEN не задан! Создайте бота через @BotFather и укажите токен в .env файле.")
        return

    # Запуск HTTP health сервера для Render (если задан PORT)
    await start_health_server()

    # Установка кнопки меню (Web App)
    if WEBAPP_URL:
        try:
            await bot.set_chat_menu_button(
                menu_button=MenuButtonWebApp(
                    text="🦕 Тренажёр",
                    web_app=WebAppInfo(url=WEBAPP_URL)
                )
            )
            logger.info("Меню-кнопка WebApp успешно установлена в Telegram!")
        except Exception as e:
            logger.warning(f"Не удалось установить MenuButton: {e}")

    logger.info("🦕 Бот успешно запущен и ожидает пользователей!")
    await dp.start_polling(bot)


if __name__ == "__main__":
    if not BOT_TOKEN:
        print("Запустите бота с валидным BOT_TOKEN в .env файле.")
    else:
        asyncio.run(main())

