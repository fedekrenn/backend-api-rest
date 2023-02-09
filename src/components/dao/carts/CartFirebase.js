const { loggerError, loggerBuy } = require('../../../utils/logger')
const handleSubmitMail = require('../../../utils/mailOptions')
const { CartFirebaseDto } = require('../../dto/CartDTO')

class ContenedorCarritosFirebase {
  constructor(db) {
    this.db = db
  }

  async getProducts(id) {
    try {
      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      return carritosArray.find((cart) => cart.id === id)
    } catch (error) {
      loggerError.error(error)
    }
  }

  async createCart() {
    try {
      const carritos = this.db.collection('carritos')

      const newCart = new CartFirebaseDto()
      await carritos.add({ ...newCart })

      return newCart.id
    } catch (error) {
      loggerError.error(error)
    }
  }

  async addProductToCart(id, product) {
    try {
      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      const carrito = carritosArray.find((elemento) => elemento.id == id)

      if (!carrito) return { error: 'Carrito no encontrado' }

      const carritoId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      const productos = carrito.productos

      productos.push(product)

      await carritos.doc(carritoId).update({ productos: productos })

      return {
        message: `Se agregó el producto: '${product.nombre}' al carrito`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteProductFromCart(id, productId) {
    try {
      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      const carrito = carritosArray.find((elemento) => elemento.id == id)

      if (!carrito) return { error: 'Carrito no encontrado!' }

      const carritoId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      const productos = carrito.productos

      const producto = productos.find((elemento) => elemento.id == productId)

      if (!producto) return { error: `Ese producto no se encuentra en el carrito ID: ${id}` }

      const productosFiltrados = productos.filter(
        (elemento) => elemento.id != productId
      )

      await carritos.doc(carritoId).update({ productos: productosFiltrados })

      return {
        message: `Se eliminó el producto: '${producto.nombre}' del carrito`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteCart(id) {
    try {
      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      const carrito = carritosArray.find((elemento) => elemento.id == id)

      if (!carrito) return { error: 'Carrito no encontrado' }

      const carritoId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      await carritos.doc(carritoId).delete()

      return { message: `Se eliminó el carrito ID: ${id}` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      const carritos = this.db.collection('carritos')
      const querySnapshot = await carritos.get()
      const carritosArray = querySnapshot.docs.map((doc) => doc.data())

      return carritosArray
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = ContenedorCarritosFirebase
