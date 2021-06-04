const express = require("express");
const routes = require("./routes");
const path = require("path");

// init del server
const app = express();

// crear conexion db
const db = require("./config/db");

// importar modelo
require("./models/Proyectos");

db.sync()
  .then(() => console.log("conectado al servidor"))
  .catch((error) => console.log(error));

// parseo de la data
app.use(express.urlencoded());

//public
app.use(express.static("public"));

// habilitar pug
app.set("view engine", "pug");

// añadir vistas
app.set("views", path.join(__dirname, "./views"));

// seteamos el puerto
const port = process.env.PORT || 4000;

// rutas
app.use("/", routes());

app.listen(port, console.log(`Server corriendo en el puerto ${port}`));
