const { loggerError } = require('../../../utils/logger')
const { OrderFirebaseDto } = require('../../dto/OrderDTO')

class OrderFirebase {
  constructor(db) {
    this.db = db
  }

  async getOrders() {
    try {
      const orderCollection = this.db.collection('ordenes')
      const querySnapshot = await orderCollection.get()
      const allOrders = querySnapshot.docs.map((doc) => doc.data())

      if (allOrders.length === 0) return { error: 'Todavía no se generaron órdenes de compra' }

      return allOrders
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getOrderById(id) {
    try {
      const orderCollection = this.db.collection('ordenes')
      const querySnapshot = await orderCollection.get()
      const allOrders = querySnapshot.docs.map((doc) => doc.data())

      const targetOrder = allOrders.find((order) => order.numeroDeOrden === id)

      if (!targetOrder) return { error: 'Orden no encontrada' }

      return targetOrder
    } catch (err) {
      loggerError.error(err)
    }
  }

  async createOrder(buyInfo) {
    try {
      const totalPrice = buyInfo.cart.reduce(
        (acc, curr) => acc + curr.precio.toString() * curr.cantidad,
        0
      )

      const order = new OrderFirebaseDto(buyInfo, totalPrice)
      const res = await this.db.collection('ordenes').add({ ...order })

      // TODO - retornar los datos correctos
      // console.log(res)
    } catch (err) {
      loggerError.error(err)
    }
  }

  async markOrderAsCompleted(id) {
    try {
      const orderCollection = this.db.collection('ordenes')
      const querySnapshot = await orderCollection.get()
      const allOrders = querySnapshot.docs.map(doc => doc.data())

      const targetOrder = allOrders.find(order => order.numeroDeOrden == id)

      if (!targetOrder) return { error: 'Orden no encontrada' }

      const orderId = querySnapshot.docs.find(doc => doc.data().numeroDeOrden == id).id

      await this.db.collection('ordenes').doc(orderId).update({ estado: 'Completada' })

      return { message: 'Orden completada' }
    } catch (err) {
      loggerError.error(err)
    }
  }
}

module.exports = OrderFirebase
