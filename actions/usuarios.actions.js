const Usuario = require("../models/usuario.model");
const argon2 = require('argon2');

async function getUsuariosMongo(filtros) {
    const cantidadUsuarios = await Usuario.countDocuments(filtros);
    const usuariosFiltrados = await Usuario.find(filtros);
    return {
        resultados: usuariosFiltrados,
        // paginaMax: cantidadUsuarios / 20,
        // paginaActual: 1,
        cantidadUsuarios: cantidadUsuarios
    };
}

async function getUsuarioMongo(filtros) {
    const usuarioFiltrado = await Usuario.findOne(filtros);
    return usuarioFiltrado;
}

async function createUsuarioMongo(datos) {
    datos.password = await argon2.hash(datos.password, {type: argon2.argon2id});
    console.log(datos.password)
    const UsuarioCreado = await Usuario.create(datos);

    return UsuarioCreado;
}

async function updateUsuarioMongo(id, cambios) {
    const resultado = await Usuario.findByIdAndUpdate(id, cambios);

    return resultado
}

async function deleteUsuarioMongo(id) {
    const resultado = await Usuario.findByIdAndDelete(id);

    return resultado;
}

async function addLibro(idUsuario, idLibro) {
    try {
        // Buscar el usuario por su ID
        const usuario = await Usuario.findById(idUsuario);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        // Agregar el ID del libro a la lista de libros del usuario
        usuario.libros.push(idLibro);
        // Guardar los cambios en la base de datos
        await usuario.save();
        return usuario;
    } catch (error) {
        throw new Error('Error al añadir el libro al usuario');
    }
}


module.exports = {
    createUsuarioMongo,
    getUsuarioMongo,
    getUsuariosMongo,
    updateUsuarioMongo,
    deleteUsuarioMongo,
    addLibro
};