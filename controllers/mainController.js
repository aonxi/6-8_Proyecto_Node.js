// Controlador para la ruta principal (/)
const getHome = (req, res) => {
    // La rúbrica exige que al menos una ruta devuelva HTML
    res.send(`
        <h1>¡Bienvenido a la API!</h1>
        <p>Esta es una respuesta HTML generada desde el controlador.</p>
        <p>Ve a <a href="/status">/status</a> para ver la respuesta JSON.</p>
        <p>O ve a <a href="/index.html">/index.html</a> para ver el archivo estático.</p>
    `);
};

// Controlador para la ruta (/status)
const getStatus = (req, res) => {
    // La rúbrica exige que al menos una ruta devuelva JSON
    res.json({
        status: "success",
        message: "El servidor Node.js y Express está funcionando perfectamente.",
        timestamp: new Date().toISOString()
    });
};

// Exportamos las funciones para usarlas en las rutas
module.exports = {
    getHome,
    getStatus
};