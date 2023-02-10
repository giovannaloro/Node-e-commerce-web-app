var express = require('express');
var router = express.Router();
const executeQuery = require('../modules/sqlscript.js');
const session = require('express-session');

router.use(session({ secret:'ruguhd' }));

router.get('/logout',function(req, res, next){
  if (req.session.user){
    req.session.user = null;
    req.session.destroy();
  }
  return res.redirect("/");
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contatti',function(req, res, next){
  res.render('contatti', {title: 'Contatti'});
});


router.get('/registrazione',function(req, res, next){
  res.render('registrazione', {title: 'Login'});
});

router.post('/registrazione',function(req, res, next){
    executeQuery(`select mail from utenti where mail = '${req.body.mail}'`,function(error,results){
      if(results.length>0){res.send("mail già esistente");}
      else {}
      if(req.body.rpassword!=req.body.password){res.send("password diverse");}
      else {}
    });
    executeQuery(`insert into utenti(id,mail,password) values('${req.body.id}','${req.body.mail}','${req.body.password}')`,function(rer,ris){
      res.send("utente registrato");
    });
  });

  router.get('/users/:id',function(req,res,next){
    executeQuery(`select * from utenti where id='${req.params.id}'`, function(error,results) {
      if(error) throw error; 
      res.render('user', {user: results[0]});
    });
  });
  
  
  router.get('/users',function(req,res,next){
    executeQuery("select * from utenti", function(error,results) {
      if(error) throw error; 
      res.render('users', {users: results});
    });
  });
  

module.exports = router;
