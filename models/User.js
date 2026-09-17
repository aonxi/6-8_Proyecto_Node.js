// Importamos Model y DataTypes desde Sequelize.
const { Model, DataTypes } = require('sequelize');


// Creamos una clase que representará a los usuarios.
class User extends Model {}


// Función encargada de inicializar el modelo User.
const initUser = (sequelize) => {

    User.init(
        {
            // Identificador único del usuario.
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            // Nombre completo.
            nombre: {
                type: DataTypes.STRING(100),
                allowNull: false
            },

            // Correo electrónico único.
            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true
            },

            // Contraseña.
            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            // Estado de la cuenta.
            activo: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            // Conectamos este modelo con nuestra instancia
            // de Sequelize.
            sequelize,

            // Nombre interno del modelo.
            modelName: 'User',

            // Nombre de la tabla PostgreSQL.
            tableName: 'users',

            // Campos automáticos createdAt y updatedAt.
            timestamps: true,

            // Utilizamos snake_case en las columnas de PostgreSQL.
            underscored: true
        }
    );

    // Devolvemos el modelo inicializado.
    return User;
};


// Exportamos tanto la clase como la función de inicialización.
module.exports = {
    User,
    initUser
};