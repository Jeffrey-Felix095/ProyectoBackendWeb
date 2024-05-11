const express = require('express')
const router = express.Router();
const { createPedido, readPedido, readPedidos, readAllPedidos, updatePedido, deletePedido } = require("../controllers/pedido.controller");
const { respondWithError } = require('../utils/functions');
const { validarToken } = require('../middlewares/autenticacion.middleware');

async function GetAllPedidos(req, res) {
    try {
        const resultadosBusqueda = await readAllPedidos(req.query);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al obtener pedidos` ,
            err: err.msg,
        })
    }
}

async function GetPedidos(req, res) {
    try {
        const usuarioId = req.usuarioId;
        const filtros = {
            ...req.query, $or: [
                { usuarioComprador: usuarioId },
                { usuarioVendedor: usuarioId }
            ]
        };
        const resultadosBusqueda = await readPedidos(filtros);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al obtener pedidos solicitados`,
            err: err.msg,
        })
    }
}

async function GetPedido(req, res) {
    try {
        const resultadosBusqueda = await readPedido(req.params);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al obtener pedido: ${req.params._id}`,
            err: err.msg,
        })
    }
}

async function PostPedido(req, res) {
    try {
        const usuarioId = req.usuarioId;

        const filtros = { ...req.body, usuarioComprador: usuarioId };
        await createPedido(filtros);
        res.status(200).json({
            mensaje: "El pedido se creo con exito. 👍"
        })
    } catch (e) {
        
        const mensajeError = e.message;
        res.status(500).json({
            mensaje: `${mensajeError}`,
        });
    }
}


async function PatchPedido(req, res) {
    try {
        // llamada a controlador con los datos
        const usuarioId = req.usuarioId;
        await updatePedido(req.body, usuarioId);
        res.status(200).json({
            mensaje: "El pedido fue actualizado con exito. 👍"
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al actualizar el pedido`,
            err: err.msg,
        })
    }
}


async function DeletePedido(req, res) {
    try {
        // llamada a controlador con los datos
        await deletePedido(req.params.id);

        res.status(200).json({
            mensaje: "El pedido fue eliminado con exito. 👍"
        })
    } catch (e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: `Error al eliminar el pedido`,
            err: err.msg,
        })
    }
}

router.get("/All/", GetAllPedidos);
router.get("/misPedidos/:_id", validarToken, GetPedido);
router.get("/misPedidos/", validarToken, GetPedidos);
router.post("/crearPedido/", validarToken, PostPedido);
router.patch("/actualizarPedido/:_id", validarToken, PatchPedido);
router.delete("/borrarPedido/:_id", validarToken, DeletePedido);


module.exports = router;