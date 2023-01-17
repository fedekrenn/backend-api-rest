const { createTransport } = require('nodemailer');

const { loggerError, logger } = require('../utils/logger');

async function handleSubmitMail(user) {
    
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

    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info('Email enviado: ' + info.response);
    } catch (err) {
        loggerError.error(err);
    }
}

module.exports = handleSubmitMail;