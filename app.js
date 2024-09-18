// Инициализация Telegram WebApp SDK
const tg = window.Telegram.WebApp;
const logArea = document.getElementById('logArea');

// Функция для вывода сообщений в Web App
function logMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    logArea.appendChild(p);
    logArea.scrollTop = logArea.scrollHeight;  // Автопрокрутка вниз
}

// Функция для загрузки данных о товаре с сервера
function logMessage(message) {
    const logArea = document.getElementById('logArea');
    const p = document.createElement('p');
    p.textContent = message;
    logArea.appendChild(p);
    logArea.scrollTop = logArea.scrollHeight;  // Автопрокрутка вниз
}

function loadProductDataXML() {
    fetch('https://54e2-46-211-248-233.ngrok-free.app/products/id/3/xml', {
        method: 'GET',
        headers: {
            'Accept': 'application/xml'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        logMessage(`XML Data Loaded: ${data}`);
        // Парсинг XML и обновление DOM здесь, если нужно
    })
    .catch(error => {
        logMessage(`Ошибка при загрузке данных: ${error}`);
    });
}

// Загружаем данные о товаре при загрузке страницы
loadProductData();

// Добавляем обработчик на кнопку
document.getElementById('likeButton').addEventListener('click', function() {
    const username = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.username : 'Неизвестный пользователь';
    logMessage(`Отправляем запрос на сервер с username: ${username}`);

    fetch('https://54e2-46-211-248-233.ngrok-free.app/api/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })  // Передаем username пользователя
    })
    .then(response => {
        logMessage(`Ответ от сервера: статус ${response.status}`);
        if (response.ok) {
            logMessage('Лайк успешно добавлен!');
            alert('Лайк успешно добавлен!');
        } else {
            logMessage('Ошибка при добавлении лайка.');
            alert('Ошибка при добавлении лайка.');
        }
    })
    .catch(error => {
        logMessage(`Ошибка при отправке запроса: ${error}`);
        alert('Ошибка при добавлении лайка.');
    });
});

// Загружаем данные о товаре при загрузке страницы
loadProductData();
