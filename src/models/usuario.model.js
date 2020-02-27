const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    celular: { type: String, required: true },
    contrasenha: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    sexo: { type: String, required: true }
}, {
    timestamps: true //Guarda fecha de creacion y modificiacion al documento
});

//Encriptacion de contraseña
UsuarioSchema.methods.encriptarContraseña = async contraseña => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contraseña, salt);
}

//Compara contraseñas encriptadas
UsuarioSchema.methods.compararContraseña = async function (contraseña) {
    return await bcrypt.compare(contraseña, this.contrasenha);
}

module.exports = model('Usuario', UsuarioSchema);
