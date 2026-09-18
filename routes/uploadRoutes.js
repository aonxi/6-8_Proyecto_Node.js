// ============================================================
// RUTAS DE SUBIDA DE ARCHIVOS
// ============================================================

const express = require('express');

// Importamos el middleware de autenticación JWT.
const authMiddleware = require('../middlewares/authMiddleware');

// Importamos la configuración de Multer.
const upload = require('../middlewares/uploadMiddleware');

// Importamos el controlador.
const uploadController = require('../controllers/uploadController');

// Creamos el router.
const router = express.Router();

// ============================================================
// POST /upload
// ============================================================

// Esta ruta:
// 1. Exige un JWT válido.
// 2. Recibe un archivo mediante el campo "archivo".
// 3. Valida tipo y tamaño mediante Multer.
// 4. Guarda el archivo en /uploads.
// 5. Devuelve información del archivo.

// Importante:
// En Postman el campo debe llamarse exactamente "archivo".
router.post(
    '/upload',
    authMiddleware,
    upload.single('archivo'),
    uploadController.uploadFile
);

// Exportamos las rutas.
module.exports = router;