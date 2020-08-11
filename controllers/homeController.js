const db = require ("../database/models")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: async (req, res) => {
			await db.tours.findAll({
			where:{ vista_home: "buscados" } })
			.then(function(buscados){
				db.tours.findAll({
					where:{ vista_home: "recomendados" } })
					.then(function(recomendados){
				res.render('index', {buscados:buscados, recomendados:recomendados});
			})
	})
},

}

module.exports = controller;