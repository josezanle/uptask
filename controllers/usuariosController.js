const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear cuenta en Uptask",
  });
};

// iniciar session
exports.formIniciarSesion = (req, res) => {
  const { error } = res.locals.mensajes;
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar Sesion en Uptask",
    error,
  });
};

// ====================================================
exports.crearCuenta = async (req, res) => {
  // leer los datos del form
  const { email, password } = req.body;

  try {
    // crear y enviar ala bd
    await Usuarios.create({
      email,
      password,
    });
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    ),
      res.render("crearCuenta", {
        mensajes: req.flash(),
        nombrePagina: "Crear cuenta en Uptask",
        email,
        password,
      });
  }
};
// ========================================================

exports.formRestablecerPassword = (req, res) => {
  res.render('reestablecer',{
    nombrePagina:'Reestablecer tu contraseña'
  })
}

