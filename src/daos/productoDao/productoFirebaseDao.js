const contenedorProductosFirebase = require('../../class/contenedorProductos/contenedorProductosFirebase');

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
            console.log(error);
        }
    }
}

module.exports = ProductoFirebaseDao;