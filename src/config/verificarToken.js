const jwt = require('jsonwebtoken');
const config = require('./config');

async function verificarToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, mensaje: 'No tienes permiso' });
    }
    
    const decoded = await jwt.verify(token, config.jwtSecret);
    req.usuarioId = decoded._id;
    next();
}

module.exports = verificarToken;