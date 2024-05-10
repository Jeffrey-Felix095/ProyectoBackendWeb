function validarCC(req, res, next) {
    if (!req.body.cc || typeof req.body.cc !== 'number') {
        return res.status(400).json({ mensaje: 'El campo cc es requerido y debe ser un número.' });
    }
    next();
}

function validarNombres(req, res, next) {
    if (!req.body.nombres || typeof req.body.nombres !== 'string') {
        return res.status(400).json({ mensaje: 'El campo nombres es requerido y debe ser una cadena de texto.' });
    }
    next();
}

function validarApellidos(req, res, next) {
    if (!req.body.apellidos || typeof req.body.apellidos !== 'string') {
        return res.status(400).json({ mensaje: 'El campo apellidos es requerido y debe ser una cadena de texto.' });
    }
    next();
}

function validarCorreo(req, res, next) {
    if (!req.body.correo || typeof req.body.correo !== 'string') {
        return res.status(400).json({ mensaje: 'El campo correo es requerido y debe ser una cadena de texto.' });
    }
    next();
}

////////////////////
function validarNombre(req, res, next) {
    if (!req.body.nombre || typeof req.body.nombre !== 'string') {
        return res.status(400).json({ mensaje: 'El campo nombre es requerido y debe ser una cadena de texto.' });
    }
    next();
}

function validarGenero(req, res, next) {
    if (!req.body.genero || typeof req.body.genero !== 'string') {
        return res.status(400).json({ mensaje: 'El campo genero es requerido y debe ser una cadena de texto.' });
    }
    next();
}

function validarFechaPublicacion(req, res, next) {
    if (!req.body.fechaPublicacion || !(req.body.fechaPublicacion instanceof Date)) {
        return res.status(400).json({ mensaje: 'El campo fechaPublicacion es requerido y debe ser una fecha válida.' });
    }
    next();
}

function validarCasaEditorial(req, res, next) {
    if (!req.body.casaEditorial || typeof req.body.casaEditorial !== 'string') {
        return res.status(400).json({ mensaje: 'El campo casaEditorial es requerido y debe ser una cadena de texto.' });
    }
    next();
}

function validarAutor(req, res, next) {
    if (!req.body.autor || typeof req.body.autor !== 'string') {
        return res.status(400).json({ mensaje: 'El campo autor es requerido y debe ser una cadena de texto.' });
    }
    next();
}


//////

function validarLibros(req, res, next) {
    if (!req.body.libros || !Array.isArray(req.body.libros) || req.body.libros.length === 0) {
        return res.status(400).json({ mensaje: 'El campo libros es requerido y debe ser un array de ObjectIds.' });
    }
    next();
}

function validarMetodoPago(req, res, next) {
    if (req.body.metodoPago && typeof req.body.metodoPago !== 'string') {
        return res.status(400).json({ mensaje: 'El campo metodoPago debe ser una cadena de texto.' });
    }
    next();
}

function validarDireccionEnvio(req, res, next) {
    if (req.body.direccionEnvio && typeof req.body.direccionEnvio !== 'string') {
        return res.status(400).json({ mensaje: 'El campo direccionEnvio debe ser una cadena de texto.' });
    }
    next();
}

function validarFechaPedido(req, res, next) {
    if (req.body.fechaPedido && !(req.body.fechaPedido instanceof Date)) {
        return res.status(400).json({ mensaje: 'El campo fechaPedido debe ser una fecha válida.' });
    }
    next();
}


module.exports = {
    validarCC,
    validarNombres,
    validarApellidos,
    validarCorreo,
    validarNombre,
    validarGenero,
    validarFechaPublicacion,
    validarCasaEditorial,
    validarAutor,
    validarLibros,
    validarMetodoPago,
    validarDireccionEnvio,
    validarFechaPedido,
};
