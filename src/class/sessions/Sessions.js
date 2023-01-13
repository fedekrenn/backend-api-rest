const mongoose = require('mongoose');

const config = require('../../config/config');
const { SessModel } = require('../../model/sessModel');
const { createHash } = require('../../utils/handlePass');

// const { loggerError } = require('../utils/logger');

mongoose.connect(config.mongoDB.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    // if (err) loggerError.error(err);
    if (err) console.log(err);
});

class ContenedorSesiones {

    async findUser(user) {
        try {
            const userFound = await SessModel.findOne({ email: user });
            return userFound;
        } catch (err) {
            // loggerError.error(err);
            console.log(err);
        }
    }

    async createUser(user) {
        try {
            const isNotValidUser = await SessModel.findOne({ email: user.email });

            if (isNotValidUser) {
                // loggerError.error("El usuario ya existe");
                return { err: "El usuario ya existe" }
            } else {
                user.password = createHash(user.password);
                const newUser = new SessModel(user);
                await newUser.save();
                return newUser;
            }
        } catch (err) {
            // loggerError.error(err);
            console.log(err);
        }
    }
}

module.exports = ContenedorSesiones;