const { createPedidoMongo, getPedidoMongo, getPedidosMongo, updatePedidoMongo, deletePedidoMongo } = require("../actions/pedido.actions");

async function createPedido(datos) {
    try {
        const usuarioCreado = await createPedidoMongo(datos);
        return usuarioCreado;
    } catch (error) {
        console.error('Error al crear pedido:', error);
        throw new Error('Error al crear pedido');
    }
}

async function readPedido(query) {
    try {
        const filtros = { ...query, borrado: false };
        const pedido = await getPedidoMongo(filtros);
        return pedido != null ? pedido.toObject(): null;
    } catch (error) {
        console.error('Error al obtene pedido:', error);
        throw new Error('Error al obtener pedido');
    }
}

//
async function readPedidos(query) {
    try {
        const filtros = { ...query, borrado: false };
        const resultadosLista = await getPedidosMongo(filtros);
        return resultadosLista;
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        throw new Error('Error al obtener pedidos');
    }
}

async function readAllPedidos(query) {
    try {
        const resultadosLista = await getAllPedidosMongo(query);
        return resultadosLista;
    } catch (error) {
        console.error('Error al obtener todos los pedidos:', error);
        throw new Error('Error al obtener todos los pedidos');
    }
}

async function updatePedido(datos) {
    try {
        const { _id, ...cambios } = datos;
        const pedidoActualizado = await updatePedidoMongo(_id, cambios);
        return pedidoActualizado;
    } catch (error) {
        console.error('Error al actualizar pedido:', error);
        throw new Error('Error al actualizar pedido');
    }
}

async function deletePedido(id) {
    try {
        const idPedidoEliminado = await deletePedidoMongo(id);
        return idPedidoEliminado;
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        throw new Error('Error al eliminar pedido');
    }
}

module.exports = {
    readAllPedidos,
    readPedidos,
    readPedido,
    createPedido,
    updatePedido,
    deletePedido
};
