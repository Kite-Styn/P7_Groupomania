const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    related_post: {
      type: Sequelize.INTEGER
    },
    related_comment: {
      type: Sequelize.INTEGER
    },
    reply_username: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    author_id: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.STRING
    },
    score: {
      type: Sequelize.INTEGER
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    edit_date: {
      type: Sequelize.DATE
    }
  }, {
    timestamps: false
  });
  return Comment;
};