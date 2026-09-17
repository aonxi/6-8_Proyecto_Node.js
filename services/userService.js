// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos Op para poder realizar búsquedas dinámicas
// utilizando operadores de Sequelize.
const { Op } = require('sequelize');

// Importamos los modelos necesarios desde nuestro archivo central.
const {
    User,
    Profile,
    Order
} = require('../models');


// ============================================================
// VALIDACIÓN DE ID
// ============================================================

// Función auxiliar para validar que el ID recibido sea un número
// entero positivo.
const validateId = (id) => {

    // Convertimos el valor recibido a número.
    const numericId = Number(id);

    // Verificamos que sea un entero mayor que cero.
    if (!Number.isInteger(numericId) || numericId <= 0) {

        // Creamos un error personalizado.
        const error = new Error('El ID debe ser un número entero positivo.');

        // Indicamos el código HTTP que utilizará el controller.
        error.statusCode = 400;

        // Lanzamos el error.
        throw error;
    }

    // Devolvemos el ID validado.
    return numericId;
};


// ============================================================
// CREAR USUARIO
// ============================================================

const createUser = async ({ nombre, email, password, activo = true }) => {

    // Verificamos que los campos obligatorios existan.
    if (!nombre || !email || !password) {

        const error = new Error(
            'Los campos nombre, email y password son obligatorios.'
        );

        error.statusCode = 400;

        throw error;
    }

    // Eliminamos espacios innecesarios del nombre.
    nombre = nombre.trim();

    // Normalizamos el correo para evitar duplicados por mayúsculas.
    email = email.trim().toLowerCase();

    // Validación sencilla del formato del correo.
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {

        const error = new Error('El formato del email no es válido.');

        error.statusCode = 400;

        throw error;
    }

    // Validamos una longitud mínima para la contraseña.
    // En M8 posteriormente podremos incorporar hash/JWT.
    if (password.length < 6) {

        const error = new Error(
            'La contraseña debe tener al menos 6 caracteres.'
        );

        error.statusCode = 400;

        throw error;
    }

    // Buscamos si ya existe un usuario con ese correo.
    const usuarioExistente = await User.findOne({
        where: { email }
    });

    // Si existe, devolvemos un conflicto.
    if (usuarioExistente) {

        const error = new Error(
            'Ya existe un usuario registrado con ese email.'
        );

        error.statusCode = 409;

        throw error;
    }

    // Creamos el usuario utilizando Sequelize.
    const usuario = await User.create({
        nombre,
        email,
        password,
        activo
    });

    // Convertimos el modelo Sequelize a un objeto JavaScript.
    const usuarioCreado = usuario.toJSON();

    // Eliminamos la contraseña de la respuesta.
    delete usuarioCreado.password;

    // Devolvemos el usuario creado.
    return usuarioCreado;
};


// ============================================================
// OBTENER TODOS LOS USUARIOS
// ============================================================

const getUsers = async ({ nombre, email } = {}) => {

    // Creamos inicialmente un objeto vacío para los filtros.
    const where = {};

    // Si recibimos nombre, buscamos coincidencias parciales.
    if (nombre) {

        where.nombre = {
            [Op.iLike]: `%${nombre.trim()}%`
        };
    }

    // Si recibimos email, también permitimos búsqueda parcial.
    if (email) {

        where.email = {
            [Op.iLike]: `%${email.trim()}%`
        };
    }

    // Consultamos los usuarios mediante Sequelize.
    const usuarios = await User.findAll({

        // Aplicamos los filtros construidos anteriormente.
        where,

        // Nunca devolvemos las contraseñas.
        attributes: {
            exclude: ['password']
        },

        // Ordenamos los resultados por ID.
        order: [['id', 'ASC']]
    });

    // Devolvemos el resultado.
    return usuarios;
};


// ============================================================
// OBTENER UN USUARIO POR ID
// ============================================================

const getUserById = async (id) => {

    // Validamos el ID antes de consultar la base de datos.
    id = validateId(id);

    // Buscamos el usuario por su clave primaria.
    const usuario = await User.findByPk(id, {

        // Excluimos la contraseña.
        attributes: {
            exclude: ['password']
        },

        // Incluimos el perfil relacionado.
        include: [
            {
                model: Profile,
                as: 'profile'
            },

            // Incluimos los pedidos relacionados.
            {
                model: Order,
                as: 'orders'
            }
        ]
    });

    // Si no existe, generamos un error 404.
    if (!usuario) {

        const error = new Error(
            'No se encontró un usuario con ese ID.'
        );

        error.statusCode = 404;

        throw error;
    }

    // Devolvemos el usuario con sus relaciones.
    return usuario;
};


// ============================================================
// ACTUALIZAR USUARIO
// ============================================================

const updateUser = async (id, datos) => {

    // Validamos el ID.
    id = validateId(id);

    // Buscamos el usuario que queremos modificar.
    const usuario = await User.findByPk(id);

    // Si no existe, devolvemos 404.
    if (!usuario) {

        const error = new Error(
            'No se encontró un usuario con ese ID.'
        );

        error.statusCode = 404;

        throw error;
    }

    // Creamos un objeto solamente con los campos permitidos.
    const datosActualizados = {};

    // Permitimos modificar el nombre.
    if (datos.nombre !== undefined) {

        const nombre = String(datos.nombre).trim();

        if (!nombre) {

            const error = new Error(
                'El nombre no puede estar vacío.'
            );

            error.statusCode = 400;

            throw error;
        }

        datosActualizados.nombre = nombre;
    }

    // Permitimos modificar el email.
    if (datos.email !== undefined) {

        const email = String(datos.email).trim().toLowerCase();

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {

            const error = new Error(
                'El formato del email no es válido.'
            );

            error.statusCode = 400;

            throw error;
        }

        // Comprobamos que otro usuario no esté usando ese email.
        const emailEnUso = await User.findOne({
            where: {
                email,
                id: {
                    [Op.ne]: id
                }
            }
        });

        if (emailEnUso) {

            const error = new Error(
                'Otro usuario ya está utilizando ese email.'
            );

            error.statusCode = 409;

            throw error;
        }

        datosActualizados.email = email;
    }

    // Permitimos modificar el estado activo/inactivo.
    if (datos.activo !== undefined) {

        if (typeof datos.activo !== 'boolean') {

            const error = new Error(
                'El campo activo debe ser true o false.'
            );

            error.statusCode = 400;

            throw error;
        }

        datosActualizados.activo = datos.activo;
    }

    // Verificamos que exista al menos un campo para actualizar.
    if (Object.keys(datosActualizados).length === 0) {

        const error = new Error(
            'No se proporcionaron campos válidos para actualizar.'
        );

        error.statusCode = 400;

        throw error;
    }

    // Actualizamos únicamente los campos permitidos.
    await usuario.update(datosActualizados);

    // Eliminamos la contraseña del resultado.
    const usuarioActualizado = usuario.toJSON();

    delete usuarioActualizado.password;

    // Devolvemos el usuario actualizado.
    return usuarioActualizado;
};


// ============================================================
// ELIMINAR USUARIO
// ============================================================

const deleteUser = async (id) => {

    // Validamos el ID.
    id = validateId(id);

    // Buscamos el usuario.
    const usuario = await User.findByPk(id);

    // Si no existe, devolvemos 404.
    if (!usuario) {

        const error = new Error(
            'No se encontró un usuario con ese ID.'
        );

        error.statusCode = 404;

        throw error;
    }

    // Eliminamos el usuario.
    await usuario.destroy();

    // Devolvemos información útil para el controller.
    return {
        id,
        eliminado: true
    };
};


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};