<script>
    const tg = window.Telegram.WebApp;

    document.getElementById('likeButton').addEventListener('click', function() {
        const username = tg.initDataUnsafe.user.username;
        console.log("Отправляем запрос на сервер с username:", username);

        fetch('http://192.168.43.176:5000/api/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })  // Передаем username пользователя
        })
        .then(response => {
            console.log("Ответ от сервера:", response);
            if (response.ok) {
                alert('Лайк успешно добавлен!');
            } else {
                alert('Ошибка при добавлении лайка.');
            }
        })
        .catch(error => {
            console.error('Ошибка при отправке запроса:', error);
            alert('Ошибка при добавлении лайка.');
        });
    });
</script>
