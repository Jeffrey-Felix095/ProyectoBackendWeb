const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generarToken(usuario){
    const payload = { usuarioId: usuario._id };
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '55m'});
}

module.exports = {
    generarToken
};