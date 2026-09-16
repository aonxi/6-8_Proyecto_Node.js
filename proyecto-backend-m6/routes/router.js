const express = require('express');
const router = express.Router();

// Importamos el controlador que acabamos de crear
const mainController = require('../controllers/mainController');

// Conectamos las rutas exigidas por la rúbrica con sus controladores
router.get('/', mainController.getHome);
router.get('/status', mainController.getStatus);

// Exportamos el enrutador para conectarlo a la app principal
module.exports = router;