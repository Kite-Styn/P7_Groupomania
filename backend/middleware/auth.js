const jwt = require("jsonwebtoken");

//Checks to see if the webtoken is valid
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = {userId};
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json("User ID invalid")
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json("Request not authorized")
  }
};