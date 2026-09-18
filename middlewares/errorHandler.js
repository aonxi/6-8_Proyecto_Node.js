// ============================================================
// MIDDLEWARE CENTRALIZADO DE ERRORES
// ============================================================

// Middleware encargado de capturar los errores de la aplicación.
const errorHandler = (error, req, res, next) => {

    // Mostramos el error en la consola para facilitar la depuración.
    console.error('❌ Error:', error.message);

    // Por defecto utilizamos el código indicado por el servicio.
    // Si no existe, utilizamos 500 como error interno del servidor.
    let statusCode = error.statusCode || 500;

    // Multer utiliza el código LIMIT_FILE_SIZE cuando el archivo
    // supera el tamaño máximo configurado.
    if (error.code === 'LIMIT_FILE_SIZE') {
        statusCode = 400;
        error.message = 'El archivo supera el tamaño máximo permitido de 5 MB.';
    }

    // Respondemos siempre utilizando el formato JSON de la API.
    res.status(statusCode).json({
        status: 'error',
        message: error.message || 'Error interno del servidor.',
        data: null
    });
};


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = errorHandler;