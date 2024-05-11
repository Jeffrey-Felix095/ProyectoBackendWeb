const Libro = require("../models/libro.model");

async function getLibrosMongo(filtros) {
    const cantidadLibros = await Libro.countDocuments(filtros);
    const librosFiltrados = await Libro.find(filtros);

    return {
        resultados: librosFiltrados,
        cantidadLibros: cantidadLibros
    };
}

async function getLibroMongo(filtros) {
    const libroFiltrado = await Libro.findOne(filtros);
    return libroFiltrado;
}

async function createLibroMongo(datos) {
    const libroCreado = await Libro.create(datos);

    return libroCreado;
}

async function updateLibroMongo(id, cambios) {
    const resultado = await Libro.findByIdAndUpdate(id, cambios);
    return resultado;
}

async function deleteLibroMongo(id) {
    const libro = await Libro.findById(id);
        if (!libro) {
            throw new Error('Libro no encontrado');
        }
        libro.borrado = true;
        await libro.save();
    return libro._id;
}

async function getPropietario(id){
    const libro = await Libro.findById(id);
    return libro.propietario;
}


module.exports = {
    createLibroMongo,
    getLibroMongo,
    getLibrosMongo,
    updateLibroMongo,
    deleteLibroMongo, 
    getPropietario
};