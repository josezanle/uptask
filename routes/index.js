const express = require("express");
const router = express.Router();
const {
  proyectosHome,
  nosotros,
  formularioProyecto,
  nuevoProyecto,
} = require("../controllers/proyectosController");

const { body } = require("express-validator/check");

module.exports = function () {
  // ruta para el home
  router.get("/", proyectosHome);

  // ruta para traer proyecto
  router.get("/nuevo-proyecto", formularioProyecto);

  // ruta para postear proyecto
  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    nuevoProyecto
  );

  return router;
};
