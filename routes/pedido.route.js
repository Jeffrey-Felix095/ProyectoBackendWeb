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
        res.status(500).json({ msg: "Error al obtener pedidos" })
    }
}

async function GetPedidos(req, res) {
    try {
        const usuarioId = req.usuarioId;
        console.log(usuarioId);
        const filtros = {
            ...req.query, $or: [
                { usuarioComprador: usuarioId },
                { usuarioVendedor: usuarioId }
            ]
        };
        console.log(usuarioId);
        const resultadosBusqueda = await readPedidos(filtros);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        res.status(500).json({ msg: "Error al obtener pedidos" })
    }
}

async function GetPedido(req, res) {
    try {
        const resultadosBusqueda = await readPedido(req.params);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch (e) {
        res.status(500).json({ msg: `Error al obtener pedido: ${req.params._id}` })
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
        respondWithError(res, e);
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
        respondWithError(res, e);
    }
}


async function DeletePedido(req, res) {
    try {
        // llamada a controlador con los datos
        deletePedido(req.params.id);

        res.status(200).json({
            mensaje: "El pedido fue eliminado con exito. 👍"
        })
    } catch (e) {
        respondWithError(res, e);
    }
}

router.get("/", validarToken, GetPedidos);
router.get("/All/", GetAllPedidos);
router.get("/", validarToken, GetPedido);
router.post("/", validarToken, PostPedido);
router.patch("/:_id", validarToken, PatchPedido);
router.delete("/:_id", validarToken, DeletePedido);


module.exports = router;