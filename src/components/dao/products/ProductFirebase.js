const { ProductFirebaseDto } = require('../../dto/ProductDTO')
const { loggerError } = require('../../../utils/logger')

class ContenedorProductosFirebase {
  constructor(db) {
    this.db = db
  }

  async getById(id) {
    try {
      const productos = this.db.collection('productos')
      const querySnapshot = await productos.get()
      const productosArray = querySnapshot.docs.map((doc) => doc.data())

      const producto = productosArray.find((elemento) => elemento.id == id)

      if (!producto) return { error: 'producto no encontrado' }

      return producto
    } catch (error) {
      loggerError.error(error)
    }
  }

  async save(product) {
    try {
      const productsCollection = this.db.collection('productos')

      const newProduct = new ProductFirebaseDto(product)

      await productsCollection.add({...newProduct})

      return {
        message: `Producto ${newProduct.nombre} guardado con el id ${newProduct.id}`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async updateById(id, newData) {
    try {
      const productos = this.db.collection('productos')
      const querySnapshot = await productos.get()
      const productosArray = querySnapshot.docs.map((doc) => doc.data())
      const producto = productosArray.find((elemento) => elemento.id == id)

      if (!producto) return { error: 'Producto no encontrado' }

      const productoId = querySnapshot.docs.find(
        (doc) => doc.data().id == id
      ).id

      await productos.doc(productoId).update(newData)

      return { message: `Producto id: ${id} actualizado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteById(id) {
    try {
      const productos = this.db.collection('productos')
      const querySnapshot = await productos.get()
      const productosArray = querySnapshot.docs.map((doc) => doc.data())

      const producto = productosArray.find((elemento) => elemento.id == id)

      if (!producto) return { error: 'Producto no encontrado' }

      const productoId = querySnapshot.docs.find(
        (doc) => doc.data().id == id
      ).id

      await productos.doc(productoId).delete()

      return { message: `Producto id: ${id} eliminado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      const productos = this.db.collection('productos')
      const querySnapshot = await productos.get()
      const productosArray = querySnapshot.docs.map((doc) => doc.data())

      return productosArray
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = ContenedorProductosFirebase
