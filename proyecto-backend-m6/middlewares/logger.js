const fs = require('fs');
const path = require('path');

// Middleware para registrar cada visita (Persistencia en archivos planos)
const logger = (req, res, next) => {
    // Obtener fecha y hora actual
    const now = new Date();
    const fecha = now.toLocaleDateString();
    const hora = now.toLocaleTimeString();
    
    // Obtener la ruta a la que el usuario intentó acceder
    const ruta = req.url;

    // Estructura exigida por la rúbrica: fecha, hora, ruta accedida
    const logLine = `Fecha: ${fecha} | Hora: ${hora} | Ruta accedida: ${ruta}\n`;

    // Definir la ruta exacta donde se guardará el archivo log.txt
    const filePath = path.join(__dirname, '../logs/log.txt');

    // fs.appendFile agrega el texto al final del archivo. Si no existe, lo crea.
    fs.appendFile(filePath, logLine, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de logs:', err);
        }
    });

    // next(): le dice a Express que continúe con la ruta solicitada
    next();
};

// Exportamos la función para usarla en nuestro servidor principal
module.exports = logger;