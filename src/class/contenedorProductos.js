const fs = require('fs');

class ContenedorProductos {

    constructor(archivo) {
        this.archivo = archivo;
    }

    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const objeto = data.find(elemento => elemento.id == id);
            return objeto;
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

    async save(objeto, newId) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            if (newId) {

                const arrayOfIds = data.map(elemento => elemento.id);

                if (arrayOfIds.length === 0) {
                    objeto.id = 1;
                } else {
                    objeto.id = Math.max(...arrayOfIds) + 1;
                }
            }

            const timestamp = Date.now();

            objeto.timestamp = timestamp;

            data.push(objeto);

            data.sort((a, b) => a.id - b.id);

            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));
            console.log("Se guardó correctamente el objeto id: ", objeto.id);

            return objeto.id;
        } catch (err) {
            console.log(err)
        }
    }

    async updateById(id, objeto) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const objetoParaActualizar = data.find(elemento => elemento.id == id);

            if (!objetoParaActualizar) {

                return { error: 'producto no encontrado' };

            } else {
                const { nombre, descripcion, codigo, foto, precio, stock } = objeto;

                objetoParaActualizar.nombre = nombre;
                objetoParaActualizar.descripcion = descripcion;
                objetoParaActualizar.codigo = codigo;
                objetoParaActualizar.foto = foto;
                objetoParaActualizar.precio = precio;
                objetoParaActualizar.stock = stock;
                objetoParaActualizar.timestamp = Date.now();

                await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));

                return { success: `producto id: ${id} actualizado`, producto: objetoParaActualizar };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            const objetoParaEliminar = data.find(elemento => elemento.id == id);

            if (!objetoParaEliminar) {

                return { error: 'producto no encontrado' };
                
            } else {

                const dataFiltrada = data.filter(elemento => elemento.id != id);
                await fs.promises.writeFile(this.archivo, JSON.stringify(dataFiltrada, null, 2));

                return { success: `producto id: ${id} eliminado` };
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorProductos;