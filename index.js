const express = require("express");
const routes = require("./routes");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
require('dotenv').config({path:'variables.env'})


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

app.use(cookieParser());

// sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// flash messages
app.use(flash());

// Pasar var dump a la aplicación
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  res.locals.usuario = {...req.user} || null;
  next();
});

// rutas
app.use("/", routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port,host, console.log(`Server corriendo en el puerto ${port}`));

