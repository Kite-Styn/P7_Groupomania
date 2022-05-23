const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
//const { Sequelize } = require("sequelize");
const path = require("path");
require ("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const userPostRoutes = require("./routes/userPost");

//Limits the number of requests for a given time per IP
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express();

app.use(cors())
app.use(helmet());
app.use(limiter);

/*
const sequelize = new Sequelize("groupomania", `${process.env.DEV_USER}`, `${process.env.DEV_PASS}`, {
    host: "localhost",
    dialect: "mysql"
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();*/

/*const connection = mysql.createConnection({
    host     : "localhost",
    user     : `${process.env.DEV_USER}`,
    password : `${process.env.DEV_PASS}`,
    database : "groupomania"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL");
});*/

/*connection.query("SELECT * FROM exemple", function (err, result) {
    if (err) throw err;
    console.log(result);
});*/

/*mongoose.connect(`mongodb+srv://${process.env.DEV_USER}:${process.env.DEV_PASS}@cluster0.jx7ax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(() => console.log('Connection to MongoDB successful'))
.catch(() => console.log('Connection to MongoDB failed'));*/

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/postlike", userPostRoutes);

//const db = require("./models/db");
//db.sequelize.sync();

//module.exports = connection;
module.exports = app;