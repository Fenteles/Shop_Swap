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
