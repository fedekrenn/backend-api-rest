const uniqid = require('uniqid')

class CartMongoDto {
  constructor() {
    this.timestamp = Date.now();
    this.productos = [];
  }
}

class CartFirebaseDto {
  constructor() {
    this.id = uniqid();
    this.timestamp = Date.now();
    this.productos = [];
  }
}

class CartNormaliceIdDto {
  constructor(cart) {
    this.id = cart._id;
    this.timestamp = cart.timestamp;
    this.productos = cart.productos;
  }
}

module.exports = { CartMongoDto, CartFirebaseDto, CartNormaliceIdDto }
