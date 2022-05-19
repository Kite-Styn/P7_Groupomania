const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");

router.post("/create", auth, commentCtrl.createComment);
router.get("/:id", commentCtrl.getComments);
router.post("/modify", auth, commentCtrl.modifyComment);
router.delete("/delete", auth, commentCtrl.deleteComment);
/*router.get("/latest", postCtrl.latest);
router.get("/", postCtrl.getAllPosts);*/

module.exports = router;