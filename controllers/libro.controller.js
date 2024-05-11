const { createLibroMongo, getLibroMongo, getLibrosMongo, deleteLibroMongo, updateLibroMongo, getPropietario } = require("../actions/libro.actions");
const { addLibro } = require("../actions/usuarios.actions");

async function createLibro(datos) {
    try {
        const libroCreado = await createLibroMongo(datos);
        // id usuario, id libro
        await addLibro(libroCreado.toObject().propietario, libroCreado.toObject()._id);
        return libroCreado.toObject();
    } catch (e) {
        throw e;
    }
}

async function readLibro(query) {
    try {
        const filtros = { ...query, borrado: false };
        const Libro = await getLibroMongo(filtros);
        return Libro != null ? Libro.toObject() : null;
    } catch (e) {
        throw e;
    }
}

async function readLibrosFiltrados(query) {
    try {
        const filtros = { ...query, borrado: false };
        const resultadosLibrosFiltrados = await getLibrosMongo(filtros);
        return resultadosLibrosFiltrados;
    } catch (e) {
        throw e;
    }
}

async function readAllLibrosFiltrados(query) {
    try {
        const resultadosLibrosFiltrados = await getLibrosMongo(query);
        return resultadosLibrosFiltrados;
    } catch (e) {
        throw e;
    }
}



async function updateLibro(datos) {
    try {
        const { _id, ...cambios } = datos;
        const libroActualizado = await updateLibroMongo(_id, cambios);
        return libroActualizado;
    } catch (e) {
        throw e;
    }
}

async function deleteLibro(id) {
    try {
        const libroEliminado = await deleteLibroMongo(id);
        return libroEliminado;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    readLibrosFiltrados,
    readLibro,
    createLibro,
    updateLibro,
    deleteLibro,
    readAllLibrosFiltrados,
    getPropietario
};