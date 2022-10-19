const express = require('express');
const { Router } = express;

// const { authMiddleware } = require('../middlewares/autorize'); ---- Creo que no va esto

const routerCarritos = Router();

const ContenedorCarritos = require('../class/contenedorCarritos');
const contenedor = new ContenedorCarritos('carritos.txt');



/* ---------- POST ------------ */

routerCarritos.post('/', async (req, res) => {

    const resID = await contenedor.createCart();
    res.json({ message: `Se creó correctamente el carrito ID: ${resID}` })
})

/* ---------- Delete ---------- */

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

























routerCarritos.post('/:id/productos/:idProd', async (req, res) => {
    const carrito = await contenedor.getById(req.params.id);
    const producto = await contenedor.getById(req.params.idProd);
    carrito.productos.push(producto);
    await contenedor.save(carrito, false);
    res.json(carrito)


})




module.exports = routerCarritos;