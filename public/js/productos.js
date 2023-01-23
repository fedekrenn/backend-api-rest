const productsContainer = document.getElementById("products-container");
const createProductForm = document.getElementById("create-product-form");
const updateProductForm = document.getElementById("update-product-form");
const deleteProductForm = document.getElementById("delete-product-form");
const productID = document.getElementById("productId");

createProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
        nombre: e.target.nombre.value,
        descripcion: e.target.descripcion.value,
        codigo: e.target.codigo.value,
        foto: e.target.foto.value,
        precio: e.target.precio.value,
        stock: e.target.stock.value,
    };

    // Envio por post
    let res = await fetch("/api/productos", {
        method: "POST",
        headers: {
            role: "admin",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const data = await res.json();

    Swal.fire({
        icon: "success",
        title: "Carga exitosa",
        text: data.message,
        showConfirmButton: false,
        timer: 1500,
    });

    createProductForm.reset();
    productsContainer.innerHTML = "";
    init();
});

updateProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
        nombre: e.target.nombre.value,
        descripcion: e.target.descripcion.value,
        codigo: e.target.codigo.value,
        foto: e.target.foto.value,
        precio: e.target.precio.value,
        stock: e.target.stock.value,
    };

    // Envio por put
    let res = await fetch(
        `http://localhost:8080/api/productos/${e.target.id.value}`,
        {
            method: "PUT",
            headers: {
                role: "admin",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );

    const data = await res.json();

    if (data.hasOwnProperty("error"))
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.error,
            showConfirmButton: false,
            timer: 1500,
        });

    updateProductForm.reset();
    productsContainer.innerHTML = "";

    Swal.fire({
        icon: "success",
        title: "Actualización exitosa",
        text: data.message,
        showConfirmButton: false,
        timer: 1500,
    });

    init();
});

deleteProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Envio por delete
    let res = await fetch(
        `http://localhost:8080/api/productos/${e.target.productId.value}`,
        {
            method: "DELETE",
            headers: {
                role: "admin",
            },
        }
    );

    const data = await res.json();

    if (data.hasOwnProperty("error"))
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.error,
            showConfirmButton: false,
            timer: 1500,
        });

    deleteProductForm.reset();
    productsContainer.innerHTML = "";

    Swal.fire({
        icon: "success",
        title: "Eliminación exitosa",
        text: data.message,
        showConfirmButton: false,
        timer: 1500,
    });

    init();
});

productID.addEventListener("click", () => {
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
        title: "Cuidado, esto borrará el producto",
    });
});

async function init() {
    try {
        const products = await getProducts();
        renderProducts(products);
    } catch (error) {
        console.log(error);
    }
}

init();

async function getProducts() {
    try {
        const response = await fetch("/api/productos/");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function renderProducts(products) {
    products.forEach((product) => {
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
        productsContainer.appendChild(productCard);
    });
}
