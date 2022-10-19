const fs = require('fs');

class ContenedorCarritos {

    constructor(archivo) {
        this.archivo = archivo;
    }

    async createCart() {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const objeto = {}

            const arrayOfIds = data.map(elemento => elemento.id);

            if (arrayOfIds.length === 0) {
                objeto.id = 1;
            } else {
                objeto.id = Math.max(...arrayOfIds) + 1;
            }

            objeto.timestamp = Date.now();
            objeto.productos = [];

            data.push(objeto);

            data.sort((a, b) => a.id - b.id);

            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));

            return objeto.id;
        } catch (err) {
            console.log(err)
        }
    }

    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const objeto = data.find(elemento => elemento.id === parseInt(id));

            return objeto;
        } catch (err) {
            console.log(err)
        }
    }

    async deleteCart(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const newArray = data.filter(elemento => elemento.id !== parseInt(id));

            await fs.promises.writeFile(this.archivo, JSON.stringify(newArray, null, 2));

            return id;
        } catch (err) {
            console.log(err)
        }
    }

    async getProducts(id) {
        try {

            const cart = await this.getById(id);
            return cart.productos;
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = ContenedorCarritos;