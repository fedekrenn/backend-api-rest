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

module.exports = { CartMongoDto, CartFirebaseDto }
