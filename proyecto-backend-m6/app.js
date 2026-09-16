// Importamos las dependencias requeridas
require('dotenv').config(); // Carga las variables de entorno (Tarea PLUS)
const express = require('express');
const path = require('path');

// Importamos nuestros módulos personalizados
const router = require('./routes/router'); // Enrutador externo (Tarea PLUS)
const logger = require('./middlewares/logger'); // Middleware de persistencia en log.txt

// Inicializamos la aplicación Express
const app = express();

// --- 1. REGISTRO (MIDDLEWARE) ---
// Debe ir primero para registrar absolutamente TODAS las peticiones
app.use(logger);

// --- 2. RUTAS DINÁMICAS ---
// Conectamos todas las rutas definidas en router.js (Tienen prioridad)
app.use('/', router);

// --- 3. ARCHIVOS ESTÁTICOS ---
// Si la ruta no existe arriba, Express buscará en la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// --- LEVANTAR SERVIDOR ---
// Configuramos el puerto desde .env o usamos el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
    // La rúbrica exige imprimir la frase "Servidor iniciado"
    console.log(`Servidor iniciado. Escuchando en http://localhost:${PORT}`);
});