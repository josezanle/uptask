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

const {
  formCrearCuenta,
  crearCuenta,
  formIniciarSesion,
} = require("../controllers/usuariosController");
const { autenticarUsuario, usuarioAutenticado } = require("../controllers/authController");

module.exports = function () {
  // ruta para el home
  router.get("/",
    usuarioAutenticado,
    proyectosHome);

  // ruta para traer proyecto
  router.get("/nuevo-proyecto",
    usuarioAutenticado,
    formularioProyecto);

  // ruta para postear proyecto
  router.post(
    "/nuevo-proyecto",
    usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    nuevoProyecto
  );

  // ruta para traer un proyecto por url
  router.get("/proyectos/:url",
    usuarioAutenticado,
    proyectoPorUrl);

  // ruta para actualizar un proyecto
  router.get("/proyecto/editar/:id",
    usuarioAutenticado,
    formularioEditar);

  // ruta para postear proyecto
  router.post(
    "/nuevo-proyecto/:id",
    usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    actualizarProyecto
  );

  // eliminar proyecto
  router.delete("/proyectos/:url",
    usuarioAutenticado,
    eliminarProyecto);

  // =========================================================

  // post de tareas
  router.post("/proyectos/:url",
    usuarioAutenticado,
    tareasController.agregarTarea);

  // actualizar una tarea
  router.patch("/tareas/:id",
    usuarioAutenticado,
    tareasController.cambiarEstadoTarea);

  // eliminar una tarea
  router.delete("/tareas/:id",
    usuarioAutenticado,
    tareasController.eliminarTarea);

  // ============================================================
  // crear una nueva cuenta
  router.get("/crear-cuenta", formCrearCuenta);
  router.post("/crear-cuenta", crearCuenta);

  // iniciar session
  router.get("/iniciar-sesion", formIniciarSesion);
  router.post("/iniciar-session", autenticarUsuario);

  // cerrar sesion
  router.get('/cerrar-sesion',)
  
  return router;
};
