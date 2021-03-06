const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

// Traer todos los registros
exports.proyectosHome = async (req, res) => {
  const usuarioId = res.locals.usuario.id
  try {
    const proyectos = await Proyectos.findAll({where: { usuarioId  }});
    res.render("index", {
      nombrePagina: "Proyectos",
      proyectos,
    });
  } catch (error) {
    console.log(error);
    throw new Error("error en home");
  }
};

// ====================================================================================

exports.formularioProyecto = async (req, res) => {
  
  const usuarioId = res.locals.usuario.id
  const proyectos = await Proyectos.findAll({where: { usuarioId  }});

  res.render('nuevoProyecto', {
      nombrePagina: 'Nuevo Proyecto',
      proyectos
  })
};
// ====================================================================================
// Crear un nuevo Proyecto
exports.nuevoProyecto = async (req, res) => {
  const usuarioId = res.locals.usuario.id
  try {
    const proyectos = await Proyectos.findAll({where: { usuarioId  }});;

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
      const usuarioId = res.locals.usuario.id
      await Proyectos.create({ nombre,usuarioId });
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    throw new Error("error en nuevo proyecto");
  }
};

// =================================================================================
// Consulta db con GET, pero dinamicamente
exports.proyectoPorUrl = async (req, res, next) => {
  const usuarioId = res.locals.usuario.id

  try {
    const proyectosPromise = Proyectos.findAll({where: { usuarioId  }});;
    const proyectoPromise = Proyectos.findOne({
      where: {
        url: req.params.url,
      },
    });

    const [proyectos, proyecto] = await Promise.all([
      proyectosPromise,
      proyectoPromise,
    ]);

    // consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
      where: {
        proyectoId: proyecto.id,
      },
    });

    if (!proyecto) return next();

    // si hay proyecto
    res.render("tareas", {
      nombrePagina: "Tareas del proyecto",
      proyecto,
      proyectos,
      tareas,
    });
  } catch (error) {
    console.log(error);
    throw new Error("error en proyecto por url");
  }
};

// ================================================================================
// controlador para editar

exports.formularioEditar = async (req, res, next) => {
  const usuarioId = res.locals.usuario.id
  try {
    const proyectosPromise = Proyectos.findAll({where: { usuarioId  }});
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
  } catch (error) {
    console.log(error);
    throw new Error("error en formulario editar");
  }
};

// =============================================================================

exports.actualizarProyecto = async (req, res) => {
  const usuarioId = res.locals.usuario.id

  try {
    const proyectos = await Proyectos.findAll({where: { usuarioId  }});

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
    } else {
      // no hay errores
      // insertar en la bd
      await Proyectos.update(
        { nombre: nombre },
        { where: { id: req.params.id } }
      );
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    throw new Error("error en actualizar proyecto");
  }
};

// ==============================================================================

// eliminar proyecto
exports.eliminarProyecto = async (req, res) => {
  try {
    const { urlProyecto } = req.query;
    await Proyectos.destroy({ where: { url: urlProyecto } });

    res.send("Proyecto eliminado");
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo eliminar");
  }
};
