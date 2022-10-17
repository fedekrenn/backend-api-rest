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

            const timestamp = Date.now();
            objeto.timestamp = timestamp;
            objeto.productos = [];

            data.push(objeto);

            data.sort((a, b) => a.id - b.id);

            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));

            return objeto.id;
        } catch (err) {
            console.log(err)
        }
    }

    async save(objeto) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);

            // ACA DEBO VER LA LÓGICA SI CORRESPONDE CHECKEAR SI EL ID EXISTE O NO

            data.push(objeto);

            data.sort((a, b) => a.id - b.id);

            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));
            console.log("Se guardó correctamente el objeto id: ", objeto.id);

            return objeto.id;
        } catch (err) {
            console.log(err)
        }
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

    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const arrayFiltrado = data.filter(elemento => elemento.id != id);
            await fs.promises.writeFile(this.archivo, JSON.stringify(arrayFiltrado, null, 2));

            console.log("Se eliminó correctamente el objeto id: ", id);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = ContenedorCarritos;