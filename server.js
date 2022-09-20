const express = require('express');
const app = express();
const Contenedor = require('./main');

app.get('/', (req, res) => {
    res.send({ ruta: 'raiz' })
})

app.get('/productos', async (req, res) => {

    const contenedor = new Contenedor('productos.txt');
    const productos = await contenedor.getAll();

    res.send(productos)
})

app.get('/productoRandom', async (req, res) => {

    const contenedor = new Contenedor('productos.txt');
    const productos = await contenedor.getAll();
    const productoRandom = productos[Math.floor(Math.random() * productos.length)];

    res.send(productoRandom)
})

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', error => console.log(`Error en servidor ${error}`));