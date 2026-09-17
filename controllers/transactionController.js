// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos el servicio de transacciones.
const transactionService = require('../services/transactionService');


// ============================================================
// TRANSACCIÓN EXITOSA
// ============================================================

// Ejecuta una transacción que crea un usuario y un pedido.
const createUserWithOrder = async (req, res) => {
    try {

        // Ejecutamos la transacción.
        const resultado =
            await transactionService.createUserWithOrder();

        // Respondemos con los datos creados.
        res.status(201).json({
            status: 'success',
            message: 'Transacción ejecutada correctamente.',
            data: resultado
        });

    } catch (error) {

        // Propagamos el error.
        throw error;
    }
};


// ============================================================
// PROBAR ROLLBACK
// ============================================================

// Ejecuta una transacción que falla intencionalmente.
const testRollback = async (req, res) => {
    try {

        // Ejecutamos la prueba de rollback.
        await transactionService.testRollback();

        // Esta respuesta no debería ejecutarse.
        res.status(200).json({
            status: 'success',
            message: 'Rollback no ejecutado.',
            data: null
        });

    } catch (error) {

        // Informamos que el rollback fue ejecutado.
        res.status(500).json({
            status: 'error',
            message: 'La transacción falló y se ejecutó rollback.',
            data: null
        });
    }
};


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = {
    createUserWithOrder,
    testRollback
};