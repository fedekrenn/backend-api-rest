const express = require('express')
const { Router } = express
const {
  mainRoute,
  loginRoute,
  registerRoute,
  logoutRoute,
  getNameRoute,
} = require('../controllers/session')

const authMiddleware = require('../middlewares/auth')

const routerSesions = Router()

// Ruta principal
routerSesions.get('/', authMiddleware, mainRoute)

// Login
routerSesions.post('/login', loginRoute)

// Registro
routerSesions.post('/register', registerRoute)

// Deslogueo
routerSesions.get('/logout', logoutRoute)

// Obtener el nombre
routerSesions.get('/get-data', getNameRoute)

module.exports = routerSesions
