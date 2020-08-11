var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");
const {
  check,
  validationResult,
  body
} = require("express-validator");

/* LEVANTAR IMAGEN */
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/images/actividades/'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage,
})

// Require de Middlewares
const permisosMiddleware = require('../middlewares/permisosMiddleware');

//SECCIONES PRODUCTOS

router.get('/', productsController.root);
router.get('/seccion/:seccionId', productsController.seccion);

//DETALLE PRODUCTO
router.get("/detalle/:productId", productsController.detalle);
router.post("/detalle/:productId", productsController.reserva)

//CREAR PRODUCTO
router.get("/crear", permisosMiddleware.admin, productsController.crear);
router.post("/crear", upload.any(), [
  check('nombre').isLength({
    min: 5
  }).withMessage("El nombre tiene que contener un minimo de 2 caracteres"),
  check('precio').isNumeric().withMessage('El precio debe ser un número'),
  check('descripcionCorta').isLength({
    min: 15
  }).withMessage("La descripción debe tener por lo menos 15 carácteres"),
  check('descripcion').isLength({
    min: 40
  }).withMessage("La descripción debe tener por lo menos 40 carácteres"),
  check("image").custom((value, {
    req
  }) => {
    if (req.files[0]) {
      var image = req.files[0].mimetype;
      if (image == "image/jpeg" || image == "image/png" || image == "image/jpg") {
        return true;
      } else {
        throw new Error("La imagen chica debe ser .jpg, .jpeg, .png o .gif");
      }
    } else {
      return true;
    }
  }),
  check("imageGrande").custom((value, {
    req
  }) => {
    if (req.files[1]) {
      var imageGrande = req.files[1].mimetype;
      if (imageGrande == "image/jpeg" || imageGrande == "image/png" || imageGrande == "image/jpg") {
        return true;
      } else {
        throw new Error("La imagen grande debe ser .jpg, .jpeg, .png o .gif");
      }
    } else {
      return true;
    }
  }),

  body('vistaHome').custom((value, {
    req
  }) => {
    if (value == "") {
      throw new Error("Debes seleccionar una opción");
    }
    return true;
  }),
  body('categoria').custom((value, {
    req
  }) => {
    if (value == "") {
      throw new Error("Debes seleccionar una categoría");
    }
    return true;
  })

], productsController.guardar);

//EDITAR PRODUCTO
router.get('/editar/:productId', permisosMiddleware.admin, productsController.editar);
router.post('/editar/:productId', upload.any(), [
  check('nombre').isLength({
    min: 5
  }).withMessage("El nombre tiene que contener un minimo de 2 caracteres"),
  check('precio').isNumeric().withMessage('El precio debe ser un número'),
  check('descripcionCorta').isLength({
    min: 15
  }).withMessage("La descripción debe tener por lo menos 15 carácteres"),
  check('descripcion').isLength({
    min: 40
  }).withMessage("La descripción debe tener por lo menos 40 carácteres"),
  body('vistaHome').custom((value, {
    req
  }) => {
    if (value == "") {
      throw new Error("Debes seleccionar una opción");
    }
    return true;
  }),
  body('categoria').custom((value, {
    req
  }) => {
    if (value == "") {
      throw new Error("Debes seleccionar una categoría");
    }
    return true;
  }),
  check("avatar").custom((value, {
    req
  }) => {
    if (req.files[0]) {
      var avatar = req.files[0].mimetype;
      if (avatar == "image/jpeg" || avatar == "image/png" || avatar == "image/jpg" || avatar == "image/gif") {
        return true;
      } else {
        throw new Error("La imagen debe ser .jpg, .jpeg, .png o .gif");
      }
    } else {
      return true;
    }
  }),
], productsController.actualizado);


//ELIMINAR PRODUCTO
router.get('/eliminar/:productId', permisosMiddleware.admin, productsController.editar);
router.delete('/eliminar/:productId', productsController.eliminar);

//BUSQUEDA PRODUCTO
router.get('/busqueda/:productSearch', productsController.busqueda);

module.exports = router;