const db = require("../database/models")
const bcrypt = require("bcrypt");
const {
	check,
	validationResult,
	body
} = require("express-validator");

/* Detalle productos */
let productosController = {

	/* VER TODOS LOS PRODUCTOS */

	root: (req, res) => {
		let mostrarBotones = req.session.usuarioLogueado
		db.tours.findAll()
			.then(function (tours) {
				res.render('todosProductos', {
					mostrarBotones,
					tours: tours
				});
			})
	},

	/* VER UN RUBRO ESPECIFICO DE PRODUCTOS */
	seccion: async (req, res) => {
		let mostrarBotones = req.session.usuarioLogueado;
		let categoriaFind = req.params.seccionId;
		let seccion;

		await db.sequelize.query(
				`SELECT tours.id as idtour,
		tours.nombre,
		tours.precio,
		tours.tour_tipo,
		tours.vista_home,
		tours.descripcion,
		tours.descripcion_corta,
		tours.image,
		tours.image_grande
	FROM btours_db.tours
	left join tours_type on tour_tipo = tours_type.id
			where tours_type.tipo = "${req.params.seccionId}"`)

			.then(function (resultado) {
				seccion = resultado[0]
			});

		res.render('seccproductos', {
			seccion,
			mostrarBotones,
			categoriaFind
		})
	},

	/* INGRESAR DENTRO DE LA FICHA DE UN PRODUCTO */
	detalle: (req, res) => {
		let botonReserva = req.session.usuarioLogueado;
		db.tours.findByPk(req.params.productId)
			.then(function (productFind) {
				res.render('productos', {
					productFind: productFind,
					botonReserva
				})
			})
	},

	reserva: (req, res) => {
		var ordenCompra = Math.floor(Math.random() * 1000);
		db.tours_reservados.create({
			orden_de_compra: ordenCompra,
			user_id: req.session.usuarioLogueado.id,
			tour_id: req.params.productId,
			cant_adultos: req.body.cantidadAdultos,
			fecha_tour: new Date(),
			horario: req.body.horarioTour,
			estado_reserva: "Pendiente"
		}).then(function () {
			res.redirect('/carrito')
		});;
	},

	/* CREAR PRODUCTO */
	crear: function (req, res) {
		res.render("cargaProducto", {
			title: "Nueva actividad"
		});
	},

	/* GUARDAR UN PRODUCTO CREADO */

	guardar: (req, res, next) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			db.tours.create({
				id: "",
				nombre: req.body.nombre,
				precio: req.body.precio,
				descripcion: req.body.descripcion,
				descripcion_corta: req.body.descripcionCorta,
				image: req.files[0].filename,
				image_grande: req.files[1].filename,
				vista_home: req.body.vistaHome,
				tour_tipo: req.body.categoria
			});
			res.redirect("/");
		} else {
			res.render("cargaProducto", {
				errors: errors.errors
			});
		}
	},

	/* EDITAR UN PROUDCTO */
	editar: (req, res, next) => {

		db.tours.findByPk(req.params.productId)
			.then(function (productToEdit) {
				res.render('editDelete', {
					productToEdit
				})
			})
	},

	actualizado: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			db.tours.update({
					nombre: req.body.nombre,
					precio: req.body.precio,
					descripcion: req.body.descripcion,
					descripcion_corta: req.body.descripcionCorta,
					image: req.files[0].filename,
					image_grande: req.files[1].filename,
					vista_home: req.body.vistaHome,
					tour_tipo: req.body.categoria
				}, {
					where: {
						id: req.params.productId
					}
				})
				.then(function () {
					res.redirect('/')
				})
		} else {
			let productToEdit = req.params.productId;
			res.render("editDelete", {
				productToEdit,
				errors: errors.errors
			});
		}

	},

	eliminar: (req, res) => {
		db.tours.destroy({
				where: {
					id: req.params.productId
				}
			})
			.then(function () {
				res.redirect('/')
			})
	},

	busqueda: async function(req, res, next) {
		let toursEncontrados;
		let parametrosBusqueda = (req.params.productSearch).replace(/ /g, "%")
		console.log(parametrosBusqueda)

		await db.sequelize.query(`SELECT tours.id,
		tours.nombre,
		tours.precio,
		tours.tour_tipo,
		tours.vista_home,
		tours.descripcion,
		tours.descripcion_corta,
		tours.image,
		tours.image_grande
			FROM btours_db.tours
				where tours.nombre like "%${parametrosBusqueda}%"
				or tours.descripcion like "%${parametrosBusqueda}%"
				or tours.descripcion_corta like "%${parametrosBusqueda}%"`)

		.then(function(resultado){toursEncontrados = resultado[0]});

		res.render("buscador", {
			toursEncontrados
		});
	  }
};

module.exports = productosController;