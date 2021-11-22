const router = require("express").Router();

const controller = require("../controllers/menu.controller");
const uploader = require("../middleware/upload");

router.post("/addMain", uploader, controller.addMain);

router.post("/addChoice", uploader, controller.addChoice);

router.get("/mainMenus", controller.getMainMenus);

router.get("/customRamen", controller.getCustomRamen);

module.exports = router;
