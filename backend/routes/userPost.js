const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userPostCtrl = require("../controllers/userPost");

router.post("/", auth, userPostCtrl.addLike);
router.delete("/", auth, userPostCtrl.removeLike);
router.put("/", auth, userPostCtrl.modifyLike);
router.get("/:user_post", userPostCtrl.getLike);

module.exports = router;