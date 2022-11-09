const express = require('express');
const { Router } = express;

const { authMiddleware } = require('../middlewares/autorize');

const routerProductos = Router();

const ContenedorProductos = require('../class/contenedorProductos/contenedorProductosMongo');
const contenedor = new ContenedorProductos();

/* ---------- GET ------------ */

// Obtener todos los productos o si se le pasa un id, obtener ese producto

routerProductos.get('/:id?', async (req, res) => {

    const { id } = req.params;

    if (id) {
        const result = await contenedor.getById(id);
        res.json(result);
    } else {
        const productos = await contenedor.getAll();
        res.json(productos);
    }
})

/* ---------- POST ------------ */

// Agregar un producto
routerProductos.post('/', authMiddleware, async (req, res) => {

    const producto = req.body;

    const result = await contenedor.save(producto);
    res.json(result)
})

/* ---------- PUT ------------ */

// Actualizar un producto
routerProductos.put('/:id', authMiddleware, async (req, res) => {

    const { id } = req.params;

    const result = await contenedor.updateById(id, req.body);

    res.json(result);
})

/* ---------- DELETE ------------ */

// Eliminar un producto
routerProductos.delete('/:id', authMiddleware, async (req, res) => {

    const { id } = req.params;

    const result = await contenedor.deleteById(id);

    res.json(result)
})

module.exports = routerProductos;