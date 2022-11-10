const productsContainer = document.getElementById('products-container');
const createProductForm = document.getElementById('create-product-form');
const updateProductForm = document.getElementById('update-product-form');
const deleteProductForm = document.getElementById('delete-product-form');

createProductForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const body = {
        nombre: e.target.nombre.value,
        descripcion: e.target.descripcion.value,
        codigo: e.target.codigo.value,
        foto: e.target.foto.value,
        precio: e.target.precio.value,
        stock: e.target.stock.value
    }

    // Envio por post

    let res = await fetch('/api/productos', {
        method: 'POST',
        headers: {
            'role': 'admin',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });

    await res.json();

    alert('Producto creado con exito');

    // Limpiar formulario
    createProductForm.reset();

    // Renderizar productos
    productsContainer.innerHTML = '';
    init();
});

updateProductForm.addEventListener('submit', async (e) => {
    
    e.preventDefault();

    const body = {
        nombre: e.target.nombre.value,
        descripcion: e.target.descripcion.value,
        codigo: e.target.codigo.value,
        foto: e.target.foto.value,
        precio: e.target.precio.value,
        stock: e.target.stock.value
    }

    // Envio por put

    let res = await fetch(`http://localhost:8080/api/productos/${e.target.id.value}`, {
        method: 'PUT',
        headers: {
            'role': 'admin',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });

    await res.json();

    alert('Producto actualizado con exito');

    // Limpiar formulario
    updateProductForm.reset();

    // Renderizar productos
    productsContainer.innerHTML = '';
    init();
});

deleteProductForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    // Envio por delete

    let res = await fetch(`http://localhost:8080/api/productos/${e.target.id.value}`, {
        method: 'DELETE',
        headers: {
            'role': 'admin',
        },
    });

    await res.json();

    alert('Producto eliminado con exito');

    // Limpiar formulario
    deleteProductForm.reset();

    // Renderizar productos
    productsContainer.innerHTML = '';
    init();
});

async function init() {
    const products = await getProducts();
    renderProducts(products);
}

init();

async function getProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/productos/');
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

function renderProducts(products) {
    products.forEach(product => {
        const productCard = document.createElement('tr');
        productCard.innerHTML = `
            <td>${product._id}</td>
            <td>${product.nombre}</td>
            <td>${product.codigo}</td>
            <td>${product.precio}</td>
            <td>${product.stock}</td>
            <td><img src="${product.foto}" alt="${product.nombre}" width="100px"></td>
            <td>${product.timestamp}</td>
            <td>${product.descripcion}</td>
        `;
        productsContainer.appendChild(productCard);
    });
}

async function newProduct() {


}


