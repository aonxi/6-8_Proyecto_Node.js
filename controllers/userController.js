// ============================================================
// IMPORTACIÓN DEL SERVICIO DE USUARIOS
// ============================================================

// Importamos las funciones que contienen la lógica de usuarios.
const userService = require('../services/userService');


// ============================================================
// CREAR USUARIO
// ============================================================

const createUser = async (req, res) => {

    try {

        // Enviamos los datos recibidos al servicio.
        const usuario = await userService.createUser(req.body);

        // Respondemos con código 201 porque se creó un recurso.
        res.status(201).json({
            status: 'success',
            message: 'Usuario creado correctamente.',
            data: usuario
        });

    } catch (error) {

        // Enviamos el error al middleware de errores.
        throw error;
    }
};


// ============================================================
// OBTENER TODOS LOS USUARIOS
// ============================================================

const getUsers = async (req, res) => {

    try {

        // Obtenemos los filtros enviados mediante query params.
        const { nombre, email } = req.query;

        // Consultamos los usuarios mediante el servicio.
        const usuarios = await userService.getUsers({
            nombre,
            email
        });

        // Respondemos con los usuarios encontrados.
        res.status(200).json({
            status: 'success',
            message: 'Usuarios obtenidos correctamente.',
            data: usuarios
        });

    } catch (error) {

        // Enviamos el error al middleware de errores.
        throw error;
    }
};


// ============================================================
// OBTENER USUARIO POR ID
// ============================================================

const getUserById = async (req, res) => {

    try {

        // Obtenemos el ID desde los parámetros de la URL.
        const { id } = req.params;

        // Buscamos el usuario mediante el servicio.
        const usuario = await userService.getUserById(id);

        // Respondemos con el usuario encontrado.
        res.status(200).json({
            status: 'success',
            message: 'Usuario obtenido correctamente.',
            data: usuario
        });

    } catch (error) {

        // Enviamos el error al middleware de errores.
        throw error;
    }
};


// ============================================================
// ACTUALIZAR USUARIO
// ============================================================

const updateUser = async (req, res) => {

    try {

        // Obtenemos el ID desde la URL.
        const { id } = req.params;

        // Enviamos los datos al servicio.
        const usuario = await userService.updateUser(
            id,
            req.body
        );

        // Respondemos con el usuario actualizado.
        res.status(200).json({
            status: 'success',
            message: 'Usuario actualizado correctamente.',
            data: usuario
        });

    } catch (error) {

        // Enviamos el error al middleware de errores.
        throw error;
    }
};


// ============================================================
// ELIMINAR USUARIO
// ============================================================

const deleteUser = async (req, res) => {

    try {

        // Obtenemos el ID desde la URL.
        const { id } = req.params;

        // Eliminamos el usuario mediante el servicio.
        const resultado = await userService.deleteUser(id);

        // Respondemos indicando que se eliminó correctamente.
        res.status(200).json({
            status: 'success',
            message: 'Usuario eliminado correctamente.',
            data: resultado
        });

    } catch (error) {

        // Enviamos el error al middleware de errores.
        throw error;
    }
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