// importazione moduli
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var sessionRouter = require('./routes/session');

//creazione variabile express
var app = express(); // la variabile app  rappresenta il server 

// impostazioni del motore grafico 
app.set('views', path.join(__dirname, 'views')); // imposto views come root contente i file pug
app.set('view engine', 'pug'); // imposto pug come formato delle pagine da renderizzare

// impostazioni generali del server
app.use(logger('dev'));                          
app.use(express.json());                         
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// creazione routes
app.use('/', indexRouter);
app.use('/session', sessionRouter);

// gestione errore 404
app.use(function(req, res, next) {
  next(createError(404));
});

//gestione degli errori
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renderizzo la pagina pug error a seguito dell'errore 500
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
