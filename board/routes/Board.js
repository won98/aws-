const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const { boardController: controller } = require("../controller");
const router = express.Router();

router.post("/post", upload.fields([{ name: "image" }]), controller.Post);
router.get("/get", controller.Get);
module.exports = router;
