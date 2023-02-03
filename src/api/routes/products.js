const express = require('express')
const { authMiddleware } = require('../middlewares/autorize')
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products')

const { Router } = express
const routerProductos = Router()

/* ---------- GET ------------ */

// Obtener todos los productos o uno por id
routerProductos.get('/:id?', getProducts)

/* ---------- POST ------------ */

// Agregar un producto
routerProductos.post('/', authMiddleware, addProduct)

/* ---------- PUT ------------ */

// Actualizar un producto
routerProductos.put('/:id', authMiddleware, updateProduct)

/* ---------- DELETE ------------ */

// Eliminar un producto
routerProductos.delete('/:id', authMiddleware, deleteProduct)

module.exports = routerProductos
