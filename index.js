const express = require("express");
const routes = require("./routes");
const path = require("path");
const flash = require('connect-flash')
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const passport = require('./config/passport');

// helpers con algunas funciones
const helpers = require("./helpers");

// crear conexion db
const db = require("./config/db");

// importar modelo
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

db.sync()
  .then(() => console.log("conectado al servidor"))
  .catch((error) => console.log(error));

// init del server
const app = express();

// parseo de la data
app.use(express.urlencoded({ extended: true }));

//public
app.use(express.static("public"));

// habilitar pug
app.set("view engine", "pug");

// añadir vistas
app.set("views", path.join(__dirname, "./views"));

// flash messages
app.use(flash())

app.use(cookieParser());

// sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({ 
  secret: "keyboard cat", 
  resave: false, 
  saveUninitialized: false 
}));

// Pasar var dump a la aplicación
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  next();
});

// seteamos el puerto
const port = process.env.PORT || 4000;

// rutas
app.use("/", routes());

app.listen(port, console.log(`Server corriendo en el puerto ${port}`));
