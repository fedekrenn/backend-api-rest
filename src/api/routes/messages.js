const express = require('express')

const getMessages = require('../controllers/messages')

const { Router } = express
const routerMessages = Router()

/* ---------- GET ------------ */

// Obtener todos los mensajes o uno por mail
routerMessages.get('/:email?', getMessages)

module.exports = routerMessages
