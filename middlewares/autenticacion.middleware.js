const jwt = require("jsonwebtoken");

async function validarToken(req, res, next) {
    const accesToken = req.headers['authorization'];
    if (!accesToken) {
        return res.send("No se suministro ningún token de acceso autorizado");
    }
    jwt.verify(accesToken, process.env.SECRET, (err, user) => {
        if (err) {
            res.send('Acceso denegado, el token no existe o expiro');
        } else {
            req.usuarioId = user.usuarioId;
            next();
        }
    });
}

module.exports = {
    validarToken
}