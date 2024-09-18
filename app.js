// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
const logArea = document.getElementById('logArea');

// Функция для вывода сообщений в лог
function logMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    logArea.appendChild(p);
    logArea.scrollTop = logArea.scrollHeight;  // Автопрокрутка вниз
}

// Обработчик для кнопки "Клик"
document.getElementById('likeButton').addEventListener('click', function() {
    const username = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.username : 'Неизвестный пользователь';
    logMessage(`Отправляем запрос на сервер с username: ${username}`);

    fetch('https://003f-46-211-231-218.ngrok-free.app/api/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })  // Передаем username пользователя
    })
    .then(response => response.json())
    .then(data => {
        logMessage(`Ответ от сервера: ${data.message}`);
        if (data.status === 'success') {
            alert('Лайк успешно добавлен!');
        } else {
            alert('Ошибка при добавлении лайка.');
        }
    })
    .catch(error => {
        logMessage(`Ошибка при отправке запроса: ${error}`);
        alert('Ошибка при добавлении лайка.');
    });
});

// Функция для создания карточки товара
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');  // Добавим класс для стилей

    const img = document.createElement('img');
    img.src = product.photo_url;
    img.alt = product.name;

    const name = document.createElement('h2');
    name.textContent = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `Цена: ${product.price} руб.`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(price);

    return card;
}

// Запрос товаров с сервера
fetch('https://003f-46-211-231-218.ngrok-free.app/api/products')
    .then(response => {
        // Логируем содержимое ответа перед парсингом как JSON
        return response.text().then(text => {
            logMessage(`Содержимое ответа: ${text}`);
            try {
                // Пробуем распарсить как JSON
                const data = JSON.parse(text);
                return data;
            } catch (error) {
                throw new Error(`Ошибка парсинга JSON: ${error}`);
            }
        });
    })
    .then(data => {
        if (data && data.status === 'success') {
            const productsContainer = document.getElementById('productsContainer');
            data.products.forEach(product => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
            });
            logMessage('Товары успешно загружены.');
        } else {
            logMessage('Ошибка при загрузке товаров.');
            alert('Ошибка при загрузке товаров.');
        }
    })
    .catch(error => {
        logMessage(`Ошибка при запросе товаров: ${error}`);
        alert(`Ошибка при загрузке товаров: ${error}`);
    });
