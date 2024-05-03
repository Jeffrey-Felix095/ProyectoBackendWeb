const { login } = require("../actions/autenticacion.actions");
const { generarToken } = require("../actions/token.actions");

async function loginUsuario(datos) {
    try {
        const usuario = await login(datos);
        const token = await generarToken(usuario);
        return {token,usuario};
    } catch (error) {
        console.error('Error al autenticar el ususario:', error);
        throw new Error('Error al autenticar el ususario');
    }
}

module.exports = {
    loginUsuario
};