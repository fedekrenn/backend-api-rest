const express = require('express');
const { Router } = express;

const { authMiddleware } = require('../middlewares/autorize');

const routerProductos = Router();

const ContenedorProductos = require('../class/contenedorProductos');
const contenedor = new ContenedorProductos('productos.txt');

/* ---------- GET ------------ */

// Obtener todos los productos o si se le pasa un id, obtener ese producto

routerProductos.get('/:id?', async (req, res) => {

    const { id } = req.params;

    if (id) {
        const producto = await contenedor.getById(id);
        !producto ? res.json({ error: 'producto no encontrado' }) : res.json(producto);

    } else {
        const productos = await contenedor.getAll();
        res.json(productos);
    }
})

/* ---------- POST ------------ */

// Agregar un producto
routerProductos.post('/', authMiddleware, async (req, res) => {

    await contenedor.save(req.body, true);
    res.json(req.body)
})

/* ---------- PUT ------------ */

// Actualizar un producto
routerProductos.put('/:id', authMiddleware, async (req, res) => {
    const productoParaActualizar = await contenedor.getById(req.params.id);

    if (!productoParaActualizar) {
        res.json({ error: 'producto no encontrado' })
    } else {
        await contenedor.deleteById(req.params.id);

        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

        productoParaActualizar.nombre = nombre;
        productoParaActualizar.descripcion = descripcion;
        productoParaActualizar.codigo = codigo;
        productoParaActualizar.foto = foto;
        productoParaActualizar.precio = precio;
        productoParaActualizar.stock = stock;
        productoParaActualizar.timestamp = Date.now();
        // productoParaActualizar.id = parseInt(req.params.id);

        await contenedor.save(productoParaActualizar, false);

        res.json(req.body)
    }

})

/* ---------- DELETE ------------ */

// Eliminar un producto
routerProductos.delete('/:id', authMiddleware, async (req, res) => {
    const productoParaEliminar = await contenedor.getById(req.params.id);

    if (!productoParaEliminar) {
        res.json({ error: 'producto no encontrado' })
    } else {
        await contenedor.deleteById(req.params.id);
        res.json({ msg: 'producto eliminado' })
    }
})

module.exports = routerProductos;