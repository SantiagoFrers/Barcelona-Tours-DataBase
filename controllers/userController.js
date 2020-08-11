
const bcrypt = require("bcrypt");
const {
    check,
    validationResult,
    body
} = require("express-validator");

const db = require ("../database/models");


let userController = {

    root: function (req, res) {
        if (req.session.usuarioLogueado == undefined) {
            res.redirect("/users/ingresar")
        } else {
            res.redirect(`/users/editar/${req.session.usuarioLogueado.id}`)
        };
    },
    //REQUIERO FORMULARIO DE REGISTRO
    crear: function (req, res) {
        res.render("createAccount", {
            title: "Registrar"
        });
    },
    //GUARDO EL NUEVO USUARIO
    crearUsuario: async function (req, res) {
        let usuarioNuevo;
        await db.usuarios.findAll({where : {email: req.body.email}})
        .then(function(resultado){usuarioNuevo = resultado[0]});


        let errors = validationResult(req);

        if (errors.isEmpty()) {
            console.log(usuarioNuevo)
            if (usuarioNuevo == undefined) {
                console.log(usuarioNuevo)
            let encriptacion = bcrypt.hashSync(req.body.pass, 10);
            db.usuarios.create({
            id: "",
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasena: encriptacion,
            user_type: "user",
            avatar:req.files[0].filename
        });
            res.redirect("/");
        } else {
            res.render("signIn", {
                errors: [ {"msg": "El mail ya esta registrado, por favor logueate para acceder"} ]
            });
        }

        } else {
            res.render("createAccount", {
                errors: errors.errors
            });
        }
    },

    //REQUIERO FORMULARIO DE LOGGEO
    login: function (req, res) {
        res.render("signIn", {
            title: "Ingresar"
        });
    },
    //INICIO SESION
    iniciarSesion: async function (req, res) {
        let usuarioIngresando

        await db.sequelize.query(`select * from users
        where email = "${req.body.email}" `)
        .then(function(resultado){usuarioIngresando = resultado[0];
    })
    // Guardo solo la posicion del usuario
    usuarioIngresando = usuarioIngresando[0]

if (usuarioIngresando != undefined) {
            if(bcrypt.compareSync(req.body.password, usuarioIngresando.contrasena)) {
            req.session.usuarioLogueado = usuarioIngresando;
            //COOKIE "recordame"
            if (req.body.recordame != undefined){
            res.cookie('recordame',
            usuarioIngresando , { maxAge: 60000 } );
            }
            res.redirect("/");
            } else {
            res.render("signIn", {
                errors: [ {"msg": "La contraseña ingresada no es válida"} ]
            }) }
        } else {
        res.render("createAccount", {
            errors: [ {"msg": "Esa casilla de mail no esta registada"} ]
        })}
   },

   // CIERRO SESION
   cerrar: function (req, res) {
    let usuarioIngresando = req.session.usuarioLogueado;
    if(req.cookies.recordame != undefined){
    res.cookie('recordame', usuarioIngresando, { maxAge: 0 } )};
    req.session.destroy();
    res.redirect("/")
},

    //REQUIERO FORMULARIO DE CUENTA EXISTENTE
    editar: function (req, res) {
        db.usuarios.findAll({where:{
            id: req.params.idUser
        }})
        .then (function (userToEdit) {
            res.render ("userEdit", {userToEdit: userToEdit} )
        });
    },

    //GUARDO LA EDICION DEL USUARIO
    editarUsuario: function (req, res) {
        db.usuarios.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasena: bcrypt.hashSync(req.body.pass, 10),
            user_type: "user"
        },{
            where: { id: req.params.idUser}
        })
        .then(function(){res.redirect('/')})
    },


    //REQUIERO FORMULARIO DE ELIMINACION DE CUENTA
    eliminar: function (req, res) {
        db.usuarios.findAll({where:{
            id: req.params.idUser
        }})
        .then (function (userToDelete) {
            res.render ("userDelete", {userToDelete: userToDelete} )
        });
    },



    //ELIMINO LA CUENTA
    eliminarUsuario: function (req, res) {
        db.usuarios.destroy({
            where: { id: req.params.idUser}
        })
        .then(function(){res.redirect('/')})
    },

        //VALIDAR EXISTENCIA DEL MAIL DESDE JS FRONT
        validarFrontJS: async function(req, res, next) {
            let base;
            let dbemails = [];
            await db.usuarios.findAll()
            .then(function(resultado){base = resultado});

            for (let i = 0; i < base.length; i++){
                dbemails.push(base[i].dataValues.email)
            }

            res.json(
                dbemails.includes(req.params.emailparavalidar),
            )
          }

};

module.exports = userController;