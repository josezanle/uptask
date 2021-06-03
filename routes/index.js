const express = require("express");
const {
  proyectosHome,
  nosotros,
  formularioProyecto,
  nuevoProyecto,
} = require("../controllers/proyectosController");
const router = express.Router();

module.exports = function () {
  // ruta para el home
  router.get("/", proyectosHome);

  // ruta para traer proyecto
  router.get("/nuevo-proyecto", formularioProyecto);

  // ruta para postear proyecto
  router.post("/nuevo-proyecto", nuevoProyecto);

  return router;
};
