const passport = require("passport");
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

// funcion para rvisar si el usuario esta logueado o no
exports.usuarioAutenticado = ( req, res, next) => {
  //  si esta autenticado
  if(req.isAuthenticated()){
    return next() 
  }else{
     // si no, redirigir al formulario
  return res.redirect('/iniciar-sesion')
  }
 
}

// ======================================================

// funcion para cerrar sesion
exports.cerrarSession = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/iniciar-sesion')
  })
}

// =================================================================

// genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {

  // verificar que el usuario existe
  const {email} = req.body
  const usuario = await Usuarios.findOne({where: { email }});

  // Si no existe el usuario
  if(!usuario) {
      req.flash('error', 'No existe esa cuenta');
      res.redirect('/reestablecer');
  }

  // usuario existe
  usuario.token = crypto.randomBytes(20).toString('hex');
  usuario.expiracion = Date.now() + 3600000;

  // guardarlos en la base de datos
  await usuario.save();

  // url de reset
  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

  // Enviar el Correo con el Token
  await enviarEmail.enviar({
      usuario,
      subject: 'Password Reset', 
      resetUrl, 
      archivo : 'reestablecer-password'
  });

  // terminar
  req.flash('correcto', 'Se envió un mensaje a tu correo');
  res.redirect('/iniciar-sesion');
}

// reset password
exports.validarToken = async(req,res) => {
  const usuario = await Usuarios.findOne({
    where: {
        token: req.params.token
    }
});

if(!usuario){
  req.flash('error','No valido');
  res.redirect('/reestablecer');
}
// formulario para generar el password
res.render('resetPassword',{
  nombrePagina: 'Reestablecer Contraseña'
})
}

// =====================================================================

exports.actualizarPassword = async(req,res) => {
// verifica si el token es valido y la fecha de expiracion

const usuario = await Usuarios.findOne({
  where:{
    token:req.params.token,
    expiracion: {
      [Op.gte] : Date.now()
    }
  }
});

// verifica si el usuario existe
if(!usuario){
  req.flash('error','No valido');
  res.redirect('/reestablecer');
}

// hashear el nuevo password
usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
usuario.token = null;
usuario.expiracion = null;

// guardamos el nuevo password
await usuario.save()

req.flash('correcto', 'Tu password se ha modificado correctamente');
res.redirect('/iniciar-sesion');





}