const mongoose = require('mongoose');
const { CarritosModel } = require('../../model/carritosModel');
const { loggerError, loggerBuy } = require('../../utils/logger');
const handleSubmitMail = require('../../utils/mailOptions');
const { handleSubmitWhatsapp, handleSubmitSMS } = require('../../utils/twilioOptions');

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
            return { error: 'carrito no encontrado' };
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

            if (!cart) return { error: 'Carrito no encontrado!' }

            cart.productos.push(producto);

            await cart.save();

            return { message: `Se agregó el producto: '${producto.nombre}' al carrito ID: ${id}` };
        } catch (err) {
            return { error: 'Carrito no encontrado!' };
        }
    }

    async buyCart(buyInfo) {
        try {
            const { cart, email, personName, phone } = buyInfo;

            const productsName = cart.map(element => element.nombre);
            const totalPrice = cart.reduce((acc, element) => acc + element.precio, 0);

            const mailOptions = {
                from: 'Servidor Ecommerce',
                to: process.env.EMAIL,
                subject: `Nuevo pedido recibido de ${personName}`,
                html: `
                    <h1>Nueva compra!</h1>
                    <p>Se compraron los siguientes productos</p>
                    <ul>
                        ${productsName.map(element => `<li>${element}</li>`).join('')}
                    </ul>
                    <p>Por un total de: $${totalPrice}</p>
                    <p>El pedido es a nombre de ${personName}</p>
                    <p>El email de contacto es: ${email}</p>
                    `
            };

            const whatsappMsg = `Nueva compra!\n\nSe compraron los siguientes productos:\n${productsName.map(element => `◆ ${element}`).join('\n')}\n\nPor un total de: $${totalPrice}\n\nEl pedido es a nombre de ${personName} y su email es ${email}`
            const smsMsg = `Hola ${personName}! Te confirmamos que se recibió tu pedido correctamente. En breve nos comunicaremos con vos para coordinar la entrega. Gracias por elegirnos!`

            handleSubmitMail(mailOptions);
            handleSubmitWhatsapp(whatsappMsg);
            handleSubmitSMS(smsMsg, phone);

            loggerBuy.trace(`Se compraron los productos: ${productsName.join(', ')} por un total de: $${totalPrice}`);

            return { message: `Se compraron los productos: ${productsName.join(', ')} por un total de: $${totalPrice}` };
        } catch (error) {
            loggerError.error(error);
        }
    }

    async deleteProductToCart(id, idProducto) {
        try {

            const cart = await CarritosModel.findOne({ _id: id });

            if (!cart) return { error: 'Carrito no encontrado!' }

            const product = cart.productos.find(element => element._id.toString() === idProducto);

            if (!product) return { error: `Ese producto no se encuentra en el carrito ID: ${id}` }

            const filteredArray = cart.productos.filter(element => element._id.toString() !== idProducto);

            cart.productos = filteredArray;

            await cart.save();

            return { message: `Se eliminó el producto: '${product.nombre}' del carrito ID: ${id}` };
        } catch (err) {
            return { error: 'Carrito no encontrado!' }
        }
    }

    async deleteCart(id) {
        try {

            const cart = await CarritosModel.findOne({ _id: id });

            if (!cart) return { error: 'carrito no encontrado' }

            await CarritosModel.deleteOne({ _id: id });

            return { message: `Se eliminó el carrito ID: ${id}` };
        } catch (err) {
            return { error: 'carrito no encontrado' }
        }
    }
}

module.exports = ContenedorCarritosMongo;