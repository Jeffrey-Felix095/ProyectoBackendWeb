const express = require('express')
const router = express.Router();
const { readLibro, readLibrosFiltrados, createLibro, updateLibro, deleteLibro, readAllLibrosFiltrados } = require("../controllers/libro.controller");
const { respondWithError } = require('../utils/functions');
const { validarToken } = require("../middlewares/autenticacion.middleware");

async function GetAllLibros(req, res) {
    try {
        console.log("Si entro aquí");
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
        const resultadosBusqueda = await readLibro(req.params);
        console.log(resultadosBusqueda);
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
        // llamada a controlador con los datos
        await createLibro(req.body);

        res.status(200).json({
            mensaje: " Libro creado con exito. 👍"
        })
    } catch (e) {
        respondWithError(res, e);
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


router.get("/", GetLibros);
router.get("/All/", GetAllLibros);
router.get("/:_id", GetLibro);
router.post("/", PostLibro);
router.patch("/:_id", PatchLibros);
router.delete("/:_id", DeleteLibros);

module.exports = router;