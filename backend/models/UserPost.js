const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const UserPost = sequelize.define("users_post", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    score: {
      type: Sequelize.INTEGER
    },
    post_id: {
      type: Sequelize.STRING,
      primaryKey: true
    }
  }, {
    timestamps: false
  });
  return UserPost;
};