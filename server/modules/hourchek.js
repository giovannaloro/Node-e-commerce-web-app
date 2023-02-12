
'use strict'

module.exports = hcheck;


function hcheck (time,date){
    var time = time;
    var data = date;
    var s=time.split(":");
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var g1=new Date(date);
    if (g1.getTime()<d.getTime()){return 1;}
    if (g1.getTime() == d.getTime()){
        if (h < s[0]){return 1;}
        if (h == s[0] && m < s[1]){return 1;}
    }
    return 0;
}
