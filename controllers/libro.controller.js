const { createLibroMongo, getLibroMongo, getLibrosMongo, deleteLibroMongo, updateLibroMongo } = require("../actions/libro.actions");
const { addLibro } = require("../actions/usuarios.actions");

async function createLibro(datos) {
    try {
        const libroCreado = await createLibroMongo(datos);
        // id usuario, id libro
        await addLibro(libroCreado.toObject().propietario, libroCreado.toObject()._id);
        return libroCreado.toObject();
    } catch (error) {
        console.error('Error al crear libro:', error);
        throw new Error('Error al crear libro');
    }
}

async function readLibro(query) {
    try {
        const filtros = { ...query, borrado: false };
        const Libro = await getLibroMongo(filtros);
        return Libro != null ? Libro.toObject(): null;
    } catch (error) {
        console.error('Error al obtener libro:', error);
        throw new Error('Error al obtener libros');
    }
}

async function readLibrosFiltrados(query) {
    try {
        const filtros = { ...query, borrado: false };
        const resultadosLibrosFiltrados = await getLibrosMongo(filtros);
        return resultadosLibrosFiltrados;
    } catch (error) {
        console.error('Error al obtener libros filtrados:', error);
        throw new Error('Error al obtener libros filtrados');
    }
}

async function readAllLibrosFiltrados(query) {
    try {
        const resultadosLibrosFiltrados = await getLibrosMongo(query);
        return resultadosLibrosFiltrados;
    } catch (error) {
        console.error('Error al obtener libros filtrados:', error);
        throw new Error('Error al obtener libros filtrados');
    }
}



async function updateLibro(datos) {
    try {
        const { _id, ...cambios } = datos;
        const libroActualizado = await updateLibroMongo(_id, cambios);
        return libroActualizado;
    } catch (error) {
        console.error('Error al actualizar libro:', error);
        throw new Error('Error al actualizar libro');
    }
}

async function deleteLibro(id) {
    try {
        const libroEliminado = await deleteLibroMongo(id);
        return libroEliminado;
    } catch (error) {
        console.error('Error al eliminar libro:', error);
        throw new Error('Error al eliminar libro');
    }
}

module.exports = {
    readLibrosFiltrados,
    readLibro,
    createLibro,
    updateLibro,
    deleteLibro,
    readAllLibrosFiltrados
};