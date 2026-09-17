// Importamos Model y DataTypes.
const { Model, DataTypes } = require('sequelize');


// Creamos la clase Order.
class Order extends Model {}


// Función encargada de inicializar el modelo.
const initOrder = (sequelize) => {

    Order.init(
        {
            // ID del pedido.
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            // ID del usuario propietario del pedido.
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            // Descripción del pedido.
            descripcion: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            // Total monetario.
            total: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },

            // Estado del pedido.
            estado: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: 'pendiente'
            }
        },
        {
            // Conectamos el modelo a Sequelize.
            sequelize,

            // Nombre interno.
            modelName: 'Order',

            // Tabla PostgreSQL.
            tableName: 'orders',

            // Fechas automáticas.
            timestamps: true,

            // Utilizamos snake_case en las columnas de PostgreSQL.
            underscored: true
        }
    );

    // Devolvemos el modelo.
    return Order;
};


// Exportamos clase y función.
module.exports = {
    Order,
    initOrder
};