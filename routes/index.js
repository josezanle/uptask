const express = require("express");
const router = express.Router();
const {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
  proyectoPorUrl,
  formularioEditar,
  actualizarProyecto,
  eliminarProyecto,
} = require("../controllers/proyectosController");

const tareasController = require("../controllers/tareasController");

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

  // ruta para traer un proyecto por url
  router.get("/proyectos/:url", proyectoPorUrl);

  // ruta para actualizar un proyecto
  router.get("/proyecto/editar/:id", formularioEditar);

  // ruta para postear proyecto
  router.post(
    "/nuevo-proyecto/:id",
    body("nombre").not().isEmpty().trim().escape(),
    actualizarProyecto
  );

  // eliminar proyecto
  router.delete("/proyectos/:url", eliminarProyecto);

  // post de tareas
  router.post("/proyectos/:url", tareasController.agregarTarea);

  // actualizar una tarea
  router.patch("/tareas/:id", tareasController.cambiarEstadoTarea);

  // eliminar una tarea
  router.delete("/tareas/:id", tareasController.eliminarTarea);

  return router;
};
