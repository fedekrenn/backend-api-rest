const express = require('express');
const { Router } = express;

const routerCarritos = Router();


const ContenedorCarritos = require('../class/contenedorCarritos');
const ContenedorProductos = require('../class/contenedorProductos');

const contenedor = new ContenedorCarritos('carritos.txt');
const cProd = new ContenedorProductos('productos.txt');



/* ---------- POST ------------ */

// Crear un carrito
routerCarritos.post('/', async (req, res) => {

    const resID = await contenedor.createCart();
    res.json({ message: `Se creó correctamente el carrito ID: ${resID}` })
})

// Agregar un producto al carrito
routerCarritos.post('/:id/productos/:idProducto', async (req, res) => {

    const { id, idProducto } = req.params;

    const carrito = await contenedor.getById(id);
    const producto = await cProd.getById(idProducto);

    if (!carrito || !producto) {
        res.json({ message: 'No existe el carrito o el producto' })
    } else {
        contenedor.addProduct(id, producto);
        res.json({ message: `Se agregó el producto: '${producto.nombre}' al carrito ID: ${id}` })
    }
})



/* ---------- Delete ---------- */

// Eliminar un carrito entero
routerCarritos.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const carritoParaBorrar = await contenedor.getById(id);

    if (!carritoParaBorrar) {
        res.json({ error: 'carrito no encontrado' })
    } else {
        await contenedor.deleteCart(id);
        res.json({ message: `Se borró correctamente el carrito ID: ${id}` })
    }
})

// Eliminar un producto del carrito

routerCarritos.delete('/:id/productos/:idProducto', async (req, res) => {

    const { id, idProducto } = req.params;

    const carrito = await contenedor.getById(id);
    const producto = await cProd.getById(idProducto);

    if (!carrito || !producto) {

        res.json({ message: 'No existe el carrito o el producto' })

    } else {

        const result = await contenedor.deleteProductToCart(id, idProducto);

        if (result) {
            res.json({ message: `Se eliminó el producto: '${producto.nombre}' del carrito ID: ${id}` })
        } else {
            res.json({ message: `El producto: '${producto.nombre}' no se encuentra en el carrito ID: ${id}` })
        }
    }
})


/* ---------- GET ------------ */

routerCarritos.get('/:id/productos', async (req, res) => {
    const { id } = req.params;

    const carrito = await contenedor.getById(id);

    if (!carrito) {
        res.json({ error: 'carrito no encontrado' })
    } else {
        const totalProducts = await contenedor.getProducts(id);

        totalProducts.length === 0 ? res.json({ message: 'El carrito está vacío' }) : res.json(totalProducts);
    }
})

module.exports = routerCarritos;