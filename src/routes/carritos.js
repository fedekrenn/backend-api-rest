const express = require('express');
const { Router } = express;

const routerCarritos = Router();


const ContenedorCarritos = require('../class/contenedorCarritos/contenedorCarritos');
const ContenedorProductos = require('../class/contenedorProductos/contenedorProductos');

const contenedor = new ContenedorCarritos('carritos.txt');
const handleProducts = new ContenedorProductos('productos.txt');



/* ---------- POST ------------ */

// Crear un carrito
routerCarritos.post('/', async (req, res) => {

    const response = await contenedor.createCart();
    res.json(response)
})

// Agregar un producto al carrito
routerCarritos.post('/:id/productos/:idProducto', async (req, res) => {

    const { id: idCarrito, idProducto } = req.params;

    const producto = await handleProducts.getById(idProducto);

    if (producto.error) {
        res.json({ message: 'No existe el producto' })
    } else {
        const result = await contenedor.addProductToCart(idCarrito, producto);
        res.json(result)
    }
})

/* ---------- Delete ---------- */

// Eliminar un carrito entero
routerCarritos.delete('/:id', async (req, res) => {

    const { id } = req.params;

    const result = await contenedor.deleteCart(id);

    res.json(result)
})

// Eliminar un producto del carrito

routerCarritos.delete('/:id/productos/:idProducto', async (req, res) => {

    const { id: idCarrito, idProducto } = req.params;

    const result = await contenedor.deleteProductToCart(idCarrito, idProducto);
    res.json(result)
})


/* ---------- GET ------------ */

routerCarritos.get('/:id/productos', async (req, res) => {

    const { id } = req.params;

    const result = await contenedor.getProducts(id);

    res.json(result)
})

module.exports = routerCarritos;