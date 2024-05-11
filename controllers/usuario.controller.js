const { createUsuarioMongo, getUsuarioMongo, getUsuariosMongo, deleteUsuarioMongo, updateUsuarioMongo } = require("../actions/usuarios.actions");

async function createUsuario(datos) {
    try {
        const usuarioCreado = await createUsuarioMongo(datos);
        return usuarioCreado;
    } catch (e) {
        throw e;
    }
}

async function readUsuario(query) {
    try {
        const filtros = { ...query, borrado: false };
        const usuario = await getUsuarioMongo(filtros);
        return usuario.toObject();
    } catch (e) {
        throw e;
    }
}
//
async function readUsuariosFiltrados(query) {
    try {
        const filtros = { ...query, borrado: false };
        const resultadosUsuariosFiltrados = await getUsuariosMongo(filtros);
        return resultadosUsuariosFiltrados;
    } catch (e) {
        throw e;
    }
}

async function readAllUsuariosFiltrados(query) {
    try {
        const resultadosUsuariosFiltrados = await getUsuariosMongo(query);
        return resultadosUsuariosFiltrados;
    } catch (e) {
        throw e;
    }
}

async function updateUsuario(datos) {
    try {
        const { _id, ...cambios } = datos;
        const usuarioActualizado = await updateUsuarioMongo(_id, cambios);
        return usuarioActualizado;
    } catch (e) {
        throw e;
    }
}

async function deleteUsuario(id) {
    try {
        const usuarioEliminado = await deleteUsuarioMongo(id);
        return usuarioEliminado;
    } catch (e) {
        throw e;
    }
}


module.exports = {
    readUsuariosFiltrados,
    readAllUsuariosFiltrados,
    readUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
