const argon2 = require("argon2");
const usuariosActions = require("./usuarios.actions");

async function login(datos) {
    const usuario = await usuariosActions.getUsuarioMongo({ correo: datos.correo });
    if (usuario == null) {
        throw new Error(`No existe un usuario con este correo: '${datos.correo}'`);
    }
    if (await argon2.verify(usuario.password, datos.password)) {
        console.log("usuario autenticado");
        return usuario;
    } else {
        throw new AppError(`Contraseña Incorrecta: '${datos.correo}`);
    }
}


module.exports = {
    login
};
