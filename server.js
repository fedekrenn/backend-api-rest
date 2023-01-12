/* --- Importaciones  ---- */
const express = require('express');
const app = express();

const config = require('./src/config/config');

const routerProductos = require('./src/routes/productos');
const routerCarritos = require('./src/routes/carritos');
const routerSesions = require('./src/routes/session')
const routerAuth = require('./src/routes/isAuth')


const passport = require('./src/utils/passport');

const sessionMiddleware = require('./src/middlewares/auth')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));






/* ------ Session  -------- */

const session = require('express-session')

app.use(session(config.sessionConfig))

/* -----  Passport  ------- */

app.use(passport.initialize());
app.use(passport.session());


/* ------ Rutas  -------- */

app.use('/is-auth', sessionMiddleware, routerAuth)
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);
app.use('/', routerSesions)

app.use((req, res) => {
    res.status(404).json({ error: -2, descripcion: `ruta '${req.path}' método '${req.method}' no implementada` });
});





/* ------ Servidor  -------- */

const server = app.listen(config.puerto, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', error => console.log(`Error en servidor ${error}`));