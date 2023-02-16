// importazione moduli
var express = require('express');
const randomString = require('randomstring');
const executeQuery = require('../modules/sqlscript.js');
const timeCheck = require('../modules/timecheckscript.js');
const session = require('express-session');


// creazione variabile router 
var router = express.Router();

// lista messaggi di riposta e reindirizzamento interazione con l'user 
var err1 = "Non è possibile iscriversi due  volte allo stesso evento";
var err2 = "Non è possibile iscriversi ad un evento che si è gia svolto";
var err3 = "L'evento a cui vuoi iscriverti è già pieno";
var err4 = "Devi essere loggato  un profilo da partecipante per iscriverti ad un evento";
var err5 = "La mail inserita è già associata ad un account esistente";
var err6 = "Le passwords inserite non coincidono";
var err7 = "Data evento non ammissibile";
var err8 = "Devi essere loggato con un profilo organizzatore per creare un evento";
var err0 = "Devi compilari tutti i campi del form ";
var ok1 = "Iscrizione effettuata con successo";
var ok2 = "Registrazione effettuata con successo";
var ok3 = "Evento creato con successo";
var redMess1 = "Torna al calendario eventi";
var redMess2 = "Vai alla pagina di login";
var redMess3 = "Riprova";

// gestione session
router.use(session({ secret:'ruguhd' })); // inizializzo la sessione con stringa casuale 

// creazione endpoints

// endpoint di gestione della home page
router.get('/', function(req, res, next) {            
  res.render('index', { title: 'Express' });
});

// endpoint gestione iscrizione , il parametro viene passato attraverso il form di event.pug
router.get('/iscriviti/:ide',function(req,res,next){ 
  executeQuery(`select * from utenti where mail in (select prtcmail from partecipazioni where ide = '${req.params.ide}') `, function(error,results) {
    if(error) throw error; 
    res.render('iscriviti.pug', {partecipanti : results});
  });
});

// endpoint gestione iscrizione, il parametro viene passato attravero l'endpoint iscriviti(get)
router.post('/iscriviti/:ide',function(req,res,next){ 
  executeQuery(`select * from utenti where mail in (select prtcmail from partecipazioni where ide = '${req.params.ide}') `, function(error,results) {
    if(error) throw error; 
    executeQuery(`select * from eventi where ide = '${req.params.ide}' `, function(er,re) {
      if(er) throw er;
      for ( let i = 0; i < results.length; i++ ) { // controllo che l'utente non sia già un partecipante
        if ( results[i].mail == req.session.user ) {
          return res.render("server-result" , {message : err1, redirect : "/events" , redM : redMess1});
        }} 
      if  ( timeCheck(re[0].ora , re[0].data) ) { // controllo che l'evento non si sia già svolto
         return res.render("server-result" , {message : err2, redirect : "/events",  redM : redMess1});
        }
      if ( parseInt(re[0].npm) == results.length ) { // controllo che il numero massimo di partecipanti non sia già stato raggiunto
        return res.render("server-result" , {message : err3, redirect : "/events", redM : redMess1});
      }
      if (req.session.type != "p"){ // controllo che l'utente sia di tipo partecipante
        return res.render("server-result",{message : err4, redirect : "/session/login", redM : redMess2});
      }
      executeQuery(`insert into partecipazioni(ide,prtcmail) values('${req.params.ide}','${req.session.user}')`,function(rer,ris){
        return res.render("server-result",{message : ok1, redirect : "/"});
      })
    });
  });
});

// endpoint gestione eventi 
router.get('/events',function(req,res,next){
  executeQuery("select * from eventi ", function(error,results) {
    if(error) throw error; 
    res.render('events.pug', {events: results});
  });
});

// endpoint gestione evento, il parametro viene passato attraverso il form contenuto in events.pug 
router.get('/event/:ide',function(req,res,next){
  executeQuery(`select * from eventi where ide = '${req.params.ide}' `, function(error,results) {
    if(error) throw error; 
    res.render('event.pug', {event: results[0]});
  });
});

// endpoint gestione  registrazione(get)
router.get('/registrazione',function(req, res, next){
  res.render('registrazione', {title: 'Registrazione'});
});

// endpoint gestione registrazione(post), il body viene passato attraverso il form contenuto in registrazione.pug
router.post('/registrazione',function(req, res, next){
    executeQuery(`select mail from utenti where mail = '${req.body.mail}'`,function(error,results){
      if(results.length>0){ // controllo che non vi siano altri utenti che usano la stessa mail
        return res.render("server-result",{message : err5, redirect : "/registrazione", redM : redMess3});
      }
      if(req.body.rpassword!=req.body.password){ // controllo che le password inserite coincidano
        return res.render("server-result",{message : err6, redirect : "/registrazione" , redM : redMess3});
      }
      executeQuery(`insert into utenti(nome,cognome,mail,tipo,password) values('${req.body.nome}','${req.body.cognome}','${req.body.mail}','${req.body.ctac}','${req.body.password}')`,function(err,ris){
        return res.render("server-result",{message : ok2, redirect : "/"});
      });
  });
});

// endpoint gestione creazione evento(get)
router.get('/create-evento',function(req, res, next){
  res.render('create-evento', {title: 'Creazione evento'});
});

// endpoint gestione creazione evento(post)
router.post('/create-evento',function(req, res, next){
  executeQuery(`select mail from utenti where mail = '${req.body.mail}'`,function(error,results){
    if (req.body.time==""){
      return res.render("server-result",{message : err9, redirect : "/create-evento"});
    }
    else {
      var time=(req.body.datetime).split("T"); 
    }
    if (timeCheck(time[1],time[0])){ // controllo che data e ora dell'evento non siano già passate 
      return res.render("server-result",{message : err7, redirect : "/create-evento", redM : redMess3});
    }
    if (req.session.type!="o"){ // controllo che l'utente sia di tipo operatore
      return res.render("server-result",{message : err8, redirect : "/", redM : redMess2});
    }
    ide = randomString.generate(10); // genero una stringa casuale che diventerà l'id dell'evento
    executeQuery(`insert into eventi(ide,sport,npm,luogo,ora,data) values('${ide}','${req.body.sport}','${req.body.nup}','${req.body.luogo}','${time[1]}','${time[0]}')`,function(rer,ris){
      return res.render("server-result",{message : ok3, redirect : "/"});
    });
  });
});
  

module.exports = router;
