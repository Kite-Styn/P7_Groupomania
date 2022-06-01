const fs = require("fs");
const db = require("../models/db");
const Comment = db.comments;
const Post = db.posts;
const User = db.users;
const UserComment = db.usersComments;
const Op = db.Sequelize.Op;

exports.addLike = (req, res) => {
  let likeData = {
    user_id: req.body.userId,
    score: req.body.score,
    comment_id: req.body.comment_id
  };
  UserComment.create(likeData)
  .then(like => {
    Comment.increment({ score: likeData.score }, { where: {id: likeData.comment_id}})
    .then(data => {res.status(200).json({message: "Dis/Like saved"})})
    .catch(err => {res.status(500).json({err})})
  })
  .catch(err => {res.status(500).json({err})})
};

exports.removeLike = (req, res) => {
  let likeData = {
    user_id: req.body.userId,
    score: req.body.score,
    comment_id: req.body.comment_id
  };
  UserComment.destroy({ where: {user_id: likeData.user_id, comment_id: likeData.comment_id}})
  .then(like => {
    Comment.increment({ score: - likeData.score }, { where: {id: likeData.comment_id}})
    .then(data => {res.status(200).json({message: "Dis/Like removed"})})
    .catch(err => {res.status(500).json({err})})
  })
  .catch(err => {res.status(500).json({err})})
};

exports.modifyLike = (req, res) => {
  let likeData = {
    user_id: req.body.userId,
    score: req.body.score,
    comment_id: req.body.comment_id
  };
  let counter = 0;
  if (likeData.score > 0 ? counter = +2 : counter = -2);
  UserComment.update({ score: likeData.score }, { where: {user_id: likeData.user_id, comment_id: likeData.comment_id}})
  .then(like => {
    Comment.increment({ score: counter }, { where: {id: likeData.comment_id}})
    .then(data => {res.status(200).json({message: "Dis/Like changed"})})
    .catch(err => {res.status(500).json({err})})
  })
  .catch(err => {res.status(500).json({err})})
};

exports.getLike = (req, res) => {
  let userId = req.params.user_comment.split("_")[0];
  let comment_id = req.params.user_comment.split("_")[1];
  UserComment.findOne({ where: {user_id: userId, comment_id: comment_id}})
  .then(data => {res.status(200).json(data)})
  .catch(err => {res.status(400).json(err)})
};