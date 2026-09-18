// ============================================================
// IMPORTACIONES
// ============================================================

// Importamos bcrypt para comparar la contraseña enviada
// con el hash almacenado en PostgreSQL.
const bcrypt = require('bcrypt');

// Importamos jsonwebtoken para generar el token JWT.
const jwt = require('jsonwebtoken');

// Importamos el modelo User para buscar al usuario.
const { User } = require('../models');


// ============================================================
// LOGIN
// ============================================================

const login = async (req, res) => {

    // Obtenemos email y password enviados desde el cliente.
    const { email, password } = req.body;

    // Validamos que ambos campos hayan sido enviados.
    if (!email || !password) {

        const error = new Error(
            'Los campos email y password son obligatorios.'
        );

        error.statusCode = 400;

        throw error;
    }

    // Normalizamos el email para mantener el mismo formato
    // utilizado al registrar usuarios.
    const emailNormalizado = email.trim().toLowerCase();

    // Buscamos el usuario mediante su email.
    const usuario = await User.findOne({
        where: {
            email: emailNormalizado
        }
    });

    // Si el usuario no existe, devolvemos un error de autenticación.
    // Utilizamos un mensaje genérico para no revelar
    // si un email está registrado o no.
    if (!usuario) {

        const error = new Error(
            'Credenciales inválidas.'
        );

        error.statusCode = 401;

        throw error;
    }

    // Verificamos que la cuenta se encuentre activa.
    if (!usuario.activo) {

        const error = new Error(
            'La cuenta del usuario se encuentra inactiva.'
        );

        error.statusCode = 403;

        throw error;
    }

    // Comparamos la contraseña recibida con el hash almacenado.
    const passwordValida = await bcrypt.compare(
        password,
        usuario.password
    );

    // Si la contraseña no coincide, rechazamos el acceso.
    if (!passwordValida) {

        const error = new Error(
            'Credenciales inválidas.'
        );

        error.statusCode = 401;

        throw error;
    }

    // Verificamos que exista el secreto JWT configurado
    // en el archivo .env.
    if (!process.env.JWT_SECRET) {

        const error = new Error(
            'JWT_SECRET no está configurado en las variables de entorno.'
        );

        error.statusCode = 500;

        throw error;
    }

    // Generamos el token JWT.
    const token = jwt.sign(

        // Información que identificará al usuario.
        {
            id: usuario.id,
            email: usuario.email
        },

        // Secreto utilizado para firmar el token.
        process.env.JWT_SECRET,

        // Configuración del tiempo de expiración.
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h'
        }
    );

    // Construimos una respuesta segura sin incluir la contraseña.
    const usuarioRespuesta = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        activo: usuario.activo
    };

    // Devolvemos el token al cliente.
    res.status(200).json({
        status: 'success',
        message: 'Autenticación exitosa.',
        data: {
            token,
            usuario: usuarioRespuesta
        }
    });
};


// ============================================================
// EXPORTACIÓN
// ============================================================

module.exports = {
    login
};