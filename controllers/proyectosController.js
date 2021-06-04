const Proyectos = require("../models/Proyectos");
const slug = require("slug");

exports.proyectosHome = (req, res) => {
  res.render("index", {
    nombrePagina: "Proyectos",
  });
};

exports.formularioProyecto = (req, res) => {
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
  });
};

exports.nuevoProyecto = async (req, res) => {
  const nombre = req.body.nombre;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al proyecto" });
  }

  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
    });
  } else {
    // no hay errores
    // insertar en la bd

    const url = slug(nombre).toLowerCase();
    const proyecto = await Proyectos.create({ nombre, url });
    res.redirect("/");
  }
};
