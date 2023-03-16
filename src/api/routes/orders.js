const express = require('express')

const {
  getOrders,
  markOrderAsCompleted,
} = require('../controllers/orders')

const { Router } = express
const routerOrders = Router()

/* ---------- GET ------------ */

// Obtener todas las ordenes o una por id
routerOrders.get('/:id?', getOrders)

/* ---------- PUT ------------ */
// Marcar una orden como completada
routerOrders.put('/:id', markOrderAsCompleted)

module.exports = routerOrders
