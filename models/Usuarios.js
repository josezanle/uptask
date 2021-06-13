const Sequelize = require("sequelize");
const db = require("../config/db");
const Proyectos = require("./Proyectos");
const bcrypt = require("bcrypt-nodejs");

const Usuarios = db.define(
  "usuarios",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validated: {
        isEmail: {
          msg: "Agrega un correo valido",
        },
        notEmpty: {
          msg: "El Email no puede ir vacio",
        },
      },
      unique: {
        args: true,
        msg: "Usuario ya regitrado",
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validated: {
        notEmpty: {
          msg: "El Password no puede ir vacio",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);

// metodos personalizados
Usuarios.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
