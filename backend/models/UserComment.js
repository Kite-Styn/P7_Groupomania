const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const UserComment = sequelize.define("users_comment", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      score: {
        type: Sequelize.INTEGER
      },
      comment_id: {
          type: Sequelize.STRING,
          primaryKey: true
      }
    }, {
        timestamps: false
    });
    return UserComment;
};