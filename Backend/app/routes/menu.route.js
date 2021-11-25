const router = require("express").Router();

// import menu controller
const controller = require("../controllers/menu.controller");
// file uploader middleware
const uploader = require("../middleware/upload");

// parse requests to menu controller

// add a new main menu
router.post("/addMain", uploader, controller.addMain);

// add a new custom ramen choice
router.post("/addChoice", uploader, controller.addChoice);

// get all main menus
router.get("/mainMenus", controller.getMainMenus);

// get all custom ramen choices
router.get("/customRamen", controller.getCustomRamen);

module.exports = router;
