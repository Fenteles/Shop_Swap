document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;  // Инициализация Web App Telegram

    // Обработчик кнопки "Проверить связь"
    document.getElementById("check-connection").addEventListener("click", function () {
        // Отправляем сообщение в логи бота
        tg.sendData("Связь проверена через Web App.");
        console.log("Сообщение отправлено в бота: Связь проверена через Web App.");
    });

    console.log("Web App загружено и работает.");
});
