const uniqid = require('uniqid')

class ProductFirebaseDto {
    constructor(product) {
        this.id = uniqid();
        this.timestamp = Date.now();
        this.nombre = product.nombre;
        this.descripcion = product.descripcion;
        this.codigo = product.codigo;
        this.foto = product.foto;
        this.precio = product.precio;
        this.stock = product.stock;
    }
}

class ProductMongoDto {
    constructor(product) {
        this.timestamp = Date.now();
        this.nombre = product.nombre;
        this.descripcion = product.descripcion;
        this.codigo = product.codigo;
        this.foto = product.foto;
        this.precio = product.precio;
        this.stock = product.stock;
    }
}

class ProductNormaliceIdDto {
    constructor(product) {
        this.id = product._id;
        this.timestamp = product.timestamp;
        this.nombre = product.nombre;
        this.descripcion = product.descripcion;
        this.codigo = product.codigo;
        this.foto = product.foto;
        this.precio = product.precio;
        this.stock = product.stock;
    }
}

module.exports = { ProductFirebaseDto, ProductMongoDto, ProductNormaliceIdDto };