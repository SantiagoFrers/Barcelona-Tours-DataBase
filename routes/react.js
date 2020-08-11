const express = require('express');
const router = express.Router();
const reactController = require ('../controllers/reactController');

/* API CON TOTAL DE PRODUCTOS/USUARIOS/CATEGORIA */
router.get('/items', reactController.items);

/* API CON DETALLE DE ULTIMO PRODUCTO */
router.get('/ultimoProducto', reactController.ultimoProducto);

/* API CON CATEGORIA DE PRODUCTOS Y TOTAL DE CADA UNA */
router.get('/categoriasProductos', reactController.categoriasProductos);

/* API CON LISTADO DE PRODUCTOS */
router.get('/listadoProductos', reactController.listadoProductos);

module.exports = router;