const uniqid = require('uniqid')

class OrderFirebaseDto {
  constructor(buyInfo, totalPrice) {
    this.numeroDeOrden = uniqid()
    this.timestamp = Date.now()
    this.productos = buyInfo.cart
    this.estado = 'Generada'
    this.email = buyInfo.email
    this.total = totalPrice
  }
}

class OrderMongoDto {
  constructor(buyInfo, totalPrice) {
    this.timestamp = Date.now()
    this.productos = buyInfo.cart
    this.estado = 'Generada'
    this.email = buyInfo.email
    this.total = totalPrice
  }
}

class OrderNormaliceIdDto {
  constructor(order) {
    this.numeroDeOrden = order._id.toString()
    this.timestamp = order.timestamp
    this.productos = order.productos
    this.estado = order.estado
    this.email = order.email
    this.total = order.total
  }
}

module.exports = { OrderFirebaseDto, OrderMongoDto, OrderNormaliceIdDto }