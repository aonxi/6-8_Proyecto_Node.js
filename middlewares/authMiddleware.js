// ============================================================
// IMPORTACIÓN
// ============================================================

// Importamos jsonwebtoken para verificar los tokens JWT.
const jwt = require('jsonwebtoken');


// ============================================================
// MIDDLEWARE DE AUTENTICACIÓN
// ============================================================

// Este middleware verifica que la petición tenga
// un token JWT válido antes de permitir el acceso.
const authMiddleware = (req, res, next) => {

    // Obtenemos el encabezado Authorization de la petición.
    const authorization = req.headers.authorization;

    // Verificamos que exista el encabezado.
    if (!authorization) {

        return res.status(401).json({
            status: 'error',
            message: 'Token de autenticación requerido.',
            data: null
        });
    }

    // Verificamos que tenga el formato:
    // Authorization: Bearer TOKEN
    const partes = authorization.split(' ');

    // Debemos recibir exactamente dos partes:
    // "Bearer" y el token.
    if (
        partes.length !== 2 ||
        partes[0] !== 'Bearer' ||
        !partes[1]
    ) {

        return res.status(401).json({
            status: 'error',
            message: 'Formato de autorización inválido. Use Bearer <token>.',
            data: null
        });
    }

    // Extraemos únicamente el token.
    const token = partes[1];

    try {

        // Verificamos que el token:
        // 1. Haya sido firmado con nuestro JWT_SECRET.
        // 2. No esté manipulado.
        // 3. No esté expirado.
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardamos la información del usuario autenticado
        // para que pueda ser utilizada por las siguientes funciones.
        req.user = decoded;

        // Permitimos que la petición continúe.
        next();

    } catch (error) {

        // Si el token es inválido o está expirado,
        // rechazamos la petición.
        return res.status(401).json({
            status: 'error',
            message: 'Token inválido o expirado.',
            data: null
        });
    }
};


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = authMiddleware;