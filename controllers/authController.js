const passport = require("passport");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-session",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

// funcion para rvisar si el usuario esta logueado o no
exports.usuarioAutenticado = ( req, res, next) => {
  //  si esta autenticado
  if(req.isAuthenticated()){
    return next() 
  }
  // si no, redirigir al formulario
  return res.redirect('/iniciar-sesion')
}

// ======================================================

// funcion para cerrar sesion
exports.cerrarSession = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/iniciar-sesion')
  })
}
