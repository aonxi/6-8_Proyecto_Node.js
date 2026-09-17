// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos Express.
const express = require('express');

// Creamos el router de pedidos.
const router = express.Router();

// Importamos el controller de pedidos.
const orderController = require('../controllers/orderController');


// ============================================================
// RUTAS DE PEDIDOS
// ============================================================

// Crear un pedido.
// POST /pedidos
router.post('/', orderController.createOrder);

// Obtener todos los pedidos.
// GET /pedidos
router.get('/', orderController.getOrders);

// Obtener un pedido por ID.
// GET /pedidos/:id
router.get('/:id', orderController.getOrderById);

// Actualizar un pedido.
// PUT /pedidos/:id
router.put('/:id', orderController.updateOrder);

// Eliminar un pedido.
// DELETE /pedidos/:id
router.delete('/:id', orderController.deleteOrder);


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = router;