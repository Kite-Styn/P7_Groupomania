const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCommentCtrl = require("../controllers/userComment");

router.post("/", auth, userCommentCtrl.addLike);
router.delete("/", auth, userCommentCtrl.removeLike);
router.put("/", auth, userCommentCtrl.modifyLike);
router.get("/:user_comment", userCommentCtrl.getLike);

module.exports = router;