// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos la conexión de Sequelize.
const { sequelize } = require('../models');

// Importamos QueryTypes para indicar el tipo de consulta SQL.
const { QueryTypes } = require('sequelize');


// ============================================================
// CONSULTA SQL MANUAL
// ============================================================

// Ejecuta una consulta SQL directamente sobre PostgreSQL.
const getUsersWithRawSQL = async (req, res) => {
    try {

        // Ejecutamos SQL directamente sobre la base de datos.
        const usuarios = await sequelize.query(
            `
            SELECT
                id,
                nombre,
                email,
                activo,
                created_at,
                updated_at
            FROM users
            ORDER BY id ASC;
            `,
            {
                // Indicamos que la consulta es de tipo SELECT.
                type: QueryTypes.SELECT
            }
        );

        // Devolvemos los resultados.
        res.status(200).json({
            status: 'success',
            message: 'Usuarios obtenidos mediante SQL manual.',
            data: usuarios
        });

    } catch (error) {

        // Propagamos el error al middleware centralizado.
        throw error;
    }
};


// ============================================================
// EXPORTACIÓN
// ============================================================

// Exportamos el controlador.
module.exports = {
    getUsersWithRawSQL
};