const mongoose = require("mongoose");

const schemaLibro = new mongoose.Schema({
    nombre: {type: String, required: true},
    genero: {type: String, required: true},
    fechaPublicacion: {type: Date, required: true},
    casaEditorial: {type: String, required: true},
    autor: {type: String, required: true},
    precio: { type: Number, required: true },
    propietario: {type: mongoose.Schema.Types.ObjectId},
    borrado: {type: Boolean, default: false}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Libro', schemaLibro);

module.exports = Model;