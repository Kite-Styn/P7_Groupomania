const fs = require("fs");
const db = require("../models/db");
const Comment = db.comments;
const Post = db.posts;
const User = db.users;
const Op = db.Sequelize.Op;

exports.createComment = (req, res) => {
    let userData = req.body;
    const id = userData.userId;
    User.findByPk(id)
    .then(data => {
        const comment = {
            related_post: userData.related_post,
            author: data.username,
            author_id: id,
            content: userData.content,
            score: 0
        };
        Comment.create(comment)
        .then(data => {
            Post.increment({ comment_count: +1 }, { where: {id: userData.related_post} })
            .then(postData => {res.status(200).send({ message: "Comment created" })})
            .catch(err => {res.status(500).json(err)})
        })
        .catch(err => {
            res.status(500).send({ message: "Comment not created" })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id=" + id
        });
    });
};

exports.getComments = (req, res) => {
    let postId = req.params.id;
    Comment.findAll({ where: {related_post: postId}, order: [["date", "DESC"]] })
    .then(data => {res.status(200).json(data)})
    .catch(err => {res.status(500).json(err)})
};

exports.modifyComment = (req, res) => {
    Comment.findByPk(req.body.commentId)
    .then(comm => {
        if (comm.author_id !== req.body.userId) {
            throw "Request not authorized"
        }
        let date = new Date();
        date = date.toISOString().replace("T", " ").split(".")[0];
        Comment.update({ content: req.body.newContent, edit_date: date }, { where: {id:req.body.commentId} })
        .then(data => {res.status(200).json({message: "Comment modified"})})
        .catch(err => {res.status(500).json({message: "Could not update comment"})})
    })
    .catch(err => {res.status(500).send(err)})
};

exports.replyComment = (req, res) => {
    let userData = req.body;
    const id = userData.userId;
    User.findByPk(id)
    .then(data => {
        const comment = {
            related_post: userData.related_post,
            related_comment: userData.related_comment,
            reply_username: userData.reply_username,
            author: data.username,
            author_id: id,
            content: userData.replyContent,
            score: 0
        };
        Comment.create(comment)
        .then(data => {
            Post.increment({ comment_count: +1 }, { where: {id: userData.related_post} })
            .then(postData => {res.status(200).send({ message: "Comment created" })})
            .catch(err => {res.status(500).json(err)})
        })
        .catch(err => {
            res.status(500).send({ message: "Comment not created" })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id=" + id
        });
    });
};

exports.deleteComment = (req, res) => {
    User.findByPk(req.body.userId)
    .then(user => {
        Comment.findByPk(req.body.commentId)
        .then(comm => {
            if (comm.author_id !== req.body.userId && user.is_admin !== true) {
                throw "Request not authorized"
            }
            Comment.destroy({ where: {id: req.body.commentId}})
            .then(data => {
                Post.increment({ comment_count: -1 }, { where: {id: comm.related_post}})
                .then(resp => {res.status(200).json({message: "Comment deleted"})})
                .catch(err => {res.status(500).json({err})})
            })
            .catch(err => {res.status(500).json({err})})
        })
        .catch(err => {res.status(400).json({err})})
    })
    .catch(err => {res.status(500).json({err})})
};