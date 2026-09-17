// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos Express.
const express = require('express');

// Creamos el router.
const router = express.Router();

// Importamos el controlador SQL.
const sqlController = require('../controllers/sqlController');


// ============================================================
// RUTAS
// ============================================================

// Ejecutar una consulta SQL manual.
router.get(
    '/usuarios',
    sqlController.getUsersWithRawSQL
);


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = router;