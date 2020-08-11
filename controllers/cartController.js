const db = require ("../database/models")

const controllerController = {
    carrito: async function (req, res) {

        let recomendados;

        await db.tours.findAll({
            where:{ vista_home: "recomendados" } })
            .then(function(resultado){ recomendados = resultado})

        db.sequelize.query(`select sum(precio) as sumaTours from tours_reservados
        left join tours on tour_id = tours.id
        where user_id = ${req.session.usuarioLogueado.id} and estado_reserva = "Pendiente" `)
        .then(function (suma) {
            var sumaCarrito = suma[0];

        db.sequelize.query(`select * from tours_reservados
        left join tours on tour_id = tours.id
        where user_id = ${req.session.usuarioLogueado.id} and estado_reserva = "Pendiente" `)
        .then(function (compras) {
        let carrito = compras[0];

        res.render('carrito', {carrito, sumaCarrito,recomendados})
        })});
      },

    compra: async function (req, res) {
        db.tours_reservados.update({
            estado_reserva: "Reservado"
        },{
            where:{
                user_id: req.session.usuarioLogueado.id,
                orden_de_compra: req.body.idOculto
            }
        }).then (function ()
        {res.redirect('/carrito')})
    },

    quitar: async function (req, res) {
        await db.tours_reservados.update({
            estado_reserva: "Baja"
        },{
            where:{
                user_id: req.session.usuarioLogueado.id,
                orden_de_compra: req.body.idOculto
            }
        }).then (function ()
        {res.redirect('/carrito')})
    }

};

module.exports = controllerController;