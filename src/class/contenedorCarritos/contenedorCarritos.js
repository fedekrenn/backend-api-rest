const config = require('../../config/config');
const { CarritosModel } = require('../../model/carritosModel');

class ContenedorCarritos {

    constructor(archivo) {
        this.archivo = archivo;
    }

    async getProducts(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const cart = data.find(element => element.id === parseInt(id));

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
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const cart = {}

            const arrayOfIds = data.map(element => element.id);

            if (arrayOfIds.length === 0) {
                cart.id = 1;
            } else {
                cart.id = Math.max(...arrayOfIds) + 1;
            }

            cart.timestamp = Date.now();
            cart.productos = [];

            data.push(cart);

            data.sort((a, b) => a.id - b.id);

            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));

            return { message: `Se creó correctamente el carrito ID: ${cart.id}` };
        } catch (err) {
            console.log(err)
        }
    }

    async addProductToCart(id, producto) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const cart = data.find(element => element.id === parseInt(id));

            if (!cart) return { error: 'carrito no encontrado' }

            cart.productos.push(producto);

            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));

            return { message: `Se agregó el producto: '${producto.nombre}' al carrito ID: ${id}` };
        } catch (err) {
            console.log(err)
        }
    }

    async deleteProductToCart(id, idProducto) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const cart = data.find(element => element.id === parseInt(id));

            if (!cart) return { error: 'carrito no encontrado' }

            const product = cart.productos.find(element => element.id === parseInt(idProducto));

            if (!product) return { message: `Ese producto no se encuentra en el carrito ID: ${id}` }

            const filteredArray = cart.productos.filter(element => element.id !== parseInt(idProducto));

            cart.productos = filteredArray;

            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));

            return { message: `Se eliminó el producto: '${product.nombre}' del carrito ID: ${id}` };
        } catch (err) {
            console.log(err)
        }
    }

    async deleteCart(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const cart = data.find(element => element.id === parseInt(id));

            if (!cart) return { error: 'carrito no encontrado' }

            const filteredArray = data.filter(element => element.id !== parseInt(id));

            await fs.promises.writeFile(this.archivo, JSON.stringify(filteredArray, null, 2));

            return { message: `Se eliminó el carrito ID: ${id}` };
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = ContenedorCarritos;