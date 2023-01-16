const contenedorCarritosMongo = require('../../class/contenedorCarritos/contenedorCarritosMongo');
const { CarritosModel } = require('../../model/carritosModel');

const { loggerError } = require('../../utils/logger');

class CarritoMongoDao extends contenedorCarritosMongo {
    constructor() {
        super();
    }

    async getAll() {
        try {
            const carritos = await CarritosModel.find();

            return carritos;
        } catch (error) {
            loggerError.error(error);
        }
    }
}

module.exports = CarritoMongoDao;