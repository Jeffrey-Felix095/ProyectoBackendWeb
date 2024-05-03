const express = require('express')
const router = express.Router();
const { loginUsuario } = require("../controllers/autenticacion.controller");
const { respondWithError } = require('../utils/functions');

async function AutenticarUsuario(req, res) {
    try {
        // llamada a controlador con los filtros
        const tokenAndUser = await loginUsuario(req.body);
        res.status(200).header('authorization', tokenAndUser.token).json({
            token: tokenAndUser.token,
            idUsuario: tokenAndUser.usuario._id,
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}

router.post("/", AutenticarUsuario);



module.exports = router;