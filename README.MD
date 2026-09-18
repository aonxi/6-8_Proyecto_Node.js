# Proyecto Backend Node.js, Express y PostgreSQL - Módulo 8

## Descripción

Este proyecto corresponde al desarrollo de un backend REST realizado durante los módulos 6, 7 y 8.

La aplicación evolucionó desde una API básica hacia un backend modular con persistencia de datos mediante PostgreSQL, Sequelize ORM, relaciones entre entidades, operaciones CRUD, búsquedas dinámicas, manejo de errores, autenticación mediante JWT y carga segura de archivos mediante Multer.

La aplicación utiliza una arquitectura modular basada en:

* Rutas
* Controladores
* Servicios
* Modelos
* Middlewares
* Configuración de base de datos

Durante el Módulo 8 se incorporaron principalmente:

* Autenticación mediante JSON Web Token (JWT).
* Protección de rutas privadas.
* Hash de contraseñas mediante bcrypt.
* Carga de archivos mediante Multer.
* Validación de tipo de archivo.
* Validación de tamaño máximo de archivo.
* Servido de archivos mediante una ruta estática.
* Respuestas API estandarizadas.
* Documentación actualizada de endpoints y autenticación.

---

## Tecnologías utilizadas

* Node.js 18 o superior
* Express
* PostgreSQL
* Sequelize ORM
* JavaScript
* Dotenv
* Nodemon
* pg
* pg-hstore
* JSON Web Token (jsonwebtoken)
* bcrypt
* Multer
* Postman
* Git y GitHub

---

## Requisitos

Para ejecutar el proyecto se necesita:

* Node.js 18 o superior
* npm
* PostgreSQL
* Git

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/aonxi/6-8_Proyecto_Node.js.git
```

### 2. Entrar al proyecto

```bash
cd 8Proyecto_api-jwt
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=proyecto_backend
DB_USER=postgres
DB_PASSWORD=

JWT_SECRET=
JWT_EXPIRES_IN=1h
```

El archivo `.env` no debe subirse al repositorio porque contiene información sensible.

---

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

---

# Arquitectura del proyecto

La aplicación utiliza una separación de responsabilidades para facilitar el mantenimiento y crecimiento del backend.

```text
8Proyecto_api-jwt/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── mainController.js
│   ├── userController.js
│   ├── orderController.js
│   ├── transactionController.js
│   ├── sqlController.js
│   ├── authController.js
│   └── uploadController.js
│
├── models/
│   ├── User.js
│   ├── Profile.js
│   ├── Order.js
│   ├── Role.js
│   ├── UserRole.js
│   └── index.js
│
├── routes/
│   ├── router.js
│   ├── userRoutes.js
│   ├── orderRoutes.js
│   ├── transactionRoutes.js
│   ├── sqlRoutes.js
│   ├── authRoutes.js
│   └── uploadRoutes.js
│
├── services/
│   ├── userService.js
│   ├── orderService.js
│   └── transactionService.js
│
├── middlewares/
│   ├── logger.js
│   ├── errorHandler.js
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── public/
│   └── index.html
│
├── uploads/
│   └── .gitkeep
│
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── package-lock.json
```

---

# Autenticación JWT

El proyecto utiliza JSON Web Token (JWT) para proteger rutas privadas.

El flujo de autenticación es:

```text
Usuario
   │
   ▼
POST /login
   │
   ▼
Validación de credenciales
   │
   ▼
bcrypt compara contraseña
   │
   ▼
Generación de JWT
   │
   ▼
Cliente recibe token
   │
   ▼
Bearer Token
   │
   ▼
Middleware JWT
   │
   ▼
Ruta protegida
```

Las contraseñas nuevas se almacenan utilizando un hash generado mediante bcrypt. La contraseña original no se devuelve en las respuestas de la API.

---

## Login

### POST `/login`

Permite autenticar un usuario y obtener un token JWT.

Body:

```json
{
  "email": "usuario.m8@example.com",
  "password": "M8Password123"
}
```

Respuesta exitosa:

```json
{
  "status": "success",
  "message": "Autenticación exitosa.",
  "data": {
    "token": "JWT_GENERADO",
    "usuario": {
      "id": 5,
      "nombre": "Usuario M8",
      "email": "usuario.m8@example.com",
      "activo": true
    }
  }
}
```

---

# Uso del JWT

Las rutas protegidas requieren enviar el token mediante el encabezado:

```text
Authorization: Bearer <token>
```

En Postman se puede configurar mediante:

```text
Authorization
→ Type: Bearer Token
→ Token: <JWT>
```

Si no se proporciona un token:

```json
{
  "status": "error",
  "message": "Token de autenticación requerido.",
  "data": null
}
```

Si el token es inválido o está expirado:

```json
{
  "status": "error",
  "message": "Token inválido o expirado.",
  "data": null
}
```

---

# Endpoints principales

## Usuarios

### POST `/usuarios`

Crea un nuevo usuario.

Esta ruta es pública para permitir el registro.

Ejemplo:

```json
{
  "nombre": "Usuario M8",
  "email": "usuario.m8@example.com",
  "password": "M8Password123",
  "activo": true
}
```

### GET `/usuarios`

Obtiene los usuarios registrados.

**Ruta protegida mediante JWT.**

### GET `/usuarios/:id`

Obtiene un usuario específico.

**Ruta protegida mediante JWT.**

### PUT `/usuarios/:id`

Actualiza información de un usuario.

### DELETE `/usuarios/:id`

Elimina un usuario.

---

## Pedidos

Las operaciones relacionadas con pedidos se encuentran agrupadas bajo:

```text
/pedidos
```

Estas rutas utilizan los controladores y servicios correspondientes para separar la lógica de negocio del manejo de las peticiones HTTP.

---

## Transacciones

Las operaciones relacionadas con transacciones se encuentran agrupadas bajo:

```text
/transacciones
```

La lógica se encuentra separada mediante controladores y servicios.

---

## Consultas SQL

Las funcionalidades relacionadas con consultas SQL se encuentran bajo:

```text
/sql
```

---

# Carga de archivos

El proyecto utiliza **Multer** para gestionar la carga de archivos.

## POST `/upload`

Permite subir archivos mediante `multipart/form-data`.

La ruta requiere autenticación mediante JWT.

En Postman:

```text
POST http://localhost:3000/upload
```

Authorization:

```text
Bearer Token
```

Body:

```text
form-data
```

Campo:

```text
archivo
```

El campo `archivo` debe ser de tipo `File`.

---

## Validaciones de archivos

La API permite únicamente:

* JPG
* JPEG
* PNG
* WEBP

El tamaño máximo permitido es:

```text
5 MB
```

Si se intenta subir un tipo de archivo no permitido, la API responde con un error controlado.

Ejemplo:

```json
{
  "status": "error",
  "message": "Tipo de archivo no permitido. Solo se permiten JPG, JPEG, PNG y WEBP.",
  "data": null
}
```

Si el archivo supera los 5 MB:

```json
{
  "status": "error",
  "message": "El archivo supera el tamaño máximo permitido de 5 MB.",
  "data": null
}
```

Los archivos aceptados se almacenan temporalmente en:

```text
/uploads
```

y pueden ser accedidos mediante:

```text
http://localhost:3000/uploads/nombre-del-archivo
```

---

# Persistencia y ORM

La aplicación utiliza PostgreSQL como sistema de gestión de base de datos y Sequelize como ORM.

Los modelos principales incluyen:

* User
* Profile
* Order
* Role
* UserRole

Sequelize permite representar las relaciones entre las entidades y realizar operaciones sobre PostgreSQL mediante modelos JavaScript.

Entre las relaciones implementadas se encuentran:

* Usuario → Perfil: 1:1
* Usuario → Pedidos: 1:N
* Usuario → Roles: N:M

---

# Manejo de errores

La aplicación cuenta con un middleware centralizado:

```text
middlewares/errorHandler.js
```

Las respuestas de error mantienen un formato consistente:

```json
{
  "status": "error",
  "message": "Descripción del error.",
  "data": null
}
```

Esto facilita el consumo de la API desde clientes externos como Postman, aplicaciones web o aplicaciones móviles.

---

# Respuestas de la API

Las respuestas exitosas utilizan el formato:

```json
{
  "status": "success",
  "message": "Operación realizada correctamente.",
  "data": {}
}
```

Las respuestas de error utilizan:

```json
{
  "status": "error",
  "message": "Descripción del error.",
  "data": null
}
```

---

# Pruebas realizadas con Postman

Durante el Módulo 8 se realizaron pruebas para comprobar:

1. Registro de usuarios.
2. Login y generación de JWT.
3. Acceso a ruta protegida sin token.
4. Acceso a ruta protegida con token válido.
5. Carga de archivos mediante Multer.
6. Rechazo de tipos de archivo no permitidos.
7. Rechazo de archivos superiores a 5 MB.

Estas pruebas permiten comprobar tanto el funcionamiento normal como el manejo de errores de la API.

---

# Mejoras realizadas durante el Módulo 8

Respecto a los módulos anteriores se incorporaron:

* Autenticación mediante JWT.
* Middleware para validar tokens.
* Protección de rutas privadas.
* Hash de contraseñas con bcrypt.
* Carga de archivos con Multer.
* Validación de extensión y tipo MIME.
* Límite máximo de 5 MB para archivos.
* Manejo controlado de errores de Multer.
* Servido de archivos mediante Express.
* Nuevos controladores y rutas independientes.
* Actualización de la documentación del backend.

---

# Reflexión técnica

El desarrollo de los módulos 6, 7 y 8 permitió evolucionar progresivamente desde una aplicación con lógica básica hacia un backend más estructurado.

En el Módulo 6 se trabajó la estructura inicial de la aplicación y el manejo de datos.

En el Módulo 7 se incorporó PostgreSQL, Sequelize, relaciones entre modelos, operaciones CRUD, búsquedas y servicios separados.

En el Módulo 8 se agregó una capa de seguridad mediante JWT y bcrypt, además de la capacidad de recibir archivos utilizando Multer.

La separación entre rutas, controladores, servicios, modelos y middlewares permite mantener responsabilidades específicas en cada componente y facilita futuras modificaciones.

La implementación de JWT también permite que un cliente externo pueda autenticarse y posteriormente consumir recursos protegidos mediante un token.

Finalmente, las validaciones de archivos y el manejo centralizado de errores permiten que la API responda de manera controlada ante entradas no válidas.

---

# Git y GitHub

El código fuente se encuentra versionado mediante Git y alojado en GitHub.

Repositorio:

```text
https://github.com/aonxi/6-8_Proyecto_Node.js
```

La rama utilizada para el desarrollo del Módulo 8 es:

```text
m8-backend
```

Los cambios deben revisarse antes de integrarse a la rama principal `main`.

---

# Seguridad

Las siguientes consideraciones fueron implementadas:

* El archivo `.env` no se incluye en el repositorio.
* Las contraseñas nuevas se almacenan mediante bcrypt.
* Las rutas privadas requieren JWT.
* El JWT posee una duración configurada mediante `JWT_EXPIRES_IN`.
* Los archivos subidos tienen validación de tipo.
* Los archivos subidos tienen un límite máximo de 5 MB.
* La carpeta de archivos subidos no contiene archivos de prueba versionados en Git.
