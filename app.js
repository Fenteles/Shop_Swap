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
fetch('https://7222-46-211-225-18.ngrok-free.app/api/products')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const productsContainer = document.getElementById('productsContainer');
            data.products.forEach(product => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
            });
        } else {
            alert('Ошибка при загрузке товаров.');
        }
    })
    .catch(error => {
        console.error('Ошибка при запросе товаров:', error);
        alert('Ошибка при загрузке товаров.');
    });
