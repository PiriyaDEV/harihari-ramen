const router = require("express").Router();

//const controller = require("../controllers/menu.controller");
const uploader = require("../uploader/upload")

router.post("/add", uploader.singleImage);

module.exports = router;
