const contenedorProductosFirebase = require('../../class/contenedorProductos/contenedorProductosFirebase');

const { loggerError } = require('../../utils/logger');

class ProductoFirebaseDao extends contenedorProductosFirebase {
    constructor(db) {
        super(db);
    }

    async getAll() {
        try {
            const productos = this.db.collection('productos');
            const querySnapshot = await productos.get();
            const productosArray = querySnapshot.docs.map(doc => doc.data());

            return productosArray;
        } catch (error) {
            loggerError.error(error);
        }
    }
}

module.exports = ProductoFirebaseDao;