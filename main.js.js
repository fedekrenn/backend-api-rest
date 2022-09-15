const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async save(objeto) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            objeto.id = data.length + 1;
            data.push(objeto);
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
            const objeto = data.find(elemento => elemento.id === id);
            console.log(objeto)
            return objeto;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const arrayFiltrado = data.filter(elemento => elemento.id !== id);
            await fs.promises.writeFile(this.archivo, JSON.stringify(arrayFiltrado, null, 2));

            // Si bien el desafío pide que sea VOID, para control genero un console.log
            console.log("Se eliminó correctamente el objeto id: ", id);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify([], null, 2));
            // Si bien el desafío pide que sea VOID, para control genero un console.log
            console.log("Se eliminó correctamente el archivo");
        } catch (error) {
            console.log(error);
        }
    }
}

const nuevoContenedor = new Contenedor('productos.txt');

const ejecutar = async () => {
    await nuevoContenedor.save({ title: 'Regla', price: 35, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png' })
    await nuevoContenedor.getById(2)
    await nuevoContenedor.getAll()
    await nuevoContenedor.deleteById(1)
    // nuevoContenedor.deleteAll() - Se deja comentado para que no rompa con los datos de productos.txt
}

ejecutar();