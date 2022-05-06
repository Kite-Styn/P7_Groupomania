module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      title: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      author_id: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.INTEGER
      },
      comment_count: {
          type: Sequelize.INTEGER
      },
      date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      }
    }, {
        timestamps: false
    });
    return Post;
};