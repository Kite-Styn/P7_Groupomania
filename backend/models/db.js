const mysql = require("mysql2");
const path = require("path");
const connection = mysql.createConnection({
    host     : "localhost",
    user     : `${process.env.DEV_USER}`,
    password : `${process.env.DEV_PASS}`,
    database : "groupomania"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL");
});
module.exports = connection;
