const mongoose = require("mongoose");
const { ProductosModel } = require("../../model/productosModel");

const { loggerError } = require("../../utils/logger");

mongoose.connect(
    process.env.DB_URL_MONGO,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) loggerError.error(err);
    }
);

class ContenedorProductosMongo {
    async getById(id) {
        try {
            const productos = await this.getAll();
            const producto = productos.find((elemento) => elemento.id == id);

            if (!producto) return { error: "Producto no encontrado" };

            return producto;
        } catch (error) {
            loggerError.error(error);
        }
    }

    async save(product) {
        try {
            product.timestamp = Date.now();

            const newProduct = new ProductosModel(product);

            await newProduct.save();

            return { message: `Producto ${product.nombre} guardado!` };
        } catch (err) {
            loggerError.error(err);
        }
    }

    async updateById(id, newData) {
        try {
            const productos = await this.getAll();
            const producto = productos.find((elemento) => elemento.id == id);

            if (!producto) return { error: "Producto no encontrado" };

            await ProductosModel.updateOne({ _id: id }, newData);

            return { message: `Producto id: ${id} actualizado` };
        } catch (error) {
            loggerError.error(error);
        }
    }

    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const producto = productos.find((elemento) => elemento.id == id);

            if (!producto) return { error: "Producto no encontrado" };

            await ProductosModel.deleteOne({ _id: id });

            return { message: `Producto id: ${id} eliminado` };
        } catch (error) {
            loggerError.error(error);
        }
    }
}

module.exports = ContenedorProductosMongo;
