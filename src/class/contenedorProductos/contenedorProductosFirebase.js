const uniqid = require('uniqid');

class ContenedorProductosFirebase {
    constructor(db) {
        this.db = db;
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

    async getById(id) {
        try {
            const productos = this.db.collection('productos');
            const querySnapshot = await productos.get();
            const productosArray = querySnapshot.docs.map(doc => doc.data());

            const producto = productosArray.find(elemento => elemento.id == id);

            if (!producto) return { error: 'producto no encontrado' };

            return producto;
        } catch (error) {
            console.log(error);
        }
    }

    async save(product) {
        try {
            const productos = this.db.collection('productos');

            product.id = uniqid();
            product.timestamp = Date.now();
            
            await productos.add(product);

            return { success: `producto ${product.nombre} guardado con el id ${product.id}` };
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, newData) {
        try {
            const productos = this.db.collection('productos');
            const querySnapshot = await productos.get();
            const productosArray = querySnapshot.docs.map(doc => doc.data());
            const producto = productosArray.find(elemento => elemento.id == id);

            if (!producto) return { error: 'producto no encontrado' };

            const productoId = querySnapshot.docs.find(doc => doc.data().id == id).id;

            await productos.doc(productoId).update(newData);

            return { success: `producto id: ${id} actualizado` };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const productos = this.db.collection('productos');
            const querySnapshot = await productos.get();
            const productosArray = querySnapshot.docs.map(doc => doc.data());

            const producto = productosArray.find(elemento => elemento.id == id);

            if (!producto) return { error: 'producto no encontrado' };

            const productoId = querySnapshot.docs.find(doc => doc.data().id == id).id;

            await productos.doc(productoId).delete();

            return { success: `producto id: ${id} eliminado` };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorProductosFirebase;