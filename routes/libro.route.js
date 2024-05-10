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
        res.status(500).json({ msg: "" })
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
        res.status(500).json({ msg: "" })
    }
}

async function GetLibro(req, res) {
    try {
        // llamada a controlador con los filtros
        const resultadosBusqueda = await readLibrosFiltrados(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        res.status(500).json({ msg: "" })
    }
}

// de aqui para abajo requiere de autenticacion
async function PostLibro(req, res) {
    try {
        const usuarioId = req.usuarioId;
        console.log(usuarioId);
        const filtros = { ...req.body, propietario: usuarioId };
        await createLibro(filtros);

        res.status(200).json({
            mensaje: " Libro creado con exito. 👍"
        })
    } catch (e) {
        respondWithError(res, e);
    }
}

async function GetMyBooks(req, res) {
    try {
        // El ID del usuario se puede acceder desde req.usuarioId después de pasar por el middleware
        const usuarioId = req.usuarioId;

        const filtros = { ...req.query, propietario: usuarioId };
        console.log(usuarioId);
        const resultadosBusqueda = await readLibrosFiltrados(filtros);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        res.status(500).json({ msg: "" })
    }
}
async function PatchLibros(req, res) {
    try {
        // llamada a controlador con los datos

        updateLibro(req.body);

        res.status(200).json({
            mensaje: "Libro modificado con exito. 👍"
        })
    } catch (e) {
        respondWithError(res, e);
    }
}


async function DeleteLibros(req, res) {
    try {
        // llamada a controlador con los datos
        deleteLibro(req.params._id);

        res.status(200).json({
            mensaje: "Libro borrado con exito. 👍"
        })
    } catch (e) {
        respondWithError(res, e);
    }
}


router.get("/", validarToken, GetMyBooks);
router.get("/All/", GetAllLibros);
router.get("/:_id", validarToken, GetLibro);
router.get("/misLibros", validarToken, GetMyBooks);
router.post("/", validarToken, PostLibro);
router.patch("/:_id", validarToken, PatchLibros);
router.delete("/:_id", validarToken, DeleteLibros);

module.exports = router;