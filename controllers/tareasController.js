const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

// Ontenemos el proyecto actual
exports.agregarTarea = async (req, res, next) => {
  const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

  // leer valor del input
  const { tarea } = req.body;

  //   relacion creada por el belongsTo
  //   estado 0 = incompleto y  ID deproyecto
  const estado = 0;
  const proyectoId = proyecto.id;

  // insertar en la base de datos
  const resultado = await Tareas.create({ tarea, estado, proyectoId });
  if (!resultado) {
    return next();
  }

  // redireccionar

  res.redirect(`/proyectos/${req.params.url}`);
};

// =====================================================================

exports.cambiarEstadoTarea = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tareas.findOne({ where: { id } });

    // cambiar estado
    let estado = 0;
    if (tarea.estado === estado) {
      estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();
    if (!resultado) return next();

    res.status(200).send("Actualizado");
  } catch (error) {
    console.log(error);
    throw new Error("Error en el controlador: cambiarEstadoTarea");
  }
};

// =====================================================================

exports.eliminarTarea = async (req, res) => {
  res.send("eliminando");
};
