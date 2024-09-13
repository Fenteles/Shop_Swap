document.addEventListener("DOMContentLoaded", function () {
    const productName = document.getElementById("product-name");
    const productDescription = document.getElementById("product-description");
    const productPrice = document.getElementById("product-price");
    const productImage = document.getElementById("product-image");

    let currentProductIndex = 0;

    const products = [
        {
            name: "Товар 1",
            description: "Описание товара 1",
            price: 100,
            imageUrl: "https://via.placeholder.com/400x300",
        },
        {
            name: "Товар 2",
            description: "Описание товара 2",
            price: 200,
            imageUrl: "https://via.placeholder.com/400x300",
        },
        // Можно добавить больше товаров
    ];

    function displayProduct(product) {
        productName.textContent = product.name;
        productDescription.textContent = product.description;
        productPrice.textContent = product.price.toFixed(2);
        productImage.src = product.imageUrl;
    }

    function handleLike() {
        alert("Вы лайкнули " + products[currentProductIndex].name);
        showNextProduct();
    }

    function handleDislike() {
        alert("Вы дизлайкнули " + products[currentProductIndex].name);
        showNextProduct();
    }

    function showNextProduct() {
        currentProductIndex = (currentProductIndex + 1) % products.length;
        displayProduct(products[currentProductIndex]);
    }

    document.getElementById("like-button").addEventListener("click", handleLike);
    document.getElementById("dislike-button").addEventListener("click", handleDislike);

    displayProduct(products[currentProductIndex]);
});
