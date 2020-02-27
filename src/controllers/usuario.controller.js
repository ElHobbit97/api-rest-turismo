const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const usuarioController = {};

//Registro de usuarios nuevos
usuarioController.registrarUsuario = async (req, res) => {
    console.log(req.body);
    const errores = [];
    const { nombre, apellido, email, celular, contrasenha, confirmarContrasenha, fechaNacimiento, sexo } = req.body;
    if (contrasenha != confirmarContrasenha) //verificacion de coincidencia en contraseñas
        errores.push({ texto: 'Las contraseñas no coinciden' });
    if (contrasenha.length < 4) //verificacion para que las contraseñas superen los 4 caracteres
        errores.push({ texto: 'La contraseña debe tener minimo 4 caracteres' });
    if (errores.length > 0) //Si existen errores se envian
        res.status(500).json(errores);
    else { //Si no existen errores se procede a guardar el usuario
        const usuarioEmail = await Usuario.findOne({ email: email });
        if (usuarioEmail) //Se verifica si ya existe un usuario con ese email
            return res.status(500).json({ error: 'El usuario ya existe' });
        else {
            const usuario = new Usuario({
                nombre,
                apellido,
                email,
                celular,
                contrasenha,
                fechaNacimiento,
                sexo
            });

            usuario.contrasenha = await usuario.encriptarContraseña(contrasenha);
            try {
                const usuarioNuevo = await usuario.save();
                const token = jwt.sign({ _id: usuarioNuevo._id }, config.jwtSecret, { expiresIn: 60 * 60 * 24 });
                return res.status(200).json({ mensaje: 'Usuario registrado con exito', usuarioNuevo, token });
            } catch (error) {
                return res.status(500).json({ mensaje: `Error al guardar el usuario` });
            }
        }
    }
}

//Iniciar sesion desde el servidor
usuarioController.ingresar = async (req, res) => {
    const { email, contrasenha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json('No existe el usuario');

    const pass = await usuario.compararContraseña(contrasenha);
    if (!pass) return res.status(401).json({ auth: false, mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ _id: usuario._id }, config.jwtSecret, { expiresIn: 60 * 60 * 24 });
    return res.status(200).json({ token });
}

//Envia los datos del perfil de usuario
usuarioController.getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuarioId);
        if (!usuario) return res.status(404).json({ mensaje: 'No se encontro el usuario' });
        return res.status(200).json({ usuario });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al buscar el ususario' });
    }
}

//Cerrar sesion
usuarioController.cerrarSesion = (req, res) => {
    return res.status(200).json({ auth: false, token: null });
}

//Actualizar informacion de usuario
usuarioController.actualizarUsuario = async (req, res) => {
    const { nombre, apellido, celular, fechaNacimiento, sexo } = req.body;
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.usuarioId, {
            nombre,
            apellido,
            celular,
            fechaNacimiento,
            sexo
        }, { new: true });
        return res.status(200).json({ mensaje: 'Usuario actualizado', usuarioActualizado });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al actualizar' });
    }
}

module.exports = usuarioController;