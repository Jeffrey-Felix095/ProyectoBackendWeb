const express = require('express')
const router = express.Router();
const { createPedido, readPedido, readPedidos, readAllPedidos, updatePedido, deletePedido } = require("../controllers/pedido.controller");
const { respondWithError } = require('../utils/functions');

async function GetAllPedidos(req, res) {
    try {
        const resultadosBusqueda = await readAllPedidos(req.query);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: "Error al obtener pedidos"})
    }
}

async function GetPedidos(req, res) {
    try {
        const resultadosBusqueda = await readPedidos(req.query);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: "Error al obtener pedidos"})
    }
}

async function GetPedido(req, res) {
    try {
        const resultadosBusqueda = await readPedido(req.params);
        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: `Error al obtener pedido: ${req.params._id}`})
    }
}

async function PostPedido(req, res) {
    try {
        // llamada a controlador con los datos
        await createPedido(req.body);

        res.status(200).json({
            mensaje: "El pedido se creo con exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function PatchPedido(req, res) {
    try {
        // llamada a controlador con los datos
        updatePedido(req.body);

        res.status(200).json({
            mensaje: "El pedido fue actualizado con exito. 👍"
        })
    } catch(e) {
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
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", GetPedidos);
router.get("/All/", GetAllPedidos);
router.get("/", GetPedido);
router.post("/", PostPedido);
router.patch("/:_id", PatchPedido);
router.delete("/:_id", DeletePedido);


module.exports = router;