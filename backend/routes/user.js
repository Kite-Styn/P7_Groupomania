const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", userCtrl.findOne);
router.put("/color/:id", auth, userCtrl.updateColor);
router.put("/image/:id", auth, multer, userCtrl.updateImage);
router.delete("/:id", auth, userCtrl.delete);

module.exports = router;