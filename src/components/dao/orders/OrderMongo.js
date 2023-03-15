const mongoose = require('mongoose')
const { OrdenesModel } = require('../../model/ordenesModel')
const { loggerError } = require('../../../utils/logger')
const { OrderMongoDto, OrderNormaliceIdDto } = require('../../dto/OrderDTO')

mongoose.connect(
  process.env.DB_URL_MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) loggerError.error(err)
  }
)

class OrderMongo {
  async getOrders() {
    try {
      // TODO
      console.log('getOrders')
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getOrderById(id) {
    try {
      // TODO
      console.log(id)
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

      const order = new OrderMongoDto(buyInfo, totalPrice)

      const newOrder = new OrdenesModel(order)
      const res = await newOrder.save()

      // TODO - retornar los datos correctos
      console.log(res._id)
    } catch (err) {
      loggerError.error(err)
    }
  }

  async markOrderAsCompleted(id) {
    try {
      // TODO
      console.log(id)
    } catch (err) {
      loggerError.error(err)
    }
  }
}

module.exports = OrderMongo
