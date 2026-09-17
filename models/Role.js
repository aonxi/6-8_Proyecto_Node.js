// Importamos Model y DataTypes.
const { Model, DataTypes } = require('sequelize');


// Creamos la clase Role.
class Role extends Model {}


// Función de inicialización.
const initRole = (sequelize) => {

    Role.init(
        {
            // ID del rol.
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            // Nombre único del rol.
            nombre: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            }
        },
        {
            // Conectamos con Sequelize.
            sequelize,

            // Nombre interno.
            modelName: 'Role',

            // Tabla PostgreSQL.
            tableName: 'roles',

            // Fechas automáticas.
            timestamps: true,

            // Utilizamos snake_case en las columnas de PostgreSQL.
            underscored: true
        }
    );

    // Devolvemos el modelo.
    return Role;
};


// Exportamos clase y función.
module.exports = {
    Role,
    initRole
};