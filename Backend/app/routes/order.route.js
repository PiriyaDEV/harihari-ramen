const router = require("express").Router();

const controller = require("../controllers/order.controller");
const auth = require("../middleware/auth");

router.post("/create", auth, controller.create);

router.get("/orderHistory", auth, controller.getOrderHistory);

router.put("/cancel", auth, controller.cancel);

module.exports = router;