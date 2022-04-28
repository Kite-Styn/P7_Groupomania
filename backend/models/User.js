/*const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);*/
const connection = require("./db");
const mysql = require("mysql2");

const User = function(user) {
    this.first_name = user.first_name,
    this.last_name = user.last_name,
    this.email = user.email,
    this.password = user.password
};

User.create = function(newUser, result) {
    connection.query("INSERT INTO users SET ?", newUser, function(err, res) {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser});
    });
};

module.exports = User;