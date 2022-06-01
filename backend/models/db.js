const Sequelize = require("sequelize");

const sequelize = new Sequelize(`${process.env.DATABASE}`, `${process.env.DEV_USER}`, `${process.env.DEV_PASS}`, {
  host: "localhost",//127.0.0.1 for mac
  dialect: "mysql",
  timezone: '+02:00' //for writing to database
});
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./User")(sequelize, Sequelize);
db.posts = require("./Post")(sequelize, Sequelize);
db.comments = require("./Comment")(sequelize, Sequelize);
db.usersPosts = require("./UserPost")(sequelize, Sequelize);
db.usersComments = require("./UserComment")(sequelize, Sequelize);

module.exports = db;