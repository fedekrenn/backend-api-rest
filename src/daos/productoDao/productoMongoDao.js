const contenedorProductosMongo = require('../../class/contenedorProductos/contenedorProductosMongo');
const { ProductosModel } = require('../../model/productosModel');

class ProductoMongoDao extends contenedorProductosMongo {
    constructor() {
        super();
    }

    async getAll() {
        try {
            const productos = await ProductosModel.find();

            return productos;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = ProductoMongoDao;