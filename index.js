const express = require("express");
const routes = require("./routes");
const path = require("path");

// helpers con algunas funciones
const helpers = require("./helpers");

// crear conexion db
const db = require("./config/db");

// importar modelo
require("./models/Proyectos");
require("./models/Tareas");

db.sync()
  .then(() => console.log("conectado al servidor"))
  .catch((error) => console.log(error));

// init del server
const app = express();

//public
app.use(express.static("public"));

// habilitar pug
app.set("view engine", "pug");

// añadir vistas
app.set("views", path.join(__dirname, "./views"));

// parseo de la data
app.use(express.urlencoded({ extended: true }));

// Pasar var dump a la aplicación
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

// seteamos el puerto
const port = process.env.PORT || 4000;

// rutas
app.use("/", routes());

app.listen(port, console.log(`Server corriendo en el puerto ${port}`));
