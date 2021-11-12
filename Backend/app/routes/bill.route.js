const router = require("express").Router();

const controller = require("../controllers/bill.controller");
const auth = require("../middleware/auth");

router.get("/summary", auth, controller.summary);

module.exports = router;