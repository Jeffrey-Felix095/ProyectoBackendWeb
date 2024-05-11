const Pedido = require("../models/pedido.model");

async function getPedidosMongo(filtros) {
    const cantidadPedidos = await Pedido.countDocuments(filtros);
    const pedidosFiltrados = await Pedido.find(filtros);

    return {
        resultados: pedidosFiltrados,
        cantidadPedidos: cantidadPedidos
    };
}

async function getPedidoMongo(filtros) {
    const pedidoFiltrado = await Pedido.findOne(filtros);
    return pedidoFiltrado;
}

async function createPedidoMongo(datos) {
    const pedidoCreado = await Pedido.create(datos);
    return pedidoCreado;
}

async function updatePedidoMongo(id, cambios) {
    const resultado = await Pedido.findByIdAndUpdate(id, cambios);
    return resultado
}

async function deletePedidoMongo(id) {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
        throw new Error('Pedido no encontrado');
    }
    pedido.borrado = true;
    await pedido.save();
    return pedido._id;
}

async function getComprador(id){
    const pedido = await Pedido.findById(id);
    return pedido.usuarioComprador;
}

async function getVendedor(id){
    const pedido = await Pedido.findById(id);
    return pedido.usuarioVendedor;
}

async function getLibros(id){
    const pedido = await Pedido.findById(id);
    return pedido.libros;
}
module.exports = {
    createPedidoMongo,
    getPedidosMongo,
    getPedidoMongo,
    updatePedidoMongo,
    deletePedidoMongo,
    getComprador,
    getVendedor,
    getLibros,
};