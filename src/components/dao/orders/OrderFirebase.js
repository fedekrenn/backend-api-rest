const { loggerError } = require('../../../utils/logger')
const { OrderFirebaseDto } = require('../../dto/OrderDTO')

class OrderFirebase {
  constructor(db) {
    this.db = db
  }

  async getOrders() {
    try {
      // TODO
      console.log('eeee')
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getOrderById(id) {
    try {
      // TODO
      console.log('eeee')
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
      // TODO
      console.log(order)
    } catch (err) {
      loggerError.error(err)
    }
  }
}

module.exports = OrderFirebase
