// Importamos Model y DataTypes.
const { Model, DataTypes } = require('sequelize');


// Creamos la clase UserRole.
// Será nuestra tabla intermedia para la relación N:M.
class UserRole extends Model {}


// Función de inicialización.
const initUserRole = (sequelize) => {

    UserRole.init(
        {
            // ID del usuario.
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },

            // ID del rol.
            roleId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            }
        },
        {
            // Conectamos con Sequelize.
            sequelize,

            // Nombre interno.
            modelName: 'UserRole',

            // Tabla intermedia.
            tableName: 'user_roles',

            // No necesitamos timestamps aquí.
            timestamps: false,

            // Utilizamos snake_case en las columnas de PostgreSQL.
            underscored: true
        }
    );

    // Devolvemos el modelo.
    return UserRole;
};


// Exportamos clase y función.
module.exports = {
    UserRole,
    initUserRole
};