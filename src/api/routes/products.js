const express = require('express')
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')
const {
  getProducts,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products')

const { Router } = express
const routerProducts = Router()

/* ---------- GET ------------ */

// Obtener todos los productos o uno por id
routerProducts.get('/:id?', getProducts)

// Obtener productos según su categoría
routerProducts.get('/categoria/:category', getProductsByCategory)

/* ---------- POST ------------ */

// Agregar un producto
routerProducts.post('/', isAdminMiddleware, addProduct)

/* ---------- PUT ------------ */

// Actualizar un producto
routerProducts.put('/:id', isAdminMiddleware, updateProduct)

/* ---------- DELETE ------------ */

// Eliminar un producto
routerProducts.delete('/:id', isAdminMiddleware, deleteProduct)

module.exports = routerProducts
