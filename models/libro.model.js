const mongoose = require("mongoose");

const schemaLibro = new mongoose.Schema({
    serial: {type: Number, required: true},
    nombre: {type: String, required: true},
    genero: {type: String, required: true},
    fechaPublicacion: {type: Date, required: true},
    casaEditorial: {type: String, required: true},
    autor: {type: String, required: true},
    propietario: {type: mongoose.Schema.Types.ObjectId},
    borrado: {type: Boolean}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Libro', schemaLibro);

module.exports = Model;