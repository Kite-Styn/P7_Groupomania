const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
require ("dotenv").config();
const fs = require("fs");

const db = require("../models/db");
const User = db.users;
const Op = db.Sequelize.Op;

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
      let isAdmin = false;
      if (user.is_admin == true) {
        isAdmin = true
      }
      res.status(200).json({
        userId: user.id,
        username: user.username,
        token: jwt.sign(
          {userId: user.id},
          "RANDOM_TOKEN_SECRET",
          {expiresIn: "24h"}
          ),
          themeColor: user.theme_color,
          isAdmin: isAdmin
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
  User.update({ theme_color: req.body.themeColor }, { where: { id: id }})
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
};

exports.updateImage = (req, res) => {
  const id = req.params.id;
  let user = {
    picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  };
  User.findByPk(id)
  .then(data => {
    if (data) {
      var oldPicture = data.picture.split("/images/")[1];
      if (oldPicture !== "user-default.png") {
        fs.unlink(`images/${oldPicture}`, () => {
          console.log("Old image deleted")
        });
      }
      User.update({ picture: user.picture }, { where: { id: id}})
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

exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
  .then(data => {
    if (data) {
      var oldPicture = data.picture.split("/images/")[1];
      if (oldPicture !== "user-default.png") {
        fs.unlink(`images/${oldPicture}`, () => {
          console.log("Old image deleted")
        });
      }
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