const { Schema, model } = require('mongoose');

const RestauranteSchema = new Schema({
    
}, {
    timestamps: true //Guarda fecha de creacion y modificiacion al documento
});

module.exports = model('Restaurante', RestauranteSchema);