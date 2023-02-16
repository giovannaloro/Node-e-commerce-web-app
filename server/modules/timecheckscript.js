
'use strict'

module.exports = timeCheck;

// funzione da esportare 
// la funzione prendein input una data in formato yyyy-mm-dd e un'ora in formato hh:mm
// ritorna 1 se data e ora in input sono precedenti a data e ora attuali
function timeCheck (time,date){ 
    var splitTime=time.split(":"); // divido l'orario in hh e mm
    var actDate = new Date(); // creo un nuovo oggetto data che riporta la data odierna
    var inputDate=new Date(date); // creo un nuovo oggetto data che riporta la data inserita con orario 00:00
    inputDate.setHours(splitTime[0],splitTime[1],0); // imposto ora e data di inputDate
    actDate.setHours(actDate.getHours()+1); // aumento di uno l'ora della data attuale
    if (inputDate.getTime()<actDate.getTime()){ // controllo che la data inserita sia precedente a quella attuale 
        return 1;}
    else {
        return 0;}
}
