const express = require("express");
const router = express.Router();
const {
  proyectosHome,
  nosotros,
  formularioProyecto,
  nuevoProyecto,
  proyectoPorUrl,
  formularioEditar,
  actualizarProyecto,
} = require("../controllers/proyectosController");

const { body } = require("express-validator");

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

  // ruta para traer un proyecto por id
  router.get("/proyectos/:url", proyectoPorUrl);

  // ruta para actualizar un proyecto
  router.get("/proyecto/editar/:id", formularioEditar);

  // ruta para postear proyecto
  router.post(
    "/nuevo-proyecto/:id",
    body("nombre").not().isEmpty().trim().escape(),
    actualizarProyecto
  );

  return router;
};
