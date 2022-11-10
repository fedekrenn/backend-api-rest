const uniqid = require('uniqid');

class ContenedorCarritosFirebase {
    constructor(db) {
        this.db = db;
    }

    async getProducts(id) {
        try {
            const carritos = this.db.collection('carritos');
            const querySnapshot = await carritos.get();
            const carritosArray = querySnapshot.docs.map(doc => doc.data());

            const carrito = carritosArray.find(elemento => elemento.id == id);

            if (!carrito) return { error: 'carrito no encontrado' };

            const productos = carrito.productos;

            if (productos.length === 0) return { message: `El carrito ID: ${id} no tiene productos todavía` }

            return productos;
        } catch (error) {
            console.log(error);
        }
    }

    async createCart() {
        try {
            const carritos = this.db.collection('carritos');

            const id = uniqid();

            await carritos.add({
                id: id,
                timestamp: Date.now(),
                productos: []
            });
            
            return { message: `Se creó correctamente el carrito! ID: ${id}` };
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(id, product) {
        try {

            const carritos = this.db.collection('carritos');
            const querySnapshot = await carritos.get();
            const carritosArray = querySnapshot.docs.map(doc => doc.data());

            const carrito = carritosArray.find(elemento => elemento.id == id);

            if (!carrito) return { error: 'carrito no encontrado' };

            const carritoId = querySnapshot.docs.find(doc => doc.data().id == id).id;

            const productos = carrito.productos;

            productos.push(product);

            await carritos.doc(carritoId).update({ productos: productos });

            return { message: `Se agregó correctamente el producto ID: ${product.id} al carrito ID: ${id}` };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductToCart(id, productId) {
        try {
            const carritos = this.db.collection('carritos');
            const querySnapshot = await carritos.get();
            const carritosArray = querySnapshot.docs.map(doc => doc.data());

            const carrito = carritosArray.find(elemento => elemento.id == id);

            if (!carrito) return { error: 'carrito no encontrado' };

            const carritoId = querySnapshot.docs.find(doc => doc.data().id == id).id;

            const productos = carrito.productos;

            const producto = productos.find(elemento => elemento.id == productId);

            if (!producto) return { error: 'Ese producto no está en el carrito' };

            const productosFiltrados = productos.filter(elemento => elemento.id != productId);

            await carritos.doc(carritoId).update({ productos: productosFiltrados });

            return { message: `Se eliminó correctamente el producto ID: ${productId} del carrito ID: ${id}` };

        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id) {
        try {

            const carritos = this.db.collection('carritos');
            const querySnapshot = await carritos.get();
            const carritosArray = querySnapshot.docs.map(doc => doc.data());

            const carrito = carritosArray.find(elemento => elemento.id == id);

            if (!carrito) return { error: 'carrito no encontrado' };

            const carritoId = querySnapshot.docs.find(doc => doc.data().id == id).id;

            await carritos.doc(carritoId).delete();

            return { message: `Se eliminó correctamente el carrito!` };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorCarritosFirebase;