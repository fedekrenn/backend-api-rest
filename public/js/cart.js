const dialog = document.getElementById('dialog')
const openDialogBtn = document.getElementById('openDialogBtn')
const closeDialogBtn = document.getElementById('closeDialogBtn')
const cartConfirmBtn = document.getElementById('cartConfirmBtn')
const cartContainer = document.getElementById('cartContainer')

openDialogBtn.addEventListener('click', async () => {
  dialog.showModal()

  const products = await getProducts(cartId)

  if (products.length === 0)
    return (cartContainer.innerHTML = 'No hay productos')

  products.forEach((product) => {
    cartContainer.innerHTML += `
        <div data-id='${product._id}' class='cart-row'>
            <img src="${product.foto}" alt="${product.nombre}" width="50px">
            <h5>${product.nombre}</h5>
            <i class="fa-solid fa-trash">
        </div>`
  })

  const btnForDelete = document.querySelectorAll('.fa-trash')

  btnForDelete.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const productId = btn.parentElement.getAttribute('data-id')

      await deleteProductFromCart(productId)

      btn.parentElement.remove()
    })
  })
})

closeDialogBtn.addEventListener('click', () => {
  dialog.close()
  cartContainer.innerHTML = ''
})

async function getProducts(cartId) {
  let res = await fetch(`/api/carrito/${cartId}/productos`)

  let data = await res.json()

  if (data.hasOwnProperty('message')) return []

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  return data
}

async function deleteProductFromCart(productId) {
  let res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
    method: 'DELETE',
  })

  const data = await res.json()

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  Swal.fire({
    icon: 'success',
    title: 'Producto eliminado',
    text: data.message,
    showConfirmButton: false,
    timer: 1500,
  })
}
