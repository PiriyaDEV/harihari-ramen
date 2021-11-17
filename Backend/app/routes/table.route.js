const router = require("express").Router();

const controller = require("../controllers/table.controller");
const auth = require("../middleware/auth");

router.post("/generate", controller.generate);

router.get("/allTables", controller.getTables);

router.get("/getTableById", auth, controller.getTableById);

router.put("/callWaiter", auth, controller.callWaiter);

router.put("/checkin", auth, controller.checkin);

router.put("/checkout", auth, controller.checkout);

module.exports = router;
