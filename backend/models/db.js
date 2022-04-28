/*const mysql = require("mysql2");
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
module.exports = connection;*/
const Sequelize = require("sequelize");

const sequelize = new Sequelize("groupomania", `${process.env.DEV_USER}`, `${process.env.DEV_PASS}`, {
    host: "localhost",
    dialect: "mysql"
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./User")(sequelize, Sequelize);

module.exports = db;