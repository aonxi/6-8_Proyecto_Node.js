// Importamos Model y DataTypes desde Sequelize.
const { Model, DataTypes } = require('sequelize');


// Creamos la clase Profile.
class Profile extends Model {}


// Función encargada de inicializar el modelo.
const initProfile = (sequelize) => {

    Profile.init(
        {
            // Identificador del perfil.
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            // ID del usuario relacionado.
            // unique garantiza nuestra relación 1:1.
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },

            // Teléfono.
            telefono: {
                type: DataTypes.STRING(30),
                allowNull: true
            },

            // Avatar.
            avatar: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        },
        {
            // Conectamos el modelo con Sequelize.
            sequelize,

            // Nombre interno.
            modelName: 'Profile',

            // Nombre de la tabla.
            tableName: 'profiles',

            // Campos automáticos de fecha.
            timestamps: true,

            // Utilizamos snake_case en las columnas de PostgreSQL.
            underscored: true
        }
    );

    // Devolvemos el modelo.
    return Profile;
};


// Exportamos clase y función.
module.exports = {
    Profile,
    initProfile
};