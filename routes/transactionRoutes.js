// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos Express.
const express = require('express');

// Creamos el router.
const router = express.Router();

// Importamos el controlador de transacciones.
const transactionController =
    require('../controllers/transactionController');


// ============================================================
// RUTAS
// ============================================================

// Ejecutar una transacción exitosa.
router.post(
    '/usuario-pedido',
    transactionController.createUserWithOrder
);

// Probar rollback.
router.post(
    '/rollback',
    transactionController.testRollback
);


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = router;