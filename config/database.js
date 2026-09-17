// Importamos Sequelize desde la librería instalada.
const { Sequelize } = require('sequelize');

// Creamos una instancia de Sequelize utilizando las variables
// almacenadas en el archivo .env.
const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nombre de la base de datos.
    process.env.DB_USER,       // Usuario de PostgreSQL.
    process.env.DB_PASSWORD,   // Contraseña de PostgreSQL.
    {
        // Indicamos que utilizaremos PostgreSQL como motor.
        dialect: 'postgres',

        // Dirección donde está ejecutándose PostgreSQL.
        host: process.env.DB_HOST,

        // Puerto de PostgreSQL.
        port: process.env.DB_PORT,

        // Desactivamos por ahora los logs SQL automáticos de Sequelize
        // para mantener limpia la consola durante el desarrollo.
        logging: false
    }
);

// Exportamos la instancia para utilizarla desde otras partes
// de nuestra aplicación.
module.exports = sequelize;