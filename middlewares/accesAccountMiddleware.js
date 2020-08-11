// Midd para que el logo del usuario cambie a donde dirigue depende estemos logueado. Sin efecto por enviar session global con las opciones
const accesAccountMiddleware = {
    account: (req, res, next) => {
        if (req.session.usuarioLogueado != undefined) {
            res.redirect(`/users/editar/${req.session.usuarioLogueado.id}`);
        } else {
             next();
        };
    }
};

module.exports = accesAccountMiddleware;