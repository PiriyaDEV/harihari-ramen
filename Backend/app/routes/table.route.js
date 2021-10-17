const router = require("express").Router();

const controller = require("../controllers/table.controller");

router.get("/generate", controller.generate);

router.get("/getAlls", controller.getAlls);

module.exports = router;
