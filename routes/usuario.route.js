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

//Se usa solo para las busquedas
async function GetUsuarios(req, res) {
    try {
        // llamada a controlador con los filtros
        const resultadosBusqueda = await readUsuariosFiltrados(req.query);
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
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al crear usuario` ,
            err: err.msg,
        })
    }
}

/// de aquí para abajo requiere de autenticacion
async function PatchUsuarios(req, res) {
    try {
        // llamada a controlador con los datos
        console.log(await updateUsuario(req.body));

        res.status(200).json({
            mensaje: "Usuario modificado con exito. 👍"
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al modificar usuario` ,
            err: err.msg,
        })
    }
}


async function DeleteUsuarios(req, res) {
    try {
        // llamada a controlador con los datos
        await deleteUsuario(req.params.id);

        res.status(200).json({
            mensaje: "Usuario borrado con exito. 👍"
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al borrar usuario`,
            err: err.msg,
        })
    }
}
//router.get("/", GetUsuarios);
//router.get("/:_id", GetUsuario);
router.post("/", PostUsuario);
router.patch("/:id", validarToken, PatchUsuarios);
router.delete("/:id", validarToken, DeleteUsuarios);


module.exports = router;