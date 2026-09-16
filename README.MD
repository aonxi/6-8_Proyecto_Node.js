# Proyecto Backend Node & Express - Módulo 6

Este proyecto es la primera etapa del desarrollo de una aplicación web para gestión de usuarios y datos. En esta fase (Módulo 6), se han establecido los cimientos del servidor, la estructuración de carpetas, el ruteo básico y la persistencia en archivos planos.

## Requisitos del sistema
* Node.js (v18 o superior)
* npm (Node Package Manager)

## Instrucciones de instalación
1. Clonar el repositorio en tu máquina local.
2. Abrir una terminal en la raíz del proyecto.
3. Ejecutar el comando `npm install` para instalar todas las dependencias requeridas (Express y Dotenv).
4. Crear un archivo `.env` en la raíz del proyecto y definir el puerto, por ejemplo: `PORT=3000`.

## Ejemplos de uso / Ejecución
Para levantar el servidor, el proyecto cuenta con dos scripts personalizados:
* **Modo desarrollo:** Ejecutar `npm run dev`. Utiliza *Nodemon* para reiniciar el servidor automáticamente ante cualquier cambio en el código.
* **Modo producción:** Ejecutar `npm start`. Utiliza directamente el entorno de Node.

Una vez iniciado, puedes acceder a:
* `http://localhost:3000/` : Devuelve una respuesta en HTML dinámico desde el controlador.
* `http://localhost:3000/status` : Devuelve una respuesta en formato JSON con el estado del servidor.
* `http://localhost:3000/index.html` : Sirve un archivo estático desde la carpeta `/public`.

---

## Justificaciones Técnicas

* **Archivo principal (`app.js`):** Se eligió `app.js` sobre `index.js` porque semánticamente representa mejor el punto de entrada de una aplicación Express modular, separando conceptualmente la configuración de la app de la pura ejecución lógica (estándar).
* **Estructura de carpetas:** Se optó por una estructura modular (`routes`, `controllers`, `middlewares`, `public`, `logs`) para garantizar la escalabilidad de cara a los Módulos 7 y 8. Esto permite separar las responsabilidades (separación de preocupaciones).
* **Uso de scripts personalizados:** Se definieron `npm start` para ambientes de producción por su estandarización universal en plataformas de despliegue, y `npm run dev` para agilizar la etapa de desarrollo local.
* **Servicio de estáticos (`/public`):** Se prefirió mantener una carpeta pública para servir HTML en lugar de un motor de plantillas (EJS/Pug) porque el objetivo final del proyecto es exponer una API RESTful (Módulo 8) para ser consumida por un frontend separado, haciendo innecesario el renderizado de vistas en el servidor.