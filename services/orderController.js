// ============================================================
// IMPORTACIÓN DEL SERVICIO DE PEDIDOS
// ============================================================

// Importamos las funciones que contienen la lógica de pedidos.
const orderService = require('../services/orderService');


// ============================================================
// CREAR PEDIDO
// ============================================================

const createOrder = async (req, res) => {

    try {

        // Enviamos los datos recibidos al servicio.
        const pedido = await orderService.createOrder(req.body);

        // Respondemos indicando que el pedido fue creado.
        res.status(201).json({
            status: 'success',
            message: 'Pedido creado correctamente.',
            data: pedido
        });

    } catch (error) {

        // Dejamos que Express gestione el error.
        throw error;
    }
};


// ============================================================
// OBTENER TODOS LOS PEDIDOS
// ============================================================

const getOrders = async (req, res) => {

    try {

        // Obtenemos los filtros desde la URL.
        const { estado, userId } = req.query;

        // Consultamos los pedidos mediante el servicio.
        const pedidos = await orderService.getOrders({
            estado,
            userId
        });

        // Respondemos con los pedidos.
        res.status(200).json({
            status: 'success',
            message: 'Pedidos obtenidos correctamente.',
            data: pedidos
        });

    } catch (error) {

        // Dejamos que Express gestione el error.
        throw error;
    }
};


// ============================================================
// OBTENER PEDIDO POR ID
// ============================================================

const getOrderById = async (req, res) => {

    try {

        // Obtenemos el ID desde la URL.
        const { id } = req.params;

        // Buscamos el pedido.
        const pedido = await orderService.getOrderById(id);

        // Respondemos con el pedido.
        res.status(200).json({
            status: 'success',
            message: 'Pedido obtenido correctamente.',
            data: pedido
        });

    } catch (error) {

        // Dejamos que Express gestione el error.
        throw error;
    }
};


// ============================================================
// ACTUALIZAR PEDIDO
// ============================================================

const updateOrder = async (req, res) => {

    try {

        // Obtenemos el ID desde la URL.
        const { id } = req.params;

        // Actualizamos el pedido.
        const pedido = await orderService.updateOrder(
            id,
            req.body
        );

        // Respondemos con el pedido actualizado.
        res.status(200).json({
            status: 'success',
            message: 'Pedido actualizado correctamente.',
            data: pedido
        });

    } catch (error) {

        // Dejamos que Express gestione el error.
        throw error;
    }
};


// ============================================================
// ELIMINAR PEDIDO
// ============================================================

const deleteOrder = async (req, res) => {

    try {

        // Obtenemos el ID desde la URL.
        const { id } = req.params;

        // Eliminamos el pedido.
        const resultado = await orderService.deleteOrder(id);

        // Respondemos con la confirmación.
        res.status(200).json({
            status: 'success',
            message: 'Pedido eliminado correctamente.',
            data: resultado
        });

    } catch (error) {

        // Dejamos que Express gestione el error.
        throw error;
    }
};


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};