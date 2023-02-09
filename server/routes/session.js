var express = require('express');
var router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir:'./uploads'});
const executeQuery = require('../modules/sqlscript.js');

router.get('/users',function(req,res,next){
  executeQuery("select * from persone", function(error,results) {
    if(error) throw error; 
    res.render('users', {users: results});
  });
});


router.get('/upload',function(req,res,next){
  res.render('upload',{title: 'Upload'});
});

router.post('/upload', multipartMiddleware ,function(req, res, next){
  res.send("File caricato");
});

  router.post('/', function(req, res, next){
    let username = req.body.username;
    let mail = req.body.mail;
    let rpwd = req.body.rpassword;
    let pwd = req.body.password;
    if (pwd==rpwd){res.render('session', {title: 'User Session', username: username, mail: mail});}
    else {res.send("<p>Sbagliato a ridigitare la password hai<p/>")}
  });

module.exports = router;
