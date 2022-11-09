const mongoose = require('mongoose');
const { ProductosModel } = require('../../model/productosModel');

mongoose.connect(process.env.DB_URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log(err);
});

class ContenedorProductos {

    async getAll() {
        try {
            const productos = await ProductosModel.find();

            return productos;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const productos = await this.getAll();
            const producto = productos.find(elemento => elemento.id == id);

            if (!producto) return { error: 'producto no encontrado' };

            return producto;
        } catch (error) {
            console.log(error);
        }
    }

    async save(product) {
        try {

            product.timestamp = Date.now();

            const newProduct = new ProductosModel(product);
            await newProduct.save();

            return { success: `producto ${product.nombre} guardado!` };
        } catch (err) {
            console.log(err)
        }
    }

    async updateById(id, newData) {
        try {

            const productos = await this.getAll();
            const producto = productos.find(elemento => elemento.id == id);

            if (!producto) return { error: 'producto no encontrado' };

            await ProductosModel.updateOne({ _id: id }, newData);

            return { success: `producto id: ${id} actualizado` };

        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {

            const productos = await this.getAll();
            const producto = productos.find(elemento => elemento.id == id);

            if (!producto) return { error: 'producto no encontrado' };

            await ProductosModel.deleteOne({ _id: id });

            return { success: `producto id: ${id} eliminado` };

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorProductos;