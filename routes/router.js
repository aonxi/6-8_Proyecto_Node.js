// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos Express.
const express = require('express');

// Creamos el router principal.
const router = express.Router();

// Importamos el controlador principal de M6.
const mainController = require('../controllers/mainController');

// Importamos las rutas de usuarios.
const userRoutes = require('./userRoutes');

// Importamos las rutas de pedidos.
const orderRoutes = require('./orderRoutes');

// Importamos las rutas de transacciones.
const transactionRoutes = require('./transactionRoutes');

// Importamos las rutas de consultas SQL manuales.
const sqlRoutes = require('./sqlRoutes');


// ============================================================
// RUTAS PRINCIPALES DE M6
// ============================================================

// Ruta principal que devuelve HTML.
router.get('/', mainController.getHome);

// Ruta de estado que devuelve JSON.
router.get('/status', mainController.getStatus);


// ============================================================
// RUTAS DE LA API
// ============================================================

// Rutas CRUD de usuarios.
router.use('/usuarios', userRoutes);

// Rutas CRUD de pedidos.
router.use('/pedidos', orderRoutes);

// Rutas de transacciones.
router.use('/transacciones', transactionRoutes);

// Registramos las rutas de SQL manual.
router.use('/sql', sqlRoutes);


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = router;