const router = require("express").Router();

// import order controller
const controller = require("../controllers/order.controller");
// authentication middleware
const auth = require("../middleware/auth");

// parse requests to order controller

// create a new order
router.post("/create", auth, controller.create);

// get order history by table
router.get("/orderHistory", auth, controller.getOrderHistory);

// update order status
router.put("/updateStatus", auth, controller.updateStatus);

// cancel order
router.put("/cancel", auth, controller.cancel);

module.exports = router;
