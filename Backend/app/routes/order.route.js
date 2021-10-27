const router = require("express").Router();

const controller = require("../controllers/order.controller");
const auth = require("../middleware/auth");

router.post("/create", auth, controller.create);

module.exports = router;