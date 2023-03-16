const express = require('express')

const isAdminMiddleware = require('../middlewares/isAdminMiddleware')

const { getOrders, markOrderAsCompleted } = require('../controllers/orders')

const { Router } = express
const routerOrders = Router()

/* ---------- GET ------------ */

// Obtener todas las ordenes o una por id
routerOrders.get('/:id?', getOrders)

/* ---------- PUT ------------ */
// Marcar una orden como completada
routerOrders.put('/:id', isAdminMiddleware, markOrderAsCompleted)

module.exports = routerOrders
