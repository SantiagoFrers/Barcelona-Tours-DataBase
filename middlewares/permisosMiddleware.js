// Acceso solo para admins. Puse un if y switch solo para practicar ambos
const permisosMiddleware = {
    admin: (req, res, next) => {
        if (req.session.usuarioLogueado == undefined) {
            res.send("Solo los administradores pueden acceder a este sitio");
        }
        switch (req.session.usuarioLogueado.user_type) {
            case "admin": next();
                break;
            default:
                res.send("Solo los administradores pueden acceder a este sitio");
        };
    },

    /* Acceso para usuarios logueados*/
    user: (req, res, next) => {
        if (req.session.usuarioLogueado == undefined) {
            res.render("signIn", { errors: [{ msg: "Debes estar logueado para acceder a este sitio" }]
            });
        }
        if (req.session.usuarioLogueado.id != req.params.idUser)
            res.send("Pillin este no es tu usuario")
        else {
            next();
        };
    },

    carrito: (req, res, next) => {
        if (req.session.usuarioLogueado == undefined) {
            res.render("signIn", { errors: [{ msg: "Para ver el carrito primero accede a tu cuenta" }]
        });
        } next();
    }
};

module.exports = permisosMiddleware;