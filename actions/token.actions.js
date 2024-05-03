const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generarToken(usuario){
    const payload = { correo: usuario.correo }; // Crear un objeto con el correo del usuario
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '5m'});
}

module.exports = {
    generarToken
};