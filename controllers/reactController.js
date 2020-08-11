const db = require ("../database/models");
const path = require('path');

const controller = {
/* API CON TOTAL DE PRODUCTOS/USUARIOS/CATEGORIA */
	items: async (req, res) => {
		let productos;
		let usuarios;
		let categorias;

		//TOTAL DE PRODUCTOS
		await db.sequelize.query(`SELECT count(*) as total FROM tours`)
		.then(function(resultado){productos = resultado[0]});

		//TOTAL DE USUARIOS
		await db.sequelize.query(`SELECT count(*) as total FROM users`)
		.then(function(resultado){usuarios = resultado[0]});

		//TOTAL DE CATEGORIAS
		await db.sequelize.query(`SELECT count(*) as total FROM tours_type`)
		.then(function(resultado){categorias = resultado[0]});


		let datos = {
			productos: productos[0].total,
			usuarios: usuarios[0].total,
			categorias: categorias[0].total
		};

		res.json(datos)
			},

	/* API CON LISTADO DE PRODUCTOS */
	ultimoProducto: async (req, res) => {
		let ultimoProducto;
		await db.sequelize.query(`select * from tours order by id desc limit 1`)
		.then(function(resultado){ultimoProducto = resultado[0]});

		res.json(ultimoProducto)
	},

	/* API CON CATEGORIA DE PRODUCTOS Y TOTAL DE CADA UNA */
	categoriasProductos:async (req, res) => {
		let categoriasProductos;
		await db.sequelize.query(`select * from tours_type`)
		.then(function(resultado){categoriasProductos = resultado[0]});

		res.json(categoriasProductos)
	},

	/* API CON LISTADO DE PRODUCTOS */
	listadoProductos:async (req, res) => {
		let listadoProductos;
		await db.sequelize.query(`select * from tours`)
		.then(function(resultado){listadoProductos = resultado[0]});

		res.json(listadoProductos)
	},

}

module.exports = controller;