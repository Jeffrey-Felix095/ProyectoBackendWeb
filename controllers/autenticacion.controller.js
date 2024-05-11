const { login } = require("../actions/autenticacion.actions");
const { generarToken } = require("../actions/token.actions");

async function loginUsuario(datos) {
    try {
        const usuario = await login(datos);
        const token = await generarToken(usuario);
        return { token, usuario };
    } catch (e) {
        throw e;
    }
}

module.exports = {
    loginUsuario
};