// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos los modelos y la conexión de Sequelize.
const { sequelize, User, Order } = require('../models');


// ============================================================
// TRANSACCIÓN EXITOSA
// ============================================================

// Crea un usuario y un pedido dentro de una misma transacción.
const createUserWithOrder = async () => {

    // Iniciamos la transacción.
    const transaction = await sequelize.transaction();

    try {

        // Creamos un usuario dentro de la transacción.
        const usuario = await User.create(
            {
                nombre: 'Usuario Transaccion',
                email: `transaccion_${Date.now()}@example.com`,
                password: '123456'
            },
            {
                transaction
            }
        );

        // Creamos un pedido asociado al usuario.
        const pedido = await Order.create(
            {
                userId: usuario.id,
                descripcion: 'Pedido creado mediante transacción',
                total: 10000,
                estado: 'pendiente'
            },
            {
                transaction
            }
        );

        // Confirmamos todos los cambios.
        await transaction.commit();

        // Devolvemos los resultados.
        return {
            usuario,
            pedido
        };

    } catch (error) {

        // Si algo falla, deshacemos todos los cambios.
        await transaction.rollback();

        // Enviamos el error al controlador.
        throw error;
    }
};


// ============================================================
// TRANSACCIÓN CON ROLLBACK
// ============================================================

// Simula un error para demostrar el rollback.
const testRollback = async () => {

    // Iniciamos una nueva transacción.
    const transaction = await sequelize.transaction();

    try {

        // Creamos un usuario temporal.
        const usuario = await User.create(
            {
                nombre: 'Usuario Rollback',
                email: `rollback_${Date.now()}@example.com`,
                password: '123456'
            },
            {
                transaction
            }
        );

        // Forzamos un error intencional.
        throw new Error(
            'Error intencional para demostrar el rollback.'
        );

    } catch (error) {

        // Deshacemos el usuario creado porque ocurrió un error.
        await transaction.rollback();

        // Lanzamos nuevamente el error.
        throw error;
    }
};


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = {
    createUserWithOrder,
    testRollback
};