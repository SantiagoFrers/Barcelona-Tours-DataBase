const express = require('express');
const router = express.Router();
const cartController= require ('../controllers/cartController');

// Require de Middlewares
const permisosMiddleware = require ('../middlewares/permisosMiddleware');

//CARRITO
router.get('/', permisosMiddleware.carrito, cartController.carrito);
router.post('/', cartController.compra);
router.put('/', cartController.quitar);

module.exports = router;