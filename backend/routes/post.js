const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.post("/create", auth, multer, postCtrl.createPost);
router.get("/latest", postCtrl.latest);
router.get("/:id", postCtrl.getPost);
router.get("/", postCtrl.getPosts);

module.exports = router;