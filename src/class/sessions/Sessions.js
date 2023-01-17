const mongoose = require('mongoose');

const config = require('../../config/config');
const { SessModel } = require('../../model/sessModel');
const { createHash } = require('../../utils/handlePass');
const transporter = require('../../utils/mailOptions');
const { loggerError, logger } = require('../../utils/logger');

mongoose.connect(config.mongoDB.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) loggerError.error(err);
});

class ContenedorSesiones {

    async findUser(user) {
        try {
            const userFound = await SessModel.findOne({ email: user });
            return userFound;
        } catch (err) {
            loggerError.error(err);
        }
    }

    async createUser(user) {
        try {
            const isNotValidUser = await SessModel.findOne({ email: user.email });

            if (isNotValidUser) {
                loggerError.error("Se ha intentado crear una cuenta con un email ya existente");
                return { err: "El usuario ya existe" }
            } else {
                user.password = createHash(user.password);
                const newUser = new SessModel(user);
                await newUser.save();

                const mailOptions = {
                    from: 'Servidor Ecommerce',
                    to: process.env.EMAIL,
                    subject: 'Nuevo usuario registrado',
                    html: `
                    <h1>¡Nuevo usuario registrado!</h1>
                    <p>Nombre: ${user.personName}</p>
                    <p>Email: ${user.email}</p>
                    <p>Dirección: ${user.adress}</p>
                    <p>Teléfono: ${user.phone}</p>
                    <p>Edad: ${user.age}</p>`
                };

                try {
                    await transporter.sendMail(mailOptions);
                    logger.info(`El usuario ${user.personName} se ha registrado correctamente`)
                } catch (err) {
                    loggerError.error('Acá está el error: ', err);
                }

                return newUser;
            }
        } catch (err) {
            loggerError.error(err);
        }
    }
}

module.exports = ContenedorSesiones;