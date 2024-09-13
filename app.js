document.getElementById('likeButton').addEventListener('click', function() {
    fetch('/api/like', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            alert('Лайк успешно добавлен!');
        } else {
            alert('Ошибка при добавлении лайка.');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});
