const router = require("express").Router();

const controller = require("../controllers/bill.controller");

router.post("/create", controller.create);

//router.get("/getBills", controller.getBills);

module.exports = router;
