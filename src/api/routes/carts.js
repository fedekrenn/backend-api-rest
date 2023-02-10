const express = require('express')

const {
  createCart,
  addProductToCart,
  buyCart,
  deleteCart,
  deleteProductFromCart,
  getAllCarts,
  getProductsFromCart,
} = require('../controllers/cart')

const { Router } = express
const routerCarts = Router()

/* ---------- GET ------------ */

// Obtener todos los carritos
routerCarts.get('/', getAllCarts)

// Obtener un carrito por id
routerCarts.get('/:id/productos', getProductsFromCart)

/* ---------- POST ------------ */

// Crear un carrito
routerCarts.post('/', createCart)

// Agregar un producto al carrito
routerCarts.post('/:id/productos/:productId', addProductToCart)

// Confirmación de compra de carrito
routerCarts.post('/confirmar-compra', buyCart)

/* ---------- Delete ---------- */

// Eliminar un carrito entero
routerCarts.delete('/:id', deleteCart)

// Eliminar un producto del carrito
routerCarts.delete('/:id/productos/:productId', deleteProductFromCart)

module.exports = routerCarts
