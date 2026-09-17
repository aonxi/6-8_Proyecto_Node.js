// ============================================================
// CONEXIÓN CON LA BASE DE DATOS
// ============================================================

// Importamos la instancia de Sequelize que conecta
// nuestra aplicación con PostgreSQL.
const sequelize = require('../config/database');


// ============================================================
// IMPORTACIÓN DE MODELOS
// ============================================================

// Importamos el modelo User desde User.js.
// "./" significa que el archivo se encuentra en esta
// misma carpeta: models/User.js.
const { User, initUser } = require('./User');

// Importamos el modelo Profile desde Profile.js.
const { Profile, initProfile } = require('./Profile');

// Importamos el modelo Order desde Order.js.
const { Order, initOrder } = require('./Order');

// Importamos el modelo Role desde Role.js.
const { Role, initRole } = require('./Role');

// Importamos el modelo UserRole desde UserRole.js.
// Será nuestra tabla intermedia para la relación N:M.
const { UserRole, initUserRole } = require('./UserRole');


// ============================================================
// INICIALIZACIÓN DE MODELOS
// ============================================================

// Inicializamos todos los modelos utilizando
// la misma conexión de Sequelize.
initUser(sequelize);
initProfile(sequelize);
initOrder(sequelize);
initRole(sequelize);
initUserRole(sequelize);


// ============================================================
// RELACIÓN 1:1
// User ↔ Profile
// ============================================================

// Un usuario puede tener un único perfil.
User.hasOne(Profile, {
    foreignKey: 'userId',
    as: 'profile',

    // Si se elimina el usuario, se elimina
    // automáticamente su perfil.
    onDelete: 'CASCADE',

    // Si cambia el ID del usuario, se mantiene
    // actualizada la relación.
    onUpdate: 'CASCADE'
});

// Un perfil pertenece a un único usuario.
Profile.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',

    // Eliminación en cascada.
    onDelete: 'CASCADE',

    // Actualización en cascada.
    onUpdate: 'CASCADE'
});


// ============================================================
// RELACIÓN 1:N
// User ↔ Order
// ============================================================

// Un usuario puede tener muchos pedidos.
User.hasMany(Order, {
    foreignKey: 'userId',
    as: 'orders',

    // Al eliminar el usuario, se eliminan
    // sus pedidos asociados.
    onDelete: 'CASCADE',

    // Mantenemos actualizada la relación.
    onUpdate: 'CASCADE'
});

// Cada pedido pertenece a un usuario.
Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',

    // Eliminación en cascada.
    onDelete: 'CASCADE',

    // Actualización en cascada.
    onUpdate: 'CASCADE'
});


// ============================================================
// RELACIÓN N:M
// User ↔ Role
// ============================================================

// Un usuario puede tener muchos roles.
User.belongsToMany(Role, {
    // UserRole será la tabla intermedia.
    through: UserRole,

    // FK del usuario dentro de user_roles.
    foreignKey: 'userId',

    // FK del rol dentro de user_roles.
    otherKey: 'roleId',

    // Alias utilizado para acceder a los roles
    // de un usuario.
    as: 'roles'
});

// Un rol puede pertenecer a muchos usuarios.
Role.belongsToMany(User, {
    // UserRole será la tabla intermedia.
    through: UserRole,

    // FK del rol dentro de user_roles.
    foreignKey: 'roleId',

    // FK del usuario dentro de user_roles.
    otherKey: 'userId',

    // Alias utilizado para acceder a los usuarios
    // que tienen un determinado rol.
    as: 'users'
});


// ============================================================
// EXPORTACIÓN
// ============================================================

// Exportamos la conexión y todos los modelos para que
// puedan ser utilizados desde controllers, services y rutas.
module.exports = {
    sequelize,
    User,
    Profile,
    Order,
    Role,
    UserRole
};