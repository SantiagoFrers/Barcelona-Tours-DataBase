function recordameMiddleware (req,res,next) {
    if(req.cookies.recordame != undefined  &&
        req.session.usuarioLogueado == undefined){
        let usuarioLogueado = req.cookies.recordame;
        req.session.usuarioLogueado = usuarioLogueado;
}
    next();
};

module.exports = recordameMiddleware ;