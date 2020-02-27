const { Strategy, ExtractJwt } = require('passport-jwt');
const Usuario = require('../models/usuario.model');


const opciones = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'mySecretKey'
}

const Estrategia = new Strategy(opciones, (payload, done) => {
    try {
        const usuario = Usuario.findById(payload._id)
        if (usuario)
            return done(null, usuario);
        return done(null, false);
    } catch (error) {
        console.log(error);
    }

});

module.exports = Estrategia;