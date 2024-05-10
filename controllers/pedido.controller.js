const { createPedidoMongo, getPedidoMongo, getPedidosMongo, updatePedidoMongo, deletePedidoMongo, getComprador, getVendedor, getLibros } = require("../actions/pedido.actions");
const { getPropietario, deleteLibroMongo } = require("../actions/libro.actions")
const { getUsuarioMongo, updateUsuarioMongo } = require("../actions/usuarios.actions")
const mongoose = require('mongoose');

async function createPedido(datos) {
    try {
        if (datos.usuarioVendedor) {
            throw new Error("No puedes especificar el propietario del pedido");
        }
        if (datos.estado) {
            throw new Error("No puedes especificar el estado al crear el pedido");
        }
        // Validar que datos.libros contenga al menos un libro
        if (!datos.libros || datos.libros.length === 0) {
            throw new Error("Debe especificar al menos un libro en el pedido");
        }

        // Obtener el propietario del primer libro
        const propietario = await getPropietario(datos.libros[0]);
        console.log(propietario);
        // Verificar que el propietario sea el mismo para todos los libros en la lista
        const propietariosPromesas = datos.libros.map(libro => getPropietario(libro));
        const propietarios = await Promise.all(propietariosPromesas);
        console.log(propietarios);

        if (propietarios.some(prop => prop.toString() !== propietario.toString())) {
            throw new Error("El propietario no es el mismo para todos los libros en la lista");
        }
        const newdatos = { ...datos, usuarioVendedor: propietario };
        const pedidoCreado = await createPedidoMongo(newdatos);
        return pedidoCreado;
    } catch (error) {
        console.error('Error al crear pedido:', error);
        throw new Error('Error al crear pedido');
    }
}

async function readPedido(query) {
    try {
        const filtros = { ...query, borrado: false };
        const pedido = await getPedidoMongo(filtros);
        return pedido != null ? pedido.toObject() : null;
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

async function updatePedido(datos, usuario) {
    try {
        const { _id, ...cambios } = datos;
        typeof (_id)
        const comprador = await getComprador(_id); // Obtener el comprador
        if (usuario === comprador.toString()) { // Comparar el usuario con el comprador
            // Mostrar el comprador en la consola para depuración
            if (cambios.estado === 'completado' || cambios.estado === 'pendiente') { // Verificar el estado
                console.log("Entro");
                throw new Error('El estado proporcionado no es válido');
            }
        }
        const pedidoActualizado = await updatePedidoMongo(_id, cambios);
        const vendedor = await getVendedor(_id);
        if (usuario == vendedor) {
            if (['completado'].includes(cambios.estado)) {
                const librosPedido = await getLibros(_id);
                await Promise.all(librosPedido.map(libro => deleteLibroMongo(libro._id)));
                const user = await getUsuarioMongo(new mongoose.Types.ObjectId(usuario));
                let librosUsuario = user.libros; // Cambio a let

                librosUsuario = librosUsuario.filter(libroUsuario => !librosPedido.some(libroPedido => libroPedido.toString() === libroUsuario.toString()));
                await updateUsuarioMongo(usuario, { libros: librosUsuario });
            }
        }
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
