// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos Express para crear el router.
const express = require('express');

// Importamos el controlador de autenticación.
const authController = require('../controllers/authController');

// Creamos un router independiente para autenticación.
const router = express.Router();


// ============================================================
// LOGIN
// ============================================================

// POST /login
// Recibe email y password y devuelve un JWT válido.
router.post('/login', authController.login);


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = router;