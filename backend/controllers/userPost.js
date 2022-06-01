const fs = require("fs");
const db = require("../models/db");
const Comment = db.comments;
const Post = db.posts;
const User = db.users;
const UserPost = db.usersPosts;
const Op = db.Sequelize.Op;

exports.addLike = (req, res) => {
  let likeData = {
    user_id: req.body.userId,
    score: req.body.score,
    post_id: req.body.post_id
  };
  UserPost.create(likeData)
  .then(like => {
    Post.increment({ score: likeData.score }, { where: {id: likeData.post_id}})
    .then(data => {res.status(200).json({message: "Dis/Like saved"})})
    .catch(err => {res.status(500).json({err})})
  })
  .catch(err => {res.status(500).json({err})})
};

exports.removeLike = (req, res) => {
  let likeData = {
    user_id: req.body.userId,
    score: req.body.score,
    post_id: req.body.post_id
  };
  UserPost.destroy({ where: {user_id: likeData.user_id, post_id: likeData.post_id}})
  .then(like => {
    Post.increment({ score: - likeData.score }, { where: {id: likeData.post_id}})
    .then(data => {res.status(200).json({message: "Dis/Like removed"})})
    .catch(err => {res.status(500).json({err})})
  })
  .catch(err => {res.status(500).json({err})})
};

exports.modifyLike = (req, res) => {
  let likeData = {
    user_id: req.body.userId,
    score: req.body.score,
    post_id: req.body.post_id
  };
  let counter = 0;
  if (likeData.score > 0 ? counter = +2 : counter = -2);
  UserPost.update({ score: likeData.score }, { where: {user_id: likeData.user_id, post_id: likeData.post_id}})
  .then(like => {
    Post.increment({ score: counter }, { where: {id: likeData.post_id}})
    .then(data => {res.status(200).json({message: "Dis/Like changed"})})
    .catch(err => {res.status(500).json({err})})
  })
  .catch(err => {res.status(500).json({err})})
};

exports.getLike = (req, res) => {
  let userId = req.params.user_post.split("_")[0];
  let post_id = req.params.user_post.split("_")[1];
  UserPost.findOne({ where: {user_id: userId, post_id: post_id}})
  .then(data => {res.status(200).json(data)})
  .catch(err => {res.status(400).json(err)})
};