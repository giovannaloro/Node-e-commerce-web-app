var express = require('express'); //importa il modulo express

const path = require('path');

var app = express(); //oggetto che rappresenta express

app.get('/', function(req, res){  //qui scrivo cosa fare se arriva una get al mio server, res rappresenta il client e le sue richieste , rew il server e le sue risposte
    res.sendFile(path.join(__dirname, 'views/index.html')); //rispondo con un file http di cui indico il percorso
});

app.get('/pagina1', function(req, res){  //qui scrivo cosa fare se arriva una get al mio server, res rappresenta il client e le sue richieste , rew il server e le sue risposte
    res.send("<h1>Hey ciao ti ha mandato mio cugino hello world </h1>"); //rispondo con un file http
});

app.listen(3000, function(){
  console.log("Server attivo sulla porta 3000");
  }); //inizializzo il server sulla 3000