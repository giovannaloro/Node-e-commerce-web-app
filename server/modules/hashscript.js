'use strict'

module.exports = hashit;

var crypto = require('crypto');
var name = 'braitsch';
var hash = crypto.createHash('md5').update(name).digest('hex');
console.log(hash); // 9b74c9897bac770ffc029102a200c5de


function hashit (word){
   var hash = crypto.createHash('md5').update(word).digest('hex');
   return hash;
}
