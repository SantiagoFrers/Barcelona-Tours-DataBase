const express = require('express');
const router = express.Router();
const apisController = require ('../controllers/apisController');

/* API CON LISTADO DE USUARIOS */
router.get('/users', apisController.users);

/* API CON DETALLE DE USUARIO */
router.get('/users/:id', apisController.usersId);

/* API CON LISTADO DE PRODUCTOS */
router.get('/products', apisController.products);

/* API CON DETALLE DE PRODUCTO */
router.get('/products/:id', apisController.productsId);

module.exports = router;