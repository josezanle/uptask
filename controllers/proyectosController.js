const Proyectos = require("../models/Proyectos");

// Traer todos los registros
exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

// ====================================================================================

exports.formularioProyecto = async (req, res) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos,
    proyecto,
  });
};
// ====================================================================================
// Crear un nuevo Proyecto
exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();

  const nombre = req.body.nombre;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al proyecto" });
  }

  // si hay errores
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    // no hay errores
    // insertar en la bd

    await Proyectos.create({ nombre, url });
    res.redirect("/");
  }
};

// =================================================================================
// Consulta db con GET, pero dinamicamente
exports.proyectoPorUrl = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  if (!proyecto) return next();

  // si hay proyecto
  res.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyecto,
    proyectos,
  });
};

// ================================================================================
// controlador para editar

exports.formularioEditar = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  if (!proyecto) return next();

  // si hay proyecto
  res.render("nuevoProyecto", {
    nombrePagina: "Tareas del proyecto",
    proyectos,
    proyecto,
  });
};

// =============================================================================

exports.actualizarProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();

  const nombre = req.body.nombre;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al proyecto" });
  }

  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
    º;
  } else {
    // no hay errores
    // insertar en la bd
    await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id } }
    );
    res.redirect("/");
  }
};
