const contenedorProductosMongo = require('../../class/contenedorProductos/contenedorProductosMongo');
const { ProductosModel } = require('../../model/productosModel');

const { loggerError } = require('../../utils/logger');

class ProductoMongoDao extends contenedorProductosMongo {
    constructor() {
        super();
    }

    async getAll() {
        try {
            const productos = await ProductosModel.find();

            return productos;
        } catch (error) {
            loggerError.error(error);
        }
    }

}

module.exports = ProductoMongoDao;