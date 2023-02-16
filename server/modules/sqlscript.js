'use strict'

module.exports = executeQuery;

// importo il modulo mysql
const mysql = require('mysql');

// connessione al database
const connection = mysql.createConnection({
    host: "sql9.freesqldatabase.com" ,
    user: "sql9596999",
    password: "rw1ETbPAKI",
    database: "sql9596999"

});

// funzione da esportare
function executeQuery (sql, callback){
    connection.query(sql,callback);
}
