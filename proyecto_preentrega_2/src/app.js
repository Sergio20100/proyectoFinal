import express from "express";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";

// Importación de enrutadores
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerViewHome from "./routes/home.view.router.js";
// Se crea una instancia de la aplicación Express
const app = express();
// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Declaración de archivos estáticos desde la carpeta 'public'
// en la ruta 'http://localhost:8080/api/public'
app.use("/api/public", express.static("./src/public"));

// Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));

// Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());
// Configuración del motor de plantillas
configHandlebars(app);
// Declaración de rutas
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use("/", routerViewHome);
// Control de rutas inexistentes
app.use("*", (req, res) => {
    try {
        res.render("error404", { title: "PageNotFound" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});


// Se levanta el servidor oyendo en el puerto definido
const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});
// Configuración del servidor de websocket
configWebsocket(httpServer);

