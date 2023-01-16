const contenedorCarritosFirebase = require('../../class/contenedorCarritos/contenedorCarritosFirebase');

const { loggerError } = require('../../utils/logger');

class CarritoFirebaseDao extends contenedorCarritosFirebase {
    constructor(db) {
        super(db);
    }

    async getAll() {
        try {
            const carritos = this.db.collection('carritos');
            const querySnapshot = await carritos.get();
            const carritosArray = querySnapshot.docs.map(doc => doc.data());

            return carritosArray;
        } catch (error) {
            loggerError.error(error);
        }
    }
}

module.exports = CarritoFirebaseDao;