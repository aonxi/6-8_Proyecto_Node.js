// ============================================================
// CONFIGURACIÓN
// ============================================================

// Cargamos las variables de entorno desde .env.
require('dotenv').config();

// Importamos Express.
const express = require('express');

// Importamos path para trabajar con archivos.
const path = require('path');

// Importamos nuestro router principal.
const router = require('./routes/router');

// Importamos el middleware de logs.
const logger = require('./middlewares/logger');

// Importamos la conexión Sequelize y los modelos.
// Al importar "./models", también se inicializan
// las asociaciones entre nuestros modelos.
const { sequelize } = require('./models');

// Importamos el middleware centralizado de errores.
const errorHandler = require('./middlewares/errorHandler');


// ============================================================
// INICIALIZACIÓN DE EXPRESS
// ============================================================

// Creamos la aplicación Express.
const app = express();


// ============================================================
// MIDDLEWARES
// ============================================================

// Registramos las peticiones en logs.
app.use(logger);

// Permitimos recibir información enviada como JSON.
app.use(express.json());


// ============================================================
// RUTAS
// ============================================================

// Conectamos nuestras rutas con Express.
app.use('/', router);

// Middleware centralizado para manejar errores.
app.use(errorHandler);

// ============================================================
// ARCHIVOS ESTÁTICOS
// ============================================================

// Servimos archivos estáticos desde public.
app.use(express.static(path.join(__dirname, 'public')));


// ============================================================
// CONFIGURACIÓN DEL SERVIDOR
// ============================================================

// Obtenemos el puerto desde .env.
// Si no existe, utilizamos 3000.
const PORT = process.env.PORT || 3000;


// ============================================================
// INICIAR APLICACIÓN
// ============================================================

// Creamos una función asíncrona para controlar
// la conexión y sincronización de la base de datos.
const startServer = async () => {

    try {

        // ----------------------------------------------------
        // 1. COMPROBAR CONEXIÓN
        // ----------------------------------------------------

        // Verificamos que Sequelize pueda conectarse
        // correctamente a PostgreSQL.
        await sequelize.authenticate();

        console.log(
            '✅ Base de datos PostgreSQL conectada correctamente.'
        );


        // ----------------------------------------------------
        // 2. CREAR TABLAS
        // ----------------------------------------------------

        // sync() compara los modelos con las tablas existentes
        // y crea las tablas que todavía no existen.
        //
        // IMPORTANTE:
        // No utilizamos force:true porque eso eliminaría
        // las tablas existentes.
        await sequelize.sync();

        console.log(
            '✅ Modelos sincronizados correctamente con PostgreSQL.'
        );


        // ----------------------------------------------------
        // 3. INICIAR SERVIDOR
        // ----------------------------------------------------

        // Iniciamos Express después de comprobar que
        // PostgreSQL y las tablas funcionan correctamente.
        app.listen(PORT, () => {

            console.log(
                `✅ Servidor iniciado. Escuchando en http://localhost:${PORT}`
            );

        });

    } catch (error) {

        // ----------------------------------------------------
        // MANEJO DE ERRORES
        // ----------------------------------------------------

        // Mostramos el motivo del error.
        console.error(
            '❌ Error al iniciar la aplicación:',
            error.message
        );

        // Cerramos el proceso porque la aplicación
        // no puede funcionar correctamente.
        process.exit(1);
    }
};


// Ejecutamos la función principal.
startServer();