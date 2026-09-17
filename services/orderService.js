// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos Op para realizar búsquedas dinámicas.
const { Op } = require('sequelize');

// Importamos los modelos necesarios.
const {
    Order,
    User
} = require('../models');


// ============================================================
// VALIDACIÓN DE ID
// ============================================================

// Validamos que el ID sea un número entero positivo.
const validateId = (id) => {

    // Convertimos el valor recibido a número.
    const numericId = Number(id);

    // Comprobamos que sea válido.
    if (!Number.isInteger(numericId) || numericId <= 0) {

        const error = new Error(
            'El ID debe ser un número entero positivo.'
        );

        error.statusCode = 400;

        throw error;
    }

    return numericId;
};


// ============================================================
// CREAR PEDIDO
// ============================================================

const createOrder = async ({
    userId,
    descripcion,
    total,
    estado = 'pendiente'
}) => {

    // Verificamos los campos obligatorios.
    if (!userId || !descripcion || total === undefined) {

        const error = new Error(
            'Los campos userId, descripcion y total son obligatorios.'
        );

        error.statusCode = 400;

        throw error;
    }

    // Validamos que el usuario exista.
    const usuario = await User.findByPk(userId);

    if (!usuario) {

        const error = new Error(
            'No existe un usuario con el userId indicado.'
        );

        error.statusCode = 404;

        throw error;
    }

    // Convertimos el total a número.
    const totalNumerico = Number(total);

    // Validamos que sea un número válido.
    if (Number.isNaN(totalNumerico) || totalNumerico < 0) {

        const error = new Error(
            'El total debe ser un número mayor o igual a cero.'
        );

        error.statusCode = 400;

        throw error;
    }

    // Creamos el pedido mediante Sequelize.
    const pedido = await Order.create({
        userId,
        descripcion: descripcion.trim(),
        total: totalNumerico,
        estado
    });

    // Devolvemos el pedido creado.
    return pedido;
};


// ============================================================
// OBTENER TODOS LOS PEDIDOS
// ============================================================

const getOrders = async ({ estado, userId } = {}) => {

    // Creamos el objeto de filtros.
    const where = {};

    // Si se recibe estado, filtramos por estado.
    if (estado) {

        where.estado = {
            [Op.iLike]: `%${estado.trim()}%`
        };
    }

    // Si se recibe userId, filtramos por usuario.
    if (userId) {

        where.userId = validateId(userId);
    }

    // Consultamos los pedidos.
    const pedidos = await Order.findAll({

        // Aplicamos los filtros.
        where,

        // Incluimos al usuario dueño del pedido.
        include: [
            {
                model: User,
                as: 'user',

                // No devolvemos la contraseña.
                attributes: {
                    exclude: ['password']
                }
            }
        ],

        // Ordenamos por ID.
        order: [['id', 'ASC']]
    });

    return pedidos;
};


// ============================================================
// OBTENER PEDIDO POR ID
// ============================================================

const getOrderById = async (id) => {

    // Validamos el ID.
    id = validateId(id);

    // Buscamos el pedido.
    const pedido = await Order.findByPk(id, {

        // Incluimos el usuario relacionado.
        include: [
            {
                model: User,
                as: 'user',

                // Ocultamos la contraseña.
                attributes: {
                    exclude: ['password']
                }
            }
        ]
    });

    // Si no existe, devolvemos 404.
    if (!pedido) {

        const error = new Error(
            'No se encontró un pedido con ese ID.'
        );

        error.statusCode = 404;

        throw error;
    }

    return pedido;
};


// ============================================================
// ACTUALIZAR PEDIDO
// ============================================================

const updateOrder = async (id, datos) => {

    // Validamos el ID.
    id = validateId(id);

    // Buscamos el pedido.
    const pedido = await Order.findByPk(id);

    // Verificamos que exista.
    if (!pedido) {

        const error = new Error(
            'No se encontró un pedido con ese ID.'
        );

        error.statusCode = 404;

        throw error;
    }

    // Objeto que contendrá solamente los campos permitidos.
    const datosActualizados = {};

    // Permitimos actualizar la descripción.
    if (datos.descripcion !== undefined) {

        const descripcion = String(datos.descripcion).trim();

        if (!descripcion) {

            const error = new Error(
                'La descripción no puede estar vacía.'
            );

            error.statusCode = 400;

            throw error;
        }

        datosActualizados.descripcion = descripcion;
    }

    // Permitimos actualizar el total.
    if (datos.total !== undefined) {

        const total = Number(datos.total);

        if (Number.isNaN(total) || total < 0) {

            const error = new Error(
                'El total debe ser un número mayor o igual a cero.'
            );

            error.statusCode = 400;

            throw error;
        }

        datosActualizados.total = total;
    }

    // Permitimos actualizar el estado.
    if (datos.estado !== undefined) {

        const estado = String(datos.estado).trim();

        if (!estado) {

            const error = new Error(
                'El estado no puede estar vacío.'
            );

            error.statusCode = 400;

            throw error;
        }

        datosActualizados.estado = estado;
    }

    // No permitimos actualizar el userId desde este endpoint.
    // De esta forma evitamos cambiar accidentalmente
    // el propietario del pedido.

    // Verificamos que haya algo que actualizar.
    if (Object.keys(datosActualizados).length === 0) {

        const error = new Error(
            'No se proporcionaron campos válidos para actualizar.'
        );

        error.statusCode = 400;

        throw error;
    }

    // Aplicamos los cambios.
    await pedido.update(datosActualizados);

    return pedido;
};


// ============================================================
// ELIMINAR PEDIDO
// ============================================================

const deleteOrder = async (id) => {

    // Validamos el ID.
    id = validateId(id);

    // Buscamos el pedido.
    const pedido = await Order.findByPk(id);

    // Comprobamos que exista.
    if (!pedido) {

        const error = new Error(
            'No se encontró un pedido con ese ID.'
        );

        error.statusCode = 404;

        throw error;
    }

    // Eliminamos el pedido.
    await pedido.destroy();

    // Devolvemos información de confirmación.
    return {
        id,
        eliminado: true
    };
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