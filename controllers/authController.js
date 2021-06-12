const passport = require("passport");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-session",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});
