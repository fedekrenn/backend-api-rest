const cartContainer = document.getElementById("cart-container");
const createCartBtn = document.getElementById("create-cart-btn");
const deleteCartForm = document.getElementById("delete-cart-form");
const getProductsForm = document.getElementById("get-products-form");
const addProductForm = document.getElementById("add-product-form");
const deleteProductForm = document.getElementById("delete-product-form");
const buyBtn = document.querySelector(".buy-cart");
const deleteAllCartId = document.getElementById("deleteAllCartId");

let currentCart;

createCartBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let res = await fetch("/api/carrito", {
        method: "POST",
    });

    let data = await res.json();

    Swal.fire({
        icon: "success",
        title: "Carrito creado",
        text: `${data.message}. Su id es: ${data.id}`,
        showConfirmButton: false,
        timer: 1500,
    });

    cartContainer.innerHTML = "";
    init();
});

deleteCartForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cartId = e.target.deleteAllCartId.value;

    const res = await fetch(`/api/carrito/${cartId}`, {
        method: "DELETE",
    });

    const data = await res.json();

    if (data.hasOwnProperty("error"))
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.error,
            showConfirmButton: false,
            timer: 1500,
        });

    Swal.fire({
        icon: "success",
        title: "Carrito eliminado",
        text: data.message,
        showConfirmButton: false,
        timer: 1500,
    });

    cartContainer.innerHTML = "";

    init();
});

deleteAllCartId.addEventListener("click", () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    Toast.fire({
        icon: "warning",
        title: "Cuidado! Esto borrará el carrito entero junto con sus productos",
    });
});

getProductsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    getProducts(e.target.cartId.value);
});

async function getProducts(cartId) {
    let res = await fetch(`/api/carrito/${cartId}/productos`);

    let data = await res.json();

    if (data.hasOwnProperty("message"))
        return Swal.fire({
            icon: "warning",
            title: "Atención!",
            text: data.message,
            showConfirmButton: false,
            timer: 1500,
        });

    if (data.hasOwnProperty("error"))
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.error,
            showConfirmButton: false,
            timer: 1500,
        });

    currentCart = data;

    const getProductsContainer = document.getElementById(
        "get-products-container"
    );

    getProductsContainer.innerHTML = "";

    data.forEach((product) => {
        const productCard = document.createElement("tr");
        productCard.innerHTML = `
            <td>${product._id || product.id}</td>
            <td>${product.nombre}</td>
            <td>${product.codigo}</td>
            <td>${product.precio}</td>
            <td>${product.stock}</td>
            <td><img src="${product.foto}" alt="${
            product.nombre
        }" width="100px"></td>
            <td>${product.timestamp}</td>
            <td>${product.descripcion}</td>
        `;
        getProductsContainer.appendChild(productCard);
    });

    getProductsForm.reset();
}

addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cartId = e.target.addCartId.value;
    const productId = e.target.productId.value;

    let res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
        method: "POST",
    });

    const data = await res.json();

    if (data.hasOwnProperty("error"))
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.error,
            showConfirmButton: false,
            timer: 1500,
        });

    getProducts(cartId);

    addProductForm.reset();

    cartContainer.innerHTML = "";
    init();

    Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: data.message,
        showConfirmButton: false,
        timer: 1500,
    });
});

deleteProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cartId = e.target.deleteCartId.value;
    const productId = e.target.deleteProductId.value;

    let res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
        method: "DELETE",
    });

    const data = await res.json();

    if (data.hasOwnProperty("error"))
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.error,
            showConfirmButton: false,
            timer: 1500,
        });

    getProducts(cartId);

    deleteProductForm.reset();

    cartContainer.innerHTML = "";

    Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: data.message,
        showConfirmButton: false,
        timer: 1500,
    });

    init();
});

buyBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!currentCart)
        return Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "No hay carrito seleccionado, debajo encontrarás los ID con los que puedes comprar",
            showConfirmButton: false,
            timer: 1500,
        });

    const userData = JSON.parse(sessionStorage.getItem("personalData"));

    const { personName, email, phone } = userData;

    const res = await fetch("/api/carrito/confirmar-compra", {
        method: "POST",
        body: JSON.stringify({
            cart: currentCart,
            email,
            personName,
            phone,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    if (data.hasOwnProperty("error"))
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.error,
            showConfirmButton: false,
            timer: 1500,
        });

    Swal.fire({
        icon: "success",
        title: "Compra realizada",
        html: `${data.message} <br><br><br> Te llegará un SMS con el detalle de tu compra`,
        showConfirmButton: true,
        timer: 3500,
    });
});

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
        const response = await fetch("/api/carrito/");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function renderCarts(carts) {
    carts.forEach((cart) => {
        const cartCard = document.createElement("tr");
        cartCard.innerHTML = `
            <td>${cart.id || cart._id}</td>
            <td>${cart.timestamp}</td>
            <td>${cart.productos.length}</td>
        `;

        cartContainer.appendChild(cartCard);
    });
}
