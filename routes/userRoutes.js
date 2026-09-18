// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos el middleware que protege las rutas mediante JWT.
const authMiddleware = require('../middlewares/authMiddleware');

// Importamos Express.
const express = require('express');

// Creamos un router independiente.
const router = express.Router();

// Importamos los controllers de usuarios.
const userController = require('../controllers/userController');


// ============================================================
// RUTAS DE USUARIOS
// ============================================================

// Crear un usuario.
// POST /usuarios
router.post('/', userController.createUser);

// ============================================================
// RUTAS PROTEGIDAS
// ============================================================

// Obtener todos los usuarios.
// GET /usuarios
router.get('/', authMiddleware, userController.getUsers);

// Obtener un usuario por ID.
// GET /usuarios/:id
router.get('/:id', authMiddleware, userController.getUserById);

// ============================================================
// ACTUALIZAR Y ELIMINAR
// ============================================================

// Actualizar un usuario.
// PUT /usuarios/:id
router.put('/:id', userController.updateUser);

// Eliminar un usuario.
// DELETE /usuarios/:id
router.delete('/:id', userController.deleteUser);


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = router;