const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require ("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

//Routes location
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const userPostRoutes = require("./routes/userPost");
const userCommentRoutes = require("./routes/userComment");

//Limits the number of requests for a given time per IP
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 2000, // Limit each IP to 2000 requests per `window` (here, per 5 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);

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

//Routes
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/postlike", userPostRoutes);
app.use("/api/commentlike", userCommentRoutes);

module.exports = app;