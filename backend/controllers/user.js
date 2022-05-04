const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
//const sanitize = require("mongo-sanitize");
require ("dotenv").config();
const fs = require("fs");

const db = require("../models/db");
const User = db.users;
const Op = db.Sequelize.Op;

//const User = require("../models/User");

//Key and iv for CryptoJS encryption
var key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
var iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

exports.signup = (req, res) => {
    const encryptedMail = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = {
        username: req.body.username,
        email: encryptedMail,
        password: hash
        };
        User.create(user)
        .then(data => {
            res.status(201).json({message: "User created"});
        })
        .catch(err => {
            res.status(500).json({err})
        })
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res) => {
    const encryptedMail = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
    User.findOne({ where: { email: encryptedMail}})
    .then(user => {
        if (!user) {
            return res.status(401).json({message: "User not found"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({message: "Password incorrect"})
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    {userId: user.id},
                    "RANDOM_TOKEN_SECRET",
                    {expiresIn: "24h"}
                ),
                themeColor: user.theme_color
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
    .then(data => {
        if (data) {
            var email = CryptoJS.AES.decrypt(data.dataValues.email, key, { iv : iv});
            var decryptedEmail = email.toString(CryptoJS.enc.Utf8);
            data.dataValues.email = decryptedEmail;
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find User with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id=" + id
        });
    });
};

exports.updateColor = (req, res) => {
    const id = req.params.id;
    console.log(req.body.themeColor);
    User.update({ theme_color: req.body.themeColor }, { where : { id : id }})
    .then(num => {
        if (num == 1) {
            res.status(200).send({ message: "User updated successfully"})
        } else {
            res.status(500).send({ message: "Could not update user with id="+id})
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Error updating user with id="+id})
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({ where: { id: id } })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "User deleted successfully"
            })
        } else {
            res.status(404).send({
                message: `Cannot delete User with id=${id}, maybe it was not found`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        })
    })
}

//Encrypts email with CryptoJS and hashes password with bcrypt
/*exports.signup = (req, res, next) => {
    console.log(req.body);
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    });
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).json({err})
        } else {
            res.status(201).json({message: "User created"})
        }
    })
    let cleanMail = sanitize(req.body.email);
    let cleanMail = req.body.email;
    const encryptedMail = CryptoJS.AES.encrypt(cleanMail, key, { iv: iv }).toString();
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: encryptedMail,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: "User created"}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};*/

//Compares encrypted email with CryptoJS and hashed password with bcrypt, also adds webtoken
/*exports.login = (req, res, next) => {
    //let cleanMail = sanitize(req.body.email);
    let cleanMail = req.body.email;
    const encryptedMail = CryptoJS.AES.encrypt(cleanMail, key, { iv: iv }).toString();
    User.findOne({email: encryptedMail})
    .then(user => {
        if (!user) {
            return res.status(401).json({message: "User not found"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({message: "Password incorrect"})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    "RANDOM_TOKEN_SECRET",
                    {expiresIn: "24h"}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};*/
