const fs = require("fs");
const db = require("../models/db");
const Post = db.posts;
const User = db.users;
const Op = db.Sequelize.Op;


exports.createPost = (req, res) => {
    console.log(req.body);
    const id = req.body.userId;
    User.findByPk(id)
    .then(data => {
        if (data) {
            const post = {
            title: req.body.title,
            image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            author: data.username,
            author_id: id,
            rating: 0,
            comment_count: 0
            };
            Post.create(post)
            .then(data => {
                res.status(200).send({
                    message: "Post created"
                })
            })
            .catch(err => {
                res.status(500).send({err})
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
    
}
