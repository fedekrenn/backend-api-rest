const twilio = require('twilio');

const { loggerError, logger } = require('../utils/logger');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const adminPhone = process.env.ADMIN_PHONE;

const client = twilio(accountSid, authToken);

async function handleSubmitWhatsapp(msg) {
    try {
        const message = await client.messages.create({
            body: msg,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${adminPhone}`
        });
        logger.info('Whatsapp enviado correctamente')
    } catch (error) {
        loggerError.error(error);
    }
}

async function handleSubmitSMS(msg, phone) {
    try {
        const message = await client.messages.create({
            body: msg,
            from: '+13205253112',
            to: `+54${phone}`
        });
        logger.info(`SMS enviado correctamente al número: ${phone} - Tener en cuenta que Twilio solo permite enviar SMS a números verificados previamente`)
    } catch (error) {
        error.code === 21608 && loggerError.error(`El número ${phone} no está validado desde mi cuenta de prueba twilio, por lo que no te llegará, pero funciona ok`)
    }
}

module.exports = { handleSubmitWhatsapp, handleSubmitSMS };