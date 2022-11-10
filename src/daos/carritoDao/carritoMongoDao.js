const contenedorCarritosMongo = require('../../class/contenedorCarritos/contenedorCarritosMongo');
const { CarritosModel } = require('../../model/carritosModel');

class CarritoMongoDao extends contenedorCarritosMongo {
    constructor() {
        super();
    }

    async getAll() {
        try {
            const carritos = await CarritosModel.find();

            return carritos;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CarritoMongoDao;