const admin = require('firebase-admin');
const config = require('../config/config')

let handleProducts
let handleCarts

switch (process.env.PERS) {
    case 'mongo':
        const ContenedorProductosMongo = require('../daos/productoDao/productoMongoDao');
        const ContenedorCarritosMongo = require('../daos/carritoDao/carritoMongoDao');

        console.log('Using Mongo');

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

        console.log("Using Firebase");

        handleProducts = new ContenedorProductosFb(db);
        handleCarts = new ContenedorCarritosFb(db);

        break;
}

module.exports = { handleProducts, handleCarts };