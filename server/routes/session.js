// importazione moduli
var express = require('express');
const multipart = require('connect-multiparty');
const executeQuery = require('../modules/sqlscript.js');
const session = require('express-session');

// creazione variabile router 
var router = express.Router();

// gestione session
router.use(session({ secret:'ruguhd' })); // inizializzo la sessione con stringa casuale 

// lista messaggi di riposta interazione con l'user 
err1 = "Username o password errate";
 
// creazione endpoints

// endpoint gestione login(get)
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// endpoint gestione login(post), il body viene passato attraverso il form contenuto in login.pug
router.post('/login', function(req, res, next){
  executeQuery(`select * from utenti where mail = '${req.body.mail}' and password = '${req.body.password}'`,function(error,result){
    if(error) throw error;
    if (result.length == 0){ //controllo che la coppia password-mail esista nel database 
       return res.render("server-result",{message : err1, redirect : "/session/login" , redM : "Riprova"});
    }
    //inizializzo le variabili globali di sessione
    req.session.user = req.body.mail;
    req.session.type = result[0].tipo;
    req.session.idu = result[0].idu;
    return res.redirect("/session/account");    
  })
});

// endpoint gestion account
router.get('/account',function(req, res, next){
  if (req.session.user){
    return res.render('account',{title: "account", mail: req.session.user, tipo:req.session.type});
  }
  else {return res.redirect("/");}
});

// endpoint gestion logout
router.get('/logout',function(req, res, next){
  if (req.session.user){
    req.session.user = null;
    req.session.destroy();
  }
  return res.redirect("/");
});

  

module.exports = router;
