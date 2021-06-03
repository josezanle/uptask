const express = require("express");
const routes = require("./routes");
const path = require("path");

// init del server
const app = express();

//public
app.use(express.static("public"));

// habilitar pug
app.set("view engine", "pug");

// añadir estaticos
app.set("views", path.join(__dirname, "./views"));

// seteamos el puerto
const port = process.env.PORT || 4000;

// rutas
app.use("/", routes());

app.listen(port, console.log(`Server corriendo en el puerto ${port}`));
