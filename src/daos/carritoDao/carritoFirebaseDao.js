const contenedorCarritosFirebase = require('../../class/contenedorCarritos/contenedorCarritosFirebase');

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
            console.log(error);
        }
    }
}

module.exports = CarritoFirebaseDao;