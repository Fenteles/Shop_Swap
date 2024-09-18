// Инициализация Telegram WebApp SDK
const tg = window.Telegram.WebApp;
const logArea = document.getElementById('logArea');

// Функция для вывода сообщений в Web App
function logMessage(message) {
    const logArea = document.getElementById('logArea');
    const p = document.createElement('p');
    p.textContent = message;
    logArea.appendChild(p);
    logArea.scrollTop = logArea.scrollHeight;  // Автопрокрутка вниз
}

// Функция для загрузки данных о товаре в формате XML
function loadProductDataXML() {
    fetch('https://54e2-46-211-248-233.ngrok-free.app/products/id/3/xml', {
        method: 'GET',
        headers: {
            'Accept': 'application/xml'
        }
    })
    .then(response => {
        // Логируем статус и заголовки ответа
        logMessage(`Ответ от сервера: Статус ${response.status}, Заголовки: ${Array.from(response.headers.entries()).map(h => `${h[0]}: ${h[1]}`).join(', ')}`);
        
        // Проверяем успешен ли запрос
        if (response.ok) {
            return response.text();  // Возвращаем текст ответа (в XML формате)
        } else {
            throw new Error(`Ошибка запроса: ${response.status}`);
        }
    })
    .then(data => {
        logMessage(`Ответ сервера (XML): ${data}`);
        
        // Парсим XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");

        // Извлекаем нужные данные
        const productName = xmlDoc.getElementsByTagName("name")[0].textContent;
        const productDescription = xmlDoc.getElementsByTagName("description")[0].textContent;
        const productPrice = xmlDoc.getElementsByTagName("price")[0].textContent;

        // Обновляем заголовок с данными о товаре
        const productTitle = document.getElementById('productTitle');
        productTitle.textContent = `${productName}, ${productDescription}, Цена: ${productPrice}`;

        logMessage(`Данные о товаре: Название - ${productName}, Описание - ${productDescription}, Цена - ${productPrice}`);
    })
    .catch(error => {
        logMessage(`Ошибка при загрузке данных о товаре: ${error}`);
    });
}

// Загружаем данные о товаре при загрузке страницы
loadProductDataXML();

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
