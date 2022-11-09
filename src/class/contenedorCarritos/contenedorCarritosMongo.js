const mongoose = require('mongoose');
const { CarritosModel } = require('../../model/carritosModel');

mongoose.connect(process.env.DB_URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log(err);
});

class ContenedorCarritos {

    async getProducts(id) {
        try {
            const cart = await CarritosModel.findOne({ _id: id });

            if (!cart) return { error: 'carrito no encontrado' }

            const productsInCart = cart.productos;

            if (productsInCart.length === 0) {
                return { message: `El carrito ID: ${id} no tiene productos todavía` }
            } else {
                return productsInCart;
            }
        } catch (err) {
            console.log(err)
        }
    }

    async createCart() {
        try {

            const cart = new CarritosModel({
                timestamp: Date.now(),
                productos: []
            });

            await cart.save();

            return { message: `Se creó correctamente el carrito!` };

        } catch (err) {
            console.log(err)
        }
    }

    async addProductToCart(id, producto) {
        try {

            const cart = await CarritosModel.findOne({ _id: id });

            if (!cart) return { error: 'carrito no encontrado' }

            cart.productos.push(producto);

            await cart.save();

            return { message: `Se agregó el producto: '${producto.nombre}' al carrito ID: ${id}` };
        } catch (err) {
            console.log(err)
        }
    }

    async deleteProductToCart(id, idProducto) {
        try {

            const cart = await CarritosModel.findOne({ _id: id });

            if (!cart) return { error: 'carrito no encontrado' }

            const product = cart.productos.find(element => element._id.toString() === idProducto);

            if (!product) return { message: `Ese producto no se encuentra en el carrito ID: ${id}` }

            const filteredArray = cart.productos.filter(element => element._id.toString() !== idProducto);

            cart.productos = filteredArray;

            await cart.save();

            return { message: `Se eliminó el producto: '${product.nombre}' del carrito ID: ${id}` };
        } catch (err) {
            console.log(err)
        }
    }

    async deleteCart(id) {
        try {
            
            const cart = await CarritosModel.findOne({ _id: id });

            if (!cart) return { error: 'carrito no encontrado' }

            await CarritosModel.deleteOne({ _id: id });

            return { message: `Se eliminó el carrito ID: ${id}` };
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = ContenedorCarritos;