const { createPedidoMongo, getPedidoMongo, getPedidosMongo, updatePedidoMongo, deletePedidoMongo, getComprador, getVendedor, getLibros } = require("../actions/pedido.actions");
const { getPropietario, deleteLibroMongo, getLibroMongo } = require("../actions/libro.actions")
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
        librosPedido = datos.libros;
        if (!librosPedido || librosPedido.length === 0) {
            throw new Error("Debe especificar al menos un libro en el pedido");
        }

        // Obtener el propietario del primer libro
        const propietario = await getPropietario(librosPedido[0]);
        if (propietario.toString() === datos.usuarioComprador) {
            throw new Error("El dueño del libro no puede comprar su propio libro");
        }
        const librosVerificados = await Promise.all(librosPedido.map(libro => getLibroMongo(new mongoose.Types.ObjectId(libro))));

        if (librosVerificados.some(libro => libro === null)) {
            throw new Error('Al menos uno de los libros ingresados no existe.');
        }

        // Verificar que el propietario sea el mismo para todos los libros en la lista
        const propietariosPromesas = datos.libros.map(libro => getPropietario(libro));
        const propietarios = await Promise.all(propietariosPromesas);

        if (propietarios.some(prop => prop.toString() !== propietario.toString())) {
            throw new Error("El propietario no es el mismo para todos los libros en la lista");
        }

        const totalPedido = librosVerificados.reduce((acum, libro) => acum + libro.precio, 0);

        const newdatos = { ...datos, total: totalPedido, usuarioVendedor: propietario };
        const pedidoCreado = await createPedidoMongo(newdatos);
        return pedidoCreado;
    } catch (e) {
        throw e;
    }
}

async function readPedido(query) {
    try {
        const filtros = { ...query, borrado: false };
        const pedido = await getPedidoMongo(filtros);
        return pedido != null ? pedido.toObject() : null;
    } catch (e) {
        throw e;
    }
}

//
async function readPedidos(query) {
    try {
        const filtros = { ...query, borrado: false };
        const resultadosLista = await getPedidosMongo(filtros);
        return resultadosLista;
    } catch (e) {
        throw e;
    }
}

async function readAllPedidos(query) {
    try {
        const resultadosLista = await getAllPedidosMongo(query);
        return resultadosLista;
    } catch (e) {
        throw e;
    }
}

async function updatePedido(datos, usuario) {
    try {
        const { _id, ...cambios } = datos;
        const comprador = await getComprador(_id);
        if (usuario === comprador.toString()) { // Comparar el usuario con el comprador
            if (cambios.estado === 'completado' || cambios.estado === 'pendiente') { // Verificar el estado
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
                let librosUsuario = user.libros;

                librosUsuario = librosUsuario.filter(libroUsuario => !librosPedido.some(libroPedido => libroPedido.toString() === libroUsuario.toString()));
                await updateUsuarioMongo(usuario, { libros: librosUsuario });
            }
        }
        return pedidoActualizado;
    } catch (e) {
        throw e;
    }
}

async function deletePedido(id) {
    try {
        const idPedidoEliminado = await deletePedidoMongo(id);
        return idPedidoEliminado;
    } catch (e) {
        throw e;
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
