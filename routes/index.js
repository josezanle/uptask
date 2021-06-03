const express = require("express");
const {
  proyectosHome,
  nosotros,
  formularioProyecto,
} = require("../controllers/proyectosController");
const router = express.Router();

module.exports = function () {
  // ruta para el home
  router.get("/", proyectosHome);

  // ruta para nuevo proyecto
  router.get("/nuevo-proyecto", formularioProyecto);

  return router;
};
