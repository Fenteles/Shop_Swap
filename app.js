document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;  // Инициализация Web App Telegram

    // При загрузке Web App отправляем сообщение боту
    tg.sendData("Веб подключён и работает корректно");
    console.log("Отправлено сообщение: Веб подключён и работает корректно");

    // Настраиваем отображение кнопки "Закрыть" в Telegram Web App
    tg.MainButton.text = "Закрыть магазин";
    tg.MainButton.show();

    tg.onEvent("mainButtonClicked", function() {
        tg.close();  // Закрыть Web App при нажатии на основную кнопку
    });

    // Данные о товарах
    const products = [
        {
            id: 1,
            name: "Товар 1",
            description: "Описание товара 1",
            price: 100,
            imageUrl: "https://via.placeholder.com/400x300",
        },
        {
            id: 2,
            name: "Товар 2",
            description: "Описание товара 2",
            price: 200,
            imageUrl: "https://via.placeholder.com/400x300",
        }
    ];

    let currentProductIndex = 0;

    // Функция для отображения товара
    function displayProduct(product) {
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = product.price.toFixed(2);
        document.getElementById("product-image").src = product.imageUrl;
    }

    // Показать следующий товар
    function showNextProduct() {
        currentProductIndex = (currentProductIndex + 1) % products.length;
        displayProduct(products[currentProductIndex]);
    }

    // Обработчик нажатия кнопки "Лайк"
    document.getElementById("like-button").addEventListener("click", function () {
        const product = products[currentProductIndex];
        const dataToSend = JSON.stringify({ action: "like", productId: product.id });
        tg.sendData(dataToSend);  // Отправляем данные в бота
        console.log("Данные отправлены в бот: ", dataToSend);
        showNextProduct();  // Показать следующий товар
    });

    // Обработчик нажатия кнопки "Дизлайк"
    document.getElementById("dislike-button").addEventListener("click", function () {
        const product = products[currentProductIndex];
        const dataToSend = JSON.stringify({ action: "dislike", productId: product.id });
        tg.sendData(dataToSend);  // Отправляем данные в бота
        console.log("Данные отправлены в бот: ", dataToSend);
        showNextProduct();  // Показать следующий товар
    });

    // Начальное отображение первого товара
    displayProduct(products[currentProductIndex]);
});
