const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// referencia al modelo donde vamos a autenticar
const Usuarios = require("../models/Usuarios");

// local Strategy - login con credenciales propias
passport.use(
  new LocalStrategy(
    // por default passport espera un usuario y password
    {
      usernameField: "email",
      passwordField: "password",
    },
    async ( email, password, done) => {
      try {
        const usuario = await Usuarios.findOne({
          where: {email}});
        // el correo existe, pero el password es incorrecto
        if (!usuario.verificarPassword(password)) {
          return done(null, false, {
            message: "Password incorrecto",
          });
        }

        // el email existe y el password es correcto
        return done(null, usuario);
      } catch (error) {
        // esa cuenta no existe
        return done(null, false, {
          message: "Esa cuenta no existe",
        });
      }
    }
  )
);

// serializar el usuario
passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});

// desserializar el usuario
passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

module.exports = passport;
