// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos el servicio que contiene la lógica de los pedidos.
const orderService = require('../services/orderService');


// ============================================================
// CREAR PEDIDO
// ============================================================

// Controlador para crear un nuevo pedido.
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
        // Express 5 permite propagar el error al middleware de errores.
        throw error;
    }
};


// ============================================================
// OBTENER TODOS LOS PEDIDOS
// ============================================================

// Controlador para obtener todos los pedidos.
const getOrders = async (req, res) => {
    try {
        // Obtenemos los filtros enviados por URL.
        const { estado, userId } = req.query;

        // Consultamos los pedidos mediante el servicio.
        const pedidos = await orderService.getOrders({
            estado,
            userId
        });

        // Respondemos con los pedidos encontrados.
        res.status(200).json({
            status: 'success',
            message: 'Pedidos obtenidos correctamente.',
            data: pedidos
        });
    } catch (error) {
        // Propagamos el error.
        throw error;
    }
};


// ============================================================
// OBTENER PEDIDO POR ID
// ============================================================

// Controlador para obtener un pedido específico.
const getOrderById = async (req, res) => {
    try {
        // Obtenemos el ID desde la URL.
        const { id } = req.params;

        // Buscamos el pedido mediante el servicio.
        const pedido = await orderService.getOrderById(id);

        // Respondemos con el pedido encontrado.
        res.status(200).json({
            status: 'success',
            message: 'Pedido obtenido correctamente.',
            data: pedido
        });
    } catch (error) {
        // Propagamos el error.
        throw error;
    }
};


// ============================================================
// ACTUALIZAR PEDIDO
// ============================================================

// Controlador para actualizar un pedido.
const updateOrder = async (req, res) => {
    try {
        // Obtenemos el ID desde la URL.
        const { id } = req.params;

        // Actualizamos el pedido mediante el servicio.
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
        // Propagamos el error.
        throw error;
    }
};


// ============================================================
// ELIMINAR PEDIDO
// ============================================================

// Controlador para eliminar un pedido.
const deleteOrder = async (req, res) => {
    try {
        // Obtenemos el ID desde la URL.
        const { id } = req.params;

        // Eliminamos el pedido mediante el servicio.
        const resultado = await orderService.deleteOrder(id);

        // Respondemos confirmando la eliminación.
        res.status(200).json({
            status: 'success',
            message: 'Pedido eliminado correctamente.',
            data: resultado
        });
    } catch (error) {
        // Propagamos el error.
        throw error;
    }
};


// ============================================================
// EXPORTACIÓN
// ============================================================

// Exportamos todos los controladores para utilizarlos en las rutas.
module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};