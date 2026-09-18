// ============================================================
// CONTROLADOR DE SUBIDA DE ARCHIVOS
// ============================================================

// Este controlador recibe el archivo que Multer procesó
// y devuelve una respuesta JSON estandarizada.
const uploadFile = (req, res) => {

    // Verificamos que efectivamente se haya recibido un archivo.
    if (!req.file) {
        const error = new Error(
            'No se recibió ningún archivo.'
        );

        error.statusCode = 400;

        throw error;
    }

    // Construimos la respuesta con información útil del archivo.
    const archivo = {
        nombre: req.file.filename,
        nombreOriginal: req.file.originalname,
        tipo: req.file.mimetype,
        tamaño: req.file.size,
        url: `/uploads/${req.file.filename}`
    };

    // Respondemos utilizando el formato estándar del proyecto.
    res.status(201).json({
        status: 'success',
        message: 'Archivo subido correctamente.',
        data: archivo
    });
};

// Exportamos el controlador.
module.exports = {
    uploadFile
};