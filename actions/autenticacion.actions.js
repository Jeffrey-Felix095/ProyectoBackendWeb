const argon2 = require("argon2");
const usuariosActions = require("./usuarios.actions");

async function login(datos) {

    try {
        const usuario = await usuariosActions.getUsuarioMongo({ correo: datos.correo });
        if (usuario == null) {
            throw new Error(`No existe un usuario con este correo: '${datos.correo}'`);
        }
        if (await argon2.verify(usuario.password, datos.password)) {
            return usuario;
        } else {
            throw new Error(`Fallo en la autenticación, verifique los datos ingresados`);
        }
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}


module.exports = {
    login
};
