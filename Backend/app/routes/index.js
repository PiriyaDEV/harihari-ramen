const router = require("express").Router();

const tableRoutes = require("./table.route");
const billRoutes = require("./bill.route");


router.use("/table", tableRoutes);
router.use("/bill", billRoutes);


module.exports = router;
