const cartContainer = document.getElementById('cart-container');
const createCartBtn = document.getElementById('create-cart-btn');
const deleteCartForm = document.getElementById('delete-cart-form');
const getProductsForm = document.getElementById('get-products-form');
const addProductForm = document.getElementById('add-product-form');
const deleteProductForm = document.getElementById('delete-product-form');
const buyBtn = document.querySelector('.buy-cart');

let currentCart

createCartBtn.addEventListener('click', async (e) => {

    e.preventDefault();

    let res = await fetch('/api/carrito', {
        method: 'POST'
    });

    let data = await res.json();

    alert(data.message);

    // Renderizar carritos
    cartContainer.innerHTML = '';
    init();
})

deleteCartForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const res = await fetch(`/api/carrito/${e.target.cartId.value}`, {
        method: 'DELETE'
    });

    const data = await res.json();

    alert(data.message || data.error);

    // Renderizar carritos
    cartContainer.innerHTML = '';

    init();
})

getProductsForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    getProducts(e.target.cartId.value);
})

async function getProducts(cartId) {

    let res = await fetch(`/api/carrito/${cartId}/productos`)

    let data = await res.json();

    if (data.hasOwnProperty('message')) return

    if (data.hasOwnProperty('error')) return alert(data.error)

    currentCart = data;

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
}

addProductForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const cartId = e.target.cartId.value;
    const productId = e.target.productId.value;

    // Envio por post

    let res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
        method: 'POST'
    });

    const data = await res.json();

    getProducts(cartId);

    // Limpiar formulario
    addProductForm.reset();


    // Renderizar carritos
    cartContainer.innerHTML = '';
    init();
    alert(data.message || data.error);

})

deleteProductForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const cartId = e.target.cartId.value;
    const productId = e.target.productId.value;

    // Envio por delete

    let res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
        method: 'DELETE'
    });

    const data = await res.json();

    getProducts(cartId);

    // Limpiar formulario
    deleteProductForm.reset();


    // Renderizar carritos
    cartContainer.innerHTML = '';
    init();

    alert(data.message || data.error);
})

buyBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!currentCart) return alert('No hay carrito seleccionado, debajo encontrarás los ID con los que puedes comprar');

    const data = JSON.parse(sessionStorage.getItem('personalData'));

    const { personName, email, phone } = data;

    const res = await fetch('/api/carrito/confirmar-compra', {
        method: 'POST',
        body: JSON.stringify({
            cart: currentCart,
            email,
            personName,
            phone
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const response = await res.json();

    alert(`${response.message || response.error}.\n\n Te llegará un SMS con el detalle de tu compra`);
})

async function init() {
    try {
        const carts = await getCarts();
        renderCarts(carts);
    } catch (error) {
        console.log(error);
    }
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
            <td>${cart.id || cart._id}</td>
            <td>${cart.timestamp}</td>
            <td>${cart.productos.length}</td>
        `;

        cartContainer.appendChild(cartCard);
    });
}
