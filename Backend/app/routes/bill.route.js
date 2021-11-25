const router = require("express").Router();

// import bill controller
const controller = require("../controllers/bill.controller");
// authentication middleware
const auth = require("../middleware/auth");

// parse requests to bill controller

// get bill summary
router.get("/summary", auth, controller.summary);

module.exports = router;
