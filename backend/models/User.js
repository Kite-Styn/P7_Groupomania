module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.STRING,
      defaultValue: "http://localhost:3000/images/user-default.png"
    },
    theme_color: {
      type: Sequelize.STRING,
      defaultValue: "#c2bebe"
    },
    is_admin: {
      type: Sequelize.BOOLEAN
    }
  }, {
      timestamps: false
  });
  return User;
};