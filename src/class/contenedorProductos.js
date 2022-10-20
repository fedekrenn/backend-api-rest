const fs = require('fs');

class ContenedorProductos {

    constructor(archivo) {
        this.archivo = archivo;
    }

    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const product = data.find(elemento => elemento.id == id);

            if (!product) {
                return { error: 'producto no encontrado' }
            } else {
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async save(product, newId) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            if (newId) {

                const arrayOfIds = data.map(elemento => elemento.id);

                if (arrayOfIds.length === 0) {
                    product.id = 1;
                } else {
                    product.id = Math.max(...arrayOfIds) + 1;
                }
            }

            product.timestamp = Date.now();

            data.push(product);

            data.sort((a, b) => a.id - b.id);

            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));

            return { success: `producto ${product.nombre} guardado, su id es : ${product.id}` };
        } catch (err) {
            console.log(err)
        }
    }

    async updateById(id, newData) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const product = data.find(elemento => elemento.id == id);

            if (!product) return { error: 'producto no encontrado' };

            const { nombre, descripcion, codigo, foto, precio, stock } = newData;

            product.nombre = nombre;
            product.descripcion = descripcion;
            product.codigo = codigo;
            product.foto = foto;
            product.precio = precio;
            product.stock = stock;
            product.timestamp = Date.now();

            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));

            return { success: `producto id: ${id} actualizado`, producto: product };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const product = data.find(elemento => elemento.id == id);

            if (!product) return { error: 'producto no encontrado' };

            const filteredProducts = data.filter(elemento => elemento.id != id);

            await fs.promises.writeFile(this.archivo, JSON.stringify(filteredProducts, null, 2));

            return { success: `producto id: ${id} eliminado` };

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorProductos;