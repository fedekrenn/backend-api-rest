const cartContainer = document.getElementById('cart-container');
const createCartBtn = document.getElementById('create-cart-btn');
const deleteCartForm = document.getElementById('delete-cart-form');
const getProductsForm = document.getElementById('get-products-form');
const addProductForm = document.getElementById('add-product-form');
const deleteProductForm = document.getElementById('delete-product-form');


createCartBtn.addEventListener('click', async (e) => {

    e.preventDefault();

    await fetch('/api/carrito', {
        method: 'POST'
    });

    alert('Carrito creado con éxito');

    // Renderizar carritos
    cartContainer.innerHTML = '';
    init();
})

deleteCartForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    await fetch(`/api/carrito/${e.target.cartId.value}`, {
        method: 'DELETE'
    });

    alert('Carrito eliminado con éxito');

    // Renderizar carritos
    cartContainer.innerHTML = '';
    init();
})

getProductsForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    let res = await fetch(`/api/carrito/${e.target.cartId.value}/productos`)

    let data = await res.json();

    const getProductsContainer = document.getElementById('get-products-container');

    getProductsContainer.innerHTML = '';

    data.forEach(product => {
        const productCard = document.createElement('tr');
        productCard.innerHTML = `
            <td>${product._id || product.id}</td>
            <td>${product.nombre}</td>
            <td>${product.codigo}</td>
            <td>${product.precio}</td>
            <td>${product.stock}</td>
            <td><img src="${product.foto}" alt="${product.nombre}" width="100px"></td>
            <td>${product.timestamp}</td>
            <td>${product.descripcion}</td>
        `;
        getProductsContainer.appendChild(productCard);
    })

    // Limpiar formulario
    getProductsForm.reset();
})

addProductForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    // Envio por post

    let res = await fetch(`/api/carrito/${e.target.cartId.value}/productos/${e.target.productId.value}`, {
        method: 'POST'
    });

    await res.json();

    alert('Producto agregado con éxito');

    // Limpiar formulario
    addProductForm.reset();

    // Renderizar carritos
    cartContainer.innerHTML = '';
    init();
})

deleteProductForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    // Envio por delete

    let res = await fetch(`/api/carrito/${e.target.cartId.value}/productos/${e.target.productId.value}`, {
        method: 'DELETE'
    });

    await res.json();

    alert('Producto eliminado con éxito');

    // Limpiar formulario
    deleteProductForm.reset();

    // Renderizar carritos
    cartContainer.innerHTML = '';
    init();
})




async function init() {
    const carts = await getCarts();
    renderCarts(carts);
}

init();

async function getCarts() {
    try {
        const response = await fetch('/api/carrito/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function renderCarts(carts) {
    carts.forEach(cart => {
        const cartCard = document.createElement('tr');
        cartCard.innerHTML = `
            <td>${cart.id}</td>
            <td>${cart.timestamp}</td>
            <td>${cart.productos.length}</td>
        `;

        cartContainer.appendChild(cartCard);
    });
}
