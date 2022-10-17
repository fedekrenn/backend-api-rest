const authMiddleware = (req, res, next) => {
    if (req.headers.role === 'admin') {
        next();
    } else {
        res.send({ error: -1, descripcion: `ruta '${req.path}' método '${req.method}' no autorizada` }); 
    }
}

module.exports = { authMiddleware };