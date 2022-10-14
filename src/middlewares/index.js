const authMiddleware = (req, res, next) => {
    if (req.headers.role === 'admin') {
        next();
    } else {
        res.send({ error: 'Usuario no autorizado para la tarea' }); 
    }
}

module.exports = { authMiddleware };