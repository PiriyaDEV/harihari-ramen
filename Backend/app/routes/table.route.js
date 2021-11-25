const router = require("express").Router();

// import table controller
const controller = require("../controllers/table.controller");
// authentication middleware
const auth = require("../middleware/auth");

// parse requests to table controller

// generate a new table
router.post("/generate", controller.generate);

// get all tables
router.get("/allTables", controller.getTables);

// get table info by id
router.get("/getTableById", auth, controller.getTableById);

// call waiter
router.put("/callWaiter", auth, controller.callWaiter);

// check in to system
router.put("/checkin", auth, controller.checkin);

// check out from system
router.put("/checkout", auth, controller.checkout);

module.exports = router;
