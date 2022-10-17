const express = require('express');
const { Router } = express;

// const { authMiddleware } = require('../middlewares/autorize'); ---- Creo que no va esto

const routerCarritos = Router();

const ContenedorCarritos = require('../class/contenedorCarritos');
const contenedor = new ContenedorCarritos('carritos.txt');

/* ---------- GET ------------ */

routerCarritos.get('/:id/productos', async (req, res) => {
    // CORREGIR ESTEEEEEE
    const carritos = await contenedor.getAll();
    res.json(carritos)
})

/* ---------- POST ------------ */

routerCarritos.post('/', async (req, res) => {
    
    await contenedor.createCart();
    res.json({ message: 'Carrito creado' })
})


routerCarritos.post('/:id/productos/:idProd', async (req, res) => {
    const carrito = await contenedor.getById(req.params.id);
    const producto = await contenedor.getById(req.params.idProd);
    carrito.productos.push(producto);
    await contenedor.save(carrito, false);
    res.json(carrito)

    
})




module.exports = routerCarritos;