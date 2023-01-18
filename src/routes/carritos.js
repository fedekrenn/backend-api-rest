const express = require('express');
const { Router } = express;

const { handleProducts, handleCarts } = require('../daos/handleDaos');

const routerCarritos = Router();

/* ---------- POST ------------ */

// Crear un carrito
routerCarritos.post('/', async (req, res) => {

    const result = await handleCarts.createCart();
    res.json(result)
})

// Agregar un producto al carrito
routerCarritos.post('/:id/productos/:idProducto', async (req, res) => {

    const { id: idCarrito, idProducto } = req.params;

    const producto = await handleProducts.getById(idProducto);

    if (producto.error) {

        res.json({ message: 'No existe el producto' })
    } else {
        const result = await handleCarts.addProductToCart(idCarrito, producto);
        res.json(result)
    }
})

// Confirmación de compra de carrito
routerCarritos.post('/confirmar-compra', async (req, res) => {

    const dataToBuy = req.body

    const result = await handleCarts.buyCart(dataToBuy);
    res.json(result)
})

/* ---------- Delete ---------- */

// Eliminar un carrito entero
routerCarritos.delete('/:id', async (req, res) => {

    const { id } = req.params;

    const result = await handleCarts.deleteCart(id);
    res.json(result)
})

// Eliminar un producto del carrito

routerCarritos.delete('/:id/productos/:idProducto', async (req, res) => {

    const { id: idCarrito, idProducto } = req.params;

    const result = await handleCarts.deleteProductToCart(idCarrito, idProducto);
    res.json(result)
})


/* ---------- GET ------------ */

// Obtener todos los carritos

routerCarritos.get('/', async (req, res) => {

    const result = await handleCarts.getAll();

    res.json(result)
})

routerCarritos.get('/:id/productos', async (req, res) => {

    const { id } = req.params;

    const result = await handleCarts.getProducts(id);
    res.json(result)
})

module.exports = routerCarritos;