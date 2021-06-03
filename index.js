const express = require("express");
const routes = require("./routes");
const path = require("path");

// crear conexion db
const db = require("./config/db");

// importar modelo
const Proyectos = require("./models/Proyectos");

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

// seteamos el puerto
const port = process.env.PORT || 4000;

// parseo de la data
app.use(express.json());

// rutas
app.use("/", routes());

app.listen(port, console.log(`Server corriendo en el puerto ${port}`));
