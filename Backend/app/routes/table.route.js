const router = require("express").Router();

const controller = require("../controllers/table.controller");
const auth = require("../middleware/auth");

router.post("/generate", controller.generate);

router.get("/getTables", controller.getTables);

router.put("/checkin", auth, controller.checkin);

module.exports = router;
