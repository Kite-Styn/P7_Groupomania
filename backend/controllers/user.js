const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
//const sanitize = require("mongo-sanitize");
require ("dotenv").config();

const User = require("../models/User");

//Key and iv for CryptoJS encryption
var key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
var iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

//Encrypts email with CryptoJS and hashes password with bcrypt
exports.signup = (req, res, next) => {
    //let cleanMail = sanitize(req.body.email);
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
};

//Compares encrypted email with CryptoJS and hashed password with bcrypt, also adds webtoken
exports.login = (req, res, next) => {
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
};