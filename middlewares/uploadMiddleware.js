// ============================================================
// IMPORTACIONES
// ============================================================

// Multer se encarga de recibir y guardar archivos enviados
// mediante formularios multipart/form-data.
const multer = require('multer');

// Path permite trabajar correctamente con rutas de archivos
// independientemente del sistema operativo.
const path = require('path');

// File System permite verificar y crear la carpeta de destino.
const fs = require('fs');

// ============================================================
// CARPETA DE DESTINO
// ============================================================

// Construimos la ruta absoluta de la carpeta uploads.
// __dirname corresponde a la carpeta "middlewares".
const uploadDir = path.join(__dirname, '..', 'uploads');

// Si la carpeta uploads no existe, la creamos automáticamente.
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ============================================================
// CONFIGURACIÓN DEL ALMACENAMIENTO
// ============================================================

const storage = multer.diskStorage({
    // Indicamos dónde se guardarán los archivos.
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    // Generamos un nombre único para evitar sobrescribir archivos.
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();

        const nombreArchivo =
            `${Date.now()}-${Math.round(Math.random() * 1E9)}${extension}`;

        cb(null, nombreArchivo);
    }
});

// ============================================================
// TIPOS DE ARCHIVO PERMITIDOS
// ============================================================

// Permitimos únicamente imágenes.
const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
];

const allowedExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.webp'
];

// ============================================================
// VALIDACIÓN DEL ARCHIVO
// ============================================================

const fileFilter = (req, file, cb) => {
    // Obtenemos la extensión original del archivo.
    const extension = path.extname(file.originalname).toLowerCase();

    // Verificamos tanto el MIME como la extensión.
    const tipoPermitido = allowedMimeTypes.includes(file.mimetype);
    const extensionPermitida = allowedExtensions.includes(extension);

    if (!tipoPermitido || !extensionPermitida) {
        const error = new Error(
            'Tipo de archivo no permitido. Solo se permiten JPG, JPEG, PNG y WEBP.'
        );

        // Indicamos al manejador de errores que es un error controlado.
        error.statusCode = 400;

        return cb(error);
    }

    // Si cumple las validaciones, aceptamos el archivo.
    cb(null, true);
};

// ============================================================
// CONFIGURACIÓN FINAL DE MULTER
// ============================================================

const upload = multer({
    storage,

    // Aplicamos el filtro de tipos de archivo.
    fileFilter,

    // Tamaño máximo: 5 MB.
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// Exportamos la configuración para utilizarla
// desde las rutas de subida de archivos.
module.exports = upload;