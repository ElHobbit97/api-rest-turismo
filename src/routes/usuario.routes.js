const { Router } = require('express');
const router = Router();
const verificarToken = require('../config/verificarToken');
const passport = require('passport'); //Passport

const {
    registrarUsuario,
    getUsuario,
    ingresar,
    cerrarSesion,
    actualizarUsuario
} = require('../controllers/usuario.controller');

router.post('/registrar', registrarUsuario); //Registro de usuarios
router.post('/ingresar', ingresar); //Verifica las credenciales de un usuario
router.get('/perfil', verificarToken, getUsuario); //Obtiene el usuario con el id pedido
router.get('/cerrar-sesion',verificarToken, cerrarSesion); //Convertir el token a nulo
router.post('/perfil', verificarToken, actualizarUsuario); //Actualiza la informacion del usuario

//Passport
router.get('/auth', passport.authenticate('jwt',{session:false}), (req,res)=>{
    return res.send(`<h1>Hola ${req.body.email}</h1>`);
});

module.exports = router;