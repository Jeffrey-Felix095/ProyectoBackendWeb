const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({});
})

const rutasUsuario = require("./routes/usuario.route")
app.use('/usuario', rutasUsuario);

const rutasLibro = require("./routes/libro.route")
app.use('/libro', rutasLibro);

const rutasPedido = require("./routes/pedido.route")
app.use('/pedido', rutasPedido);

const rutasAuth = require("./routes/autenticacion.route")
app.use('/auth', rutasAuth);



mongoose.connect(`mongodb+srv://${process.env.USERMONGO}:${process.env.PASSWORDMONGO}@cluster0.nd8lg0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
app.listen(8080);