const router = require("express").Router();

const controller = require("../controllers/table.controller");

router.post("/generate", controller.generate);

router.get("/getTables", controller.getTables);

router.put("/checkin", controller.checkin);

module.exports = router;
