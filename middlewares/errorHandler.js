// ============================================================
// MIDDLEWARE CENTRALIZADO DE ERRORES
// ============================================================

// Middleware encargado de capturar los errores de la aplicación.
const errorHandler = (error, req, res, next) => {

    // Mostramos el error en la consola para facilitar la depuración.
    console.error('❌ Error:', error.message);

    // Utilizamos el código indicado por el servicio.
    // Si no existe, usamos 500 como error interno del servidor.
    const statusCode = error.statusCode || 500;

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