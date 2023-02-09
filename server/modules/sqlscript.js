'use strict'

module.exports = executeQuery;

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "giovanni",
    password: "password",
    database: "persone"

});

function executeQuery (sql, callback){
    connection.connect();
    connection.query(sql,callback);
    connection.end();
}