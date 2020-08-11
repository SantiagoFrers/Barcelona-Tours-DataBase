const db = require ("../database/models");
const path = require('path');

const controller = {
	/* API CON LISTADO DE USUARIOS */
	users: async (req, res) => {
			let base;
			let users = [];
            await db.usuarios.findAll()
            .then(function(resultado){base = resultado});

			// Array con datos de usuarios requeridos
            for (let i = 0; i < base.length; i++){
				users.push({
				"id": base[i].dataValues.id,
				"nombre": base[i].dataValues.nombre,
				"apellido": base[i].dataValues.apellido,
				"email": base[i].dataValues.email,
				"detail": "http://localhost:3030/api/users/" + base[i].dataValues.id
			})
				}
			let usersJSON = {
				count: users.length,
				users: users,
			}

            res.json(
                usersJSON,
			)},

	/* API CON DETALLE DE USUARIO */
	usersId: async (req, res) => {
			let base;
			let usersJSON;
			await db.usuarios.findAll({where:{id: req.params.id}})
            .then(function(resultado){base = resultado});

			// Campos requeridos para detalle de usuario
			if (base == ""){
				usersJSON = "Error: Numero id de usuario inexistente"
			} else {
				usersJSON = {
				"id": base[0].dataValues.id,
				"nombre": base[0].dataValues.nombre,
				"apellido": base[0].dataValues.apellido,
				"email": base[0].dataValues.email,
				"avatarURL": "/public/avatar/" + base[0].dataValues.avatar
			}}

            res.json(usersJSON)},

	/* API CON LISTADO DE PRODUCTOS */
	products: async (req, res) => {
		let tours;
		await db.sequelize.query(
		`SELECT tours.id as idtour, tours.nombre, tours.precio, tours.tour_tipo, tours.vista_home, tours.descripcion, tours.descripcion_corta, tours.image, tours.image_grande, tours_type.id as toursTypeId, tipo
		FROM btours_db.tours left join tours_type on tour_tipo = tours_type.id`)
		.then(function (resultado) {
			tours = resultado[0]
		});

		// Contamos cuantos tours hay por cada tipo
		let busqueda;
		await db.sequelize.query(
			`select tipo, count(tipo) as count
			from btours_db.tours_type
			inner join btours_db.tours on tour_tipo = tours_type.id
			group by tipo`)
			.then(function (resultado) {
				countByCategory = resultado[0]
			});

		// Objeto con datos de usuarios requeridos
		let toursFiltrados = [];
		for (let i = 0; i < tours.length; i++){
			toursFiltrados.push({
				"id": tours[i].idtour,
				"name": tours[i].nombre,
				"description": tours[i].descripcion,
				"relacion": [{"id": tours[i].toursTypeId, "tipo": tours[i].tipo}],
				"detail": "http://localhost:3030/api/products/" + tours[i].idtour,
			})
		}

 		let productsJSON = {
			count: tours.length,
			countByCategory: countByCategory,
			products: toursFiltrados
		}

		res.json(productsJSON)
	},

	/* API CON DETALLE DE PRODUCTO */
	productsId:async (req, res) => {
		let base;
		let toursJSON;
		await db.sequelize.query(
			`SELECT tours.id as idtour, tours.nombre, tours.precio, tours.tour_tipo, tours.vista_home, tours.descripcion, tours.descripcion_corta, tours.image, tours.image_grande, tours_type.id as toursTypeId, tipo
			FROM btours_db.tours left join tours_type on tour_tipo = tours_type.id
			where tours.id = ${req.params.id}`)
			.then(function (resultado) {
				base = resultado[0]
			});

		// ARRAY con relacion
		let arrayProducts = [{
			"toursTypeId": base[0].toursTypeId,
			"tipo": base[0].tipo 
		}];


		// Campos requeridos para detalle de usuario
		if (base == ""){
			toursJSON = "Error: Numero id de tour inexistente"
		} else {
			toursJSON = {
			"id": base[0].idtour,
			"nombre": base[0].nombre,
			"precio": base[0].precio,
			"tour_tipo": base[0].tour_tipo,
			"vista_home": base[0].vista_home,
			"descripcion": base[0].descripcion,
			"descripcion_corta": base[0].descripcion_corta,
			"relacion": arrayProducts,
			"image": "/public/images/actividades/" + base[0].image,
			"image_grande": "/public/images/actividades/" + base[0].image_grande
		}}

		res.json(toursJSON)},

}

module.exports = controller;