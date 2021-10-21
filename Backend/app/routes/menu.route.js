const router = require("express").Router();

const controller = require("../controllers/menu.controller");
const uploader = require("../middleware/upload")

router.post("/addMain", uploader.singleImage, controller.addMain);

router.post("/addChoice", uploader.singleImage, controller.addChoice);

module.exports = router;
