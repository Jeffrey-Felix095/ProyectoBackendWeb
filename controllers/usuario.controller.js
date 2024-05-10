const { createUsuarioMongo, getUsuarioMongo, getUsuariosMongo, deleteUsuarioMongo, updateUsuarioMongo } = require("../actions/usuarios.actions");

async function createUsuario(datos) {
    try {
        const usuarioCreado = await createUsuarioMongo(datos);
        return usuarioCreado;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw new Error('Error al crear usuario');
    }
}

async function readUsuario(query) {
    try {
        const filtros = { ...query, borrado: false };
        const usuario = await getUsuarioMongo(filtros);
        return usuario.toObject();
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw new Error('Error al obtener usuario');
    }
}
//
async function readUsuariosFiltrados(query) {
    try {
        const filtros = { ...query, borrado: false };
        const resultadosUsuariosFiltrados = await getUsuariosMongo(filtros);
        return resultadosUsuariosFiltrados;
    } catch (error) {
        console.error('Error al obtener usuarios filtrados:', error);
        throw new Error('Error al obtener usuarios filtrados');
    }
}

async function readAllUsuariosFiltrados(query) {
    try {
        const resultadosUsuariosFiltrados = await getUsuariosMongo(query);
        return resultadosUsuariosFiltrados;
    } catch (error) {
        console.error('Error al obtener usuarios filtrados:', error);
        throw new Error('Error al obtener usuarios filtrados');
    }
}

async function updateUsuario(datos) {
    try {
        const { _id, ...cambios } = datos;
        const usuarioActualizado = await updateUsuarioMongo(_id, cambios);
        return usuarioActualizado;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw new Error('Error al actualizar usuario');
    }
}

async function deleteUsuario(id) {
    try {
        const usuarioEliminado = await deleteUsuarioMongo(id);
        return usuarioEliminado;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw new Error('Error al eliminar usuario');
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
