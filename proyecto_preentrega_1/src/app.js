import express from "express";

// Importación de enrutadores
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";

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

// Declaración de rutas
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

// Control de rutas inexistentes
app.use("*", (req, res) => {
    return res.status(404).send('<h1>404 PAGE NOT FOUND </h1>');
});


// Se levanta el servidor oyendo en el puerto definido
app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});


//         return res.status(400).send({ status: "error", message: "Archivo no encontrado" });