const cartContainer = document.getElementById('cart-container')
const getProductsForm = document.getElementById('get-products-form')
const deleteCartForm = document.getElementById('delete-cart-form')

let currentCart

getProductsForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  getProducts(e.target.cartId.value)
})

deleteCartForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const res = await fetch(`/api/carrito/${e.target.deleteId.value}`, {
    method: 'DELETE',
  })

  const data = await res.json()

  renderCarts(await getCarts())

  if (data.hasOwnProperty('message'))
    return Swal.fire({
      icon: 'success',
      title: 'Éxito!',
      text: data.message,
      showConfirmButton: false,
      timer: 1500,
    })

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })
})

async function getProducts(cartId) {
  let res = await fetch(`/api/carrito/${cartId}/productos`)

  let data = await res.json()

  if (data.hasOwnProperty('message'))
    return Swal.fire({
      icon: 'warning',
      title: 'Atención!',
      text: data.message,
      showConfirmButton: false,
      timer: 1500,
    })

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  currentCart = data

  const getProductsContainer = document.getElementById('get-products-container')

  getProductsContainer.innerHTML = ''

  data.forEach((product) => {
    const productCard = document.createElement('tr')
    productCard.innerHTML = `
            <td>${product.id}</td>
            <td>${product.nombre}</td>
            <td>${product.codigo}</td>
            <td>${product.precio}</td>
            <td>${product.stock}</td>
            <td><img src="${product.foto}" alt="${product.nombre}" width="100px"></td>
            <td>${product.timestamp}</td>
            <td>${product.categoria}</td>
            <td>${product.descripcion}</td>
        `
    getProductsContainer.appendChild(productCard)
  })

  getProductsForm.reset()
}

async function getCarts() {
  try {
    const res = await fetch('/api/carrito/')
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

function renderCarts(carts) {
  cartContainer.innerHTML = ''

  carts.forEach((cart) => {
    cartContainer.innerHTML += `
          <tr>
            <td>${cart.id}</td>
            <td>${cart.timestamp}</td>
            <td>${cart.productos.length}</td>
            <td><button class='btn-to-cart' id=${cart.id}>✅</button></td>
          </tr>
        `
  })

  const addToLocalStorageBtns = document.querySelectorAll('.btn-to-cart')

  addToLocalStorageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      localStorage.setItem('cartId', btn.id)
      Swal.fire({
        icon: 'success',
        title: 'Éxito!',
        text: 'El carrito se ha marcado como activo',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  })
}

async function init() {
  try {
    const carts = await getCarts()
    renderCarts(carts)
  } catch (error) {
    console.log(error)
  }
}

init()
