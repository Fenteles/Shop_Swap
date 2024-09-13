document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;

    // Функция для получения товаров с сервера
    async function fetchProducts() {
        try {
            // Здесь будет отправлен запрос на сервер бота
            const response = await fetch('http://localhost:8000/products');  // Локальный сервер, где работает бот
            const data = await response.json();

            // Отображение товаров
            displayProducts(data.products);
        } catch (error) {
            console.error("Ошибка при получении товаров:", error);
        }
    }

    // Функция для отображения товаров
    function displayProducts(products) {
        const productName = document.getElementById("product-name");
        const productDescription = document.getElementById("product-description");
        const productPrice = document.getElementById("product-price");
        const productImage = document.getElementById("product-image");

        let currentProductIndex = 0;

        function showNextProduct() {
            currentProductIndex = (currentProductIndex + 1) % products.length;
            const product = products[currentProductIndex];
            productName.textContent = product.name;
            productDescription.textContent = product.description;
            productPrice.textContent = product.price.toFixed(2);
            productImage.src = product.imageUrl;
        }

        document.getElementById("like-button").addEventListener("click", function () {
            tg.sendData(JSON.stringify({ action: "like", product: products[currentProductIndex] }));
            showNextProduct();
        });

        document.getElementById("dislike-button").addEventListener("click", function () {
            tg.sendData(JSON.stringify({ action: "dislike", product: products[currentProductIndex] }));
            showNextProduct();
        });

        showNextProduct();  // Показываем первый товар
    }

    // Получение товаров при загрузке Web App
    fetchProducts();
});
