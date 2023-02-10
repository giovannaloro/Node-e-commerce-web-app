'use strict'

module.exports = executeQuery;

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "sql9.freesqldatabase.com" ,
    user: "sql9596999",
    password: "rw1ETbPAKI",
    database: "sql9596999"

});

function executeQuery (sql, callback){
   // connection.connect();
    connection.query(sql,callback);
    //connection.end();
}
