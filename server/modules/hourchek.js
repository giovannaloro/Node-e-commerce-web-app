
'use strict'

module.exports = hcheck;


function hcheck (time,date){
    var s=time.split(":");
    var d = new Date();
    var g1=new Date(date);
    g1.setHours(s[0],s[1],0);
    d.setHours(d.getHours()+1);
    if (g1.getTime()<d.getTime()){return 1;}
    else {return 0;}
}
