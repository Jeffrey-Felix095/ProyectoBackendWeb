const mongoose = require('mongoose');

// Definir el esquema del modelo de pedido
const pedidoSchema = new mongoose.Schema({
    usuarioComprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Referencia al modelo de Usuario
        required: true
    },
    usuarioVendedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Referencia al modelo de Usuario
        required: true
    },
    libros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro', // Referencia al modelo de Libro.
        required: true
    }],
    estado: {
        type: String,
        enum: ['pendiente', 'completado', 'cancelado'],
        default: 'pendiente'
    },
    metodoPago: String,
    direccionEnvio: String,
    fechaPedido: {
        type: Date,
        default: Date.now
    },
    borrado: {type: Boolean, default: false}
},{
    versionKey: false,
    timestamps: true
  });

// Crear el modelo de Pedido a partir del esquema
const Pedido = mongoose.model('Pedido', pedidoSchema);

// Exportar el modelo de Pedido para poder utilizarlo en otras partes de la aplicación
module.exports = Pedido;
