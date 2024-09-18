const tg = window.Telegram.WebApp;
const logArea = document.getElementById('logArea');

// Функция для вывода сообщений в Web App
function logMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    logArea.appendChild(p);
    logArea.scrollTop = logArea.scrollHeight;  // Автопрокрутка вниз
}

// Добавляем обработчик на кнопку "Клик"
document.getElementById('likeButton').addEventListener('click', function() {
    logMessage('Отправляем запрос боту для получения случайного товара...');

    // Запрашиваем у бота случайный ID товара
    fetch('https://54e2-46-211-248-233.ngrok-free.app/api/random_product_id')
    .then(response => response.json())
    .then(data => {
        const productId = data.product_id;
        logMessage(`Получен случайный ID товара: ${productId}`);

        // Переходим на страницу товара
        const productUrl = `https://54e2-46-211-248-233.ngrok-free.app/api/products/id/${productId}`;
        window.location.href = productUrl;
    })
    .catch(error => {
        logMessage(`Ошибка при получении случайного товара: ${error}`);
    });
});
