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
