const createCartBtn = document.getElementById('create-cart-btn');
const deleteCartForm = document.getElementById('delete-cart-form');

createCartBtn.addEventListener('click', async (e) => {

    e.preventDefault();

    await fetch('/api/carrito', {
        method: 'POST'
    });

    alert('Carrito creado con éxito');

})

deleteCartForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    await fetch(`/api/carrito/${e.target.cartId.value}`, {
        method: 'DELETE'
    });

    alert('Carrito eliminado con éxito');

})
