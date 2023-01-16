const admin = require('firebase-admin');
const config = require('../config/config')

const { logger } = require('../utils/logger');

let handleProducts
let handleCarts

switch (process.env.PERS) {
    case 'mongo':
        const ContenedorProductosMongo = require('../daos/productoDao/productoMongoDao');
        const ContenedorCarritosMongo = require('../daos/carritoDao/carritoMongoDao');

        logger.info("Using Mongo");

        handleProducts = new ContenedorProductosMongo();
        handleCarts = new ContenedorCarritosMongo();

        break;
    case 'firebase':

        admin.initializeApp({
            credential: admin.credential.cert(config.firebase),
        });

        const db = admin.firestore();

        const ContenedorProductosFb = require('../daos/productoDao/productoFirebaseDao');
        const ContenedorCarritosFb = require('../daos/carritoDao/carritoFirebaseDao');

        logger.info("Using Firebase");

        handleProducts = new ContenedorProductosFb(db);
        handleCarts = new ContenedorCarritosFb(db);

        break;

    default:
        const ContenedorProductosDefault = require('../daos/productoDao/productoMongoDao');
        const ContenedorCarritosDefault = require('../daos/carritoDao/carritoMongoDao');

        logger.info("Using Mongo by default mode");

        handleProducts = new ContenedorProductosDefault();
        handleCarts = new ContenedorCarritosDefault();

        break;
}

module.exports = { handleProducts, handleCarts };