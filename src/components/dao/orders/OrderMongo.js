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
      const orders = await OrdenesModel.find()
      const ordersNormalice = orders.map((order) => {
        return new OrderNormaliceIdDto(order)
      })

      return ordersNormalice
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getOrderById(id) {
    try {
      const order = await OrdenesModel.findById(id)
      return new OrderNormaliceIdDto(order)
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
      const orderToModify = await OrdenesModel.findById(id)

      if (!orderToModify) return { error: 'Orden no encontrada' }

      orderToModify.estado = 'Completada'

      await orderToModify.save()

      return { message: 'Orden completada' }
    } catch (err) {
      loggerError.error(err)
    }
  }
}

module.exports = OrderMongo
