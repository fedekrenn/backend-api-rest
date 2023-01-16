const mongoose = require('mongoose');
const { CarritosModel } = require('../../model/carritosModel');

const { loggerError } = require('../../utils/logger');

mongoose.connect(process.env.DB_URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) loggerError.error(err);
});



class ContenedorCarritosMongo {

    async getProducts(id) {
        try {
            const cart = await CarritosModel.findOne({ _id: id });

            if (!cart) return { error: 'carrito no encontrado' }

            const productsInCart = cart.productos;

            if (productsInCart.length === 0) return { message: `El carrito ID: ${id} no tiene productos todavía` }

            return productsInCart;
        } catch (err) {
            loggerError.error(err);
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
            loggerError.error(err);
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
            loggerError.error(err);
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
            loggerError.error(err);
        }
    }

    async deleteCart(id) {
        try {
            const cart = await CarritosModel.findOne({ _id: id });

            if (!cart) return { error: 'carrito no encontrado' }

            await CarritosModel.deleteOne({ _id: id });

            return { message: `Se eliminó el carrito ID: ${id}` };
        } catch (err) {
            loggerError.error(err);
        }
    }
}

module.exports = ContenedorCarritosMongo;