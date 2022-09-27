const express = require('express');
const app = express();
const { Router } = require('express');

const routerProductos = Router();
app.use('/api/productos', routerProductos);

routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

const Contenedor = require('./src/main');
const contenedor = new Contenedor('productos.txt');

app.use(express.static('public'));


/* ---------- GET ------------ */

// Obtener todos los productos
routerProductos.get('/', async (req, res) => {
    const productos = await contenedor.getAll();

    res.json(productos)
})

// Obtener productos random
routerProductos.get('/random', async (req, res) => {
    const productos = await contenedor.getAll();
    const random = Math.floor(Math.random() * productos.length);

    res.json(productos[random])
})

// Obtener por ID
routerProductos.get('/:id', async (req, res) => {
    const producto = await contenedor.getById(req.params.id);

    !producto ? res.json({ error: 'producto no encontrado' }) : res.json(producto);
})



/* ---------- POST ------------ */

// Agregar un producto
routerProductos.post('/', async (req, res) => {

    await contenedor.save(req.body, true);
    res.json(req.body)
})


/* ---------- PUT ------------ */

// Actualizar un producto
routerProductos.put('/:id', async (req, res) => {
    const productoParaActualizar = await contenedor.getById(req.params.id);

    if (!productoParaActualizar) {
        res.json({ error: 'producto no encontrado' })
    } else {
        await contenedor.deleteById(req.params.id);

        const { title, price, thumbnail } = req.body;

        productoParaActualizar.title = title;
        productoParaActualizar.price = price;
        productoParaActualizar.thumbnail = thumbnail;
        productoParaActualizar.id = parseInt(req.params.id);

        await contenedor.save(productoParaActualizar, false);

        res.json(req.body)
    }

})

/* ---------- DELETE ------------ */

// Eliminar un producto
routerProductos.delete('/:id', async (req, res) => {
    const productoParaEliminar = await contenedor.getById(req.params.id);

    if (!productoParaEliminar) {
        res.json({ error: 'producto no encontrado' })
    } else {
        await contenedor.deleteById(req.params.id);
        res.json({ msg: 'producto eliminado' })
    }
})



const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', error => console.log(`Error en servidor ${error}`));