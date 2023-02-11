var express = require('express');
var router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir:'./uploads'});
const executeQuery = require('../modules/sqlscript.js');
const session = require('express-session');

router.use(session({ secret:'ruguhd' }));




  router.post('/', function(req, res, next){
    executeQuery(`select * from utenti where mail = '${req.body.mail}' and password = '${req.body.password}'`,function(error,result){
      if(error) throw error;
      if (result.length == 0){res.send("Username o password non corretti");}
      else{
        //creazione sessione
        req.session.user = req.body.mail;
        req.session.type = result[0].tipo;
        req.session.idu = result[0].idu;
        return res.redirect("/session/account");
      }    
    })
  });

  router.get('/account',function(req, res, next){
    if (req.session.user){
      return res.render('account',{title: "account"});
    }
    else {return res.redirect("/");}
  });

module.exports = router;
