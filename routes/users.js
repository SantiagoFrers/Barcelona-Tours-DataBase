var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const path = require('path');
const {
  check,
  validationResult,
  body
} = require("express-validator");
const multer = require("multer");
const userController = require("../controllers/userController");

//Almacenamiento de Avatar
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/avatar'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage,
})

// Require de Middlewares
const permisosMiddleware = require('../middlewares/permisosMiddleware');

//RUTAS
/* GET users listing. */
router.get('/', userController.root);

//CREAR CUENTA Y GUARDAR
router.get("/registrar", userController.crear);
router.post("/registrar", upload.any(), [
  check("nombre")
  .isLength({
    min: 2
  })
  .withMessage("El nombre tiene que contener un minimo de 2 caracteres"),
  check("apellido")
  .isLength({
    min: 2
  })
  .withMessage("El apellido tiene que contener un minimo de 2 caracteres"),
  check("email")
  .isEmail()
  .withMessage("El mail debe ser válido"),
  check('emailconfirm').isEmail()
  .withMessage("El mail debe ser válido"),
  body("emailconfirm").custom((value, {
    req
  }) => {
    if (value !== req.body.email) {
      throw new Error("Los emails no coinciden");
    }
    return true;
  }),
  //Validacion de contrasenas
  check("pass")
  .isLength({
    min: 8
  })
  .withMessage("La contraseña tiene que tener al menos 8 caracteres"),
  check("passconfirm")
  .isLength({
    min: 8
  })
  .withMessage("La contraseña tiene que tener al menos 8 caracteres"),
  check("avatar").custom((value, {
    req
  }) => {
    if (req.files[0]) {
      var avatar = req.files[0].mimetype;
      if (avatar == "image/jpeg" || avatar == "image/png" || avatar == "image/jpg") {
        return true;
      } else {
        throw new Error("El avatar debe ser .jpg, .jpeg, .png o .gif");
      }
    } else {
      return true;
    }
  }),
  body("pass").custom((value, {
    req
  }) => {
    if (value !== req.body.passconfirm) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  })
], userController.crearUsuario);

//INGRESAR CUENTA
router.get("/ingresar", userController.login);
router.post("/ingresar", [
  check("email")
  .isEmail()
  .withMessage("El mail debe ser válido"),
  //Validacion de contrasena
  check("pass")
  .isLength({
    min: 8
  })
  .withMessage("La contraseña tiene que tener al menos 8 caracteres"),

], userController.iniciarSesion);

//CERRAR SESION
router.get("/cerrar", userController.cerrar);

//EDITAR CUENTA Y GUARDAR
router.get("/editar/:idUser", permisosMiddleware.user, userController.editar);
router.post("/editar/:idUser", userController.editarUsuario);

//ELIMINAR CUENTA
router.get("/eliminar/:idUser", permisosMiddleware.user, userController.eliminar);
router.post("/eliminar/:idUser", userController.eliminarUsuario);

//VALIDAR EXISTENCIA DEL MAIL DESDE JS FRONT
router.get("/getemails/:emailparavalidar", userController.validarFrontJS);

module.exports = router;