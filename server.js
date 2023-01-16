/* --- Importaciones  ---- */
const express = require('express');
const app = express();

const config = require('./src/config/config');
const { logger, loggerWarn } = require('./src/utils/logger');

const routerProductos = require('./src/routes/productos');
const routerCarritos = require('./src/routes/carritos');
const routerSesions = require('./src/routes/session')
const routerAuth = require('./src/routes/isAuth')

const passport = require('./src/utils/passport');

const sessionMiddleware = require('./src/middlewares/auth')

// Clusters
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const MODE = process.env.MODE;

if (MODE === 'cluster' && cluster.isMaster) {
    logger.info(`Master ${process.pid} is running in ${MODE} mode`);
    logger.info(`Numero de procesadores: ${numCPUs}`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        loggerWarn.warn(`worker ${worker.process.pid} died, ${new Date().toLocaleString()}`);
        cluster.fork();
    });

} else {

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

    const server = app.listen(config.puerto, () => logger.info(`Servidor http escuchando en el puerto ${server.address().port}`));
    server.on('error', error => logger.error(`Error en servidor ${error}`));
}