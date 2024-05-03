const jwt = require("jsonwebtoken");

async function validarToken(req, res, next) {
    const accesToken = req.headers['authorization'];
    console.log(req.headers['authorization']);
    if (!accesToken) {
        return res.send("No existe");
    }
    jwt.verify(accesToken, process.env.SECRET, (err, user) => {
        if (err) {
            res.send('Acceso denegado, el token no existe o expiro');
        } else {
            next();
        }
    });
}

module.exports = {
    validarToken
}