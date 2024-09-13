document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;  // Инициализация Web App Telegram

    // Получаем данные товара с ID = 1 (заглушка)
    const product = {
        id: 1,
        name: "Товар 1",
        description: "Описание товара 1",
        price: 100,
        imageUrl: "https://via.placeholder.com/400x300",
    };

    // Отображение товара
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = product.price.toFixed(2);
    document.getElementById("product-image").src = product.imageUrl;

    // Обработчик нажатия кнопки "Лайк"
    document.getElementById("like-button").addEventListener("click", function () {
        const dataToSend = JSON.stringify({ action: "like", productId: product.id });
        tg.sendData(dataToSend);  // Отправляем данные в бота
        console.log("Данные отправлены в бот: ", dataToSend);
    });

    console.log("Web App загружен и готов к работе.");
});
