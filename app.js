var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart')
var apisRouter = require('./routes/apis')
var reactRouter = require('./routes/react')

var recordameMiddleware = require('./middlewares/recordameMiddleware');

var methodOverride = require('method-override')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(session({
  secret: "Zaraza",
  resave: false,
  saveUninitialized: true
}));
// Comparto session globalmente
app.use(function(req, res, next){
    sessionUser = req.session.usuarioLogueado;
    next();
  });

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(recordameMiddleware); //Middleware cookie "Recordame"

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/productos', productsRouter);
app.use('/carrito', cartRouter);
app.use('/api', apisRouter);
app.use('/react', reactRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;