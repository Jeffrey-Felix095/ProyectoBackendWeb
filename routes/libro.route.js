const express = require('express')
const router = express.Router();
const { readLibro, readLibrosFiltrados, createLibro, updateLibro, deleteLibro, readAllLibrosFiltrados } = require("../controllers/libro.controller");
const { respondWithError } = require('../utils/functions');
const { validarToken } = require("../middlewares/autenticacion.middleware");

async function GetAllLibros(req, res) {
    try {
        const resultadosBusqueda = await readAllLibrosFiltrados(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al obtener todos los libros: ${req.params._id}`,
            err: err.msg,
        })
    }
}

async function GetLibros(req, res) {
    try {
        // llamada a controlador con los filtros
        const resultadosBusqueda = await readLibrosFiltrados(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al obtener libros solicitados}`,
            err: err.msg,
        })
    }
}

async function GetLibro(req, res) {
    try {
        // llamada a controlador con los filtros
        const resultadosBusqueda = await readLibro(req.params);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al obtener el libro solicitado`,
            err: err.msg,
        })
    }
}

// de aqui para abajo requiere de autenticacion
async function PostLibro(req, res) {
    try {
        const usuarioId = req.usuarioId;
        const filtros = { ...req.body, propietario: usuarioId };
        await createLibro(filtros);

        res.status(200).json({
            mensaje: " Libro creado con exito. 👍"
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al crear el libro`,
            err: err.msg,
        })
    }
}

async function GetMyBooks(req, res) {
    try {
        // El ID del usuario se puede acceder desde req.usuarioId después de pasar por el middleware
        const usuarioId = req.usuarioId;

        const filtros = { ...req.query, propietario: usuarioId };
        const resultadosBusqueda = await readLibrosFiltrados(filtros);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al obtener los libros del usuario`,
            err: err.msg,
        })
    }
}
async function PatchLibros(req, res) {
    try {
        // llamada a controlador con los datos

        await updateLibro(req.body);

        res.status(200).json({
            mensaje: "Libro modificado con exito. 👍"
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al modificar el libro especificado`,
            err: err.msg,
        })
    }
}


async function DeleteLibros(req, res) {
    try {
        // llamada a controlador con los datos
        await deleteLibro(req.params._id);

        res.status(200).json({
            mensaje: "Libro borrado con exito. 👍"
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al borrar el libro`,
            err: err.msg,
        })
    }
}

router.get("/", GetLibros);
router.get("/All/", GetAllLibros);
router.get("/misLibros/:_id", validarToken, GetLibro);
router.get("/misLibros/", validarToken, GetMyBooks);
router.post("/crearLibro/", validarToken, PostLibro);
router.patch("/actualizarLibro/:_id", validarToken, PatchLibros);
router.delete("/eliminarLibro/:_id", validarToken, DeleteLibros);

module.exports = router;