const mongoose = require("mongoose");

const schemaUsuario = new mongoose.Schema({
  cc: { type: Number, required: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo: { type: String, required: true, unique:[true, "Este correo ya esta en uso"]  },
  password: { type: String, required: true },
  libros: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libro', // Referencia al modelo de Libro.
  }],
  borrado: { type: Boolean, default: false}
}, {
  versionKey: false,
  timestamps: true
});

const Model = mongoose.model('Usuario', schemaUsuario);

module.exports = Model;