const tableBody = document.querySelector('#orders-table-body')
const isAdminTh = document.querySelectorAll('.show-or-hide')
const ordersForm = document.querySelector('#ordersForm')

ordersForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = e.target.searchInput.value

  const targetOrder = await getOrders(id)
  targetOrder && renderProducts([targetOrder])
})

function isAdmin() {
  const user = JSON.parse(sessionStorage.getItem('personalData'))
  return user.role === 'admin'
}

function renderProducts(data) {
  let html = ''

  if (isAdmin()) {
    isAdminTh.forEach((th) => {
      th.classList.remove('show-or-hide')
    })
  }

  data.forEach((order) => {
    const products = order.productos
      .map((product) => {
        return `${product.nombre} (${product.cantidad} u.)`
      })
      .join(', ')

    const date = new Date(parseInt(order.timestamp)).toLocaleString()

    html += `
        <tr>
            <td>${order.numeroDeOrden}</td>
            <td>${date}</td>
            <td>${products}</td>
            <td>${order.estado}</td>
            <td>$${order.total}</td>
            ${
              isAdmin()
                ? `<td>${order.email}</td>
            <td onclick=(alert('HOla!!!'))>✅</td>`
                : ''
            }
        </tr>
        `
  })

  tableBody.innerHTML = html
}

async function getOrders(id) {
  try {
    if (id) {
      const res = await fetch(`/api/ordenes/${id}`)
      const data = await res.json()

      if (data.hasOwnProperty('error')) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error,
          showConfirmButton: false,
          timer: 1500,
        })
        return null
      }

      return data
    }

    const res = await fetch('/api/ordenes')
    const data = await res.json()

    if (data.hasOwnProperty('error')) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data.error,
        showConfirmButton: false,
        timer: 1500,
      })
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

async function dataToDisplay() {
  try {
    const orders = await getOrders()
    const user = JSON.parse(sessionStorage.getItem('personalData'))

    if (isAdmin()) {
      return orders
    } else {
      return orders.filter((order) => order.email === user.email)
    }
  } catch (error) {
    console.log(error)
  }
}

async function init() {
  try {
    const orders = await dataToDisplay()

    renderProducts(orders)
  } catch (error) {
    console.log(error)
  }
}

init()
