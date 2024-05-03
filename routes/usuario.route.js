const express = require('express')
const router = express.Router();
const { readUsuariosFiltrados, readUsuario, createUsuario, updateUsuario, deleteUsuario } = require("../controllers/usuario.controller");
const { respondWithError } = require('../utils/functions');
const { validarToken } = require("../middlewares/autenticacion.middleware");


//Se usa solo para las busquedas
async function GetUsuario(req, res) {
    try {
        // Llamada al controlador con el ID del libro
        const resultadosBusqueda = await readUsuario(req.params);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        res.status(500).json({ msg: "" })
    }
}
//6633b7597019e3630c7072a9
//Se usa solo para las busquedas
async function GetUsuarios(req, res) {
    try {
        // llamada a controlador con los filtros
        const resultadosBusqueda = await readUsuariosFiltrados(req.query);
        console.log(resultadosBusqueda);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        res.status(500).json({ msg: "" })
    }
}

//No requiere autenticación
async function PostUsuario(req, res) {
    try {
        // llamada a controlador con los datos
        await createUsuario(req.body);

        res.status(200).json({
            mensaje: "Usuario creado con exito. 👍"
        })
    } catch (e) {
        respondWithError(res, e);
    }
}

/// de aquí para abajo requiere de autenticacion
async function PatchUsuarios(req, res) {
    try {
        // llamada a controlador con los datos
        updateUsuario(req.body);

        res.status(200).json({
            mensaje: "Usuario modificado con exito. 👍"
        })
    } catch (e) {
        respondWithError(res, e);
    }
}


async function DeleteUsuarios(req, res) {
    try {
        // llamada a controlador con los datos
        deleteUsuario(req.params.id);

        res.status(200).json({
            mensaje: "Usuario borrado con exito. 👍"
        })
    } catch (e) {
        respondWithError(res, e);
    }
}
router.get("/", GetUsuarios);
router.get("/:_id", GetUsuario);
router.post("/", PostUsuario);
router.patch("/:id", PatchUsuarios);
router.delete("/:id", DeleteUsuarios);


module.exports = router;