const router = require("express").Router();

const tableRoutes = require("./table.route");
const billRoutes = require("./bill.route");
const menuRoutes = require("./menu.route");

router.use("/table", tableRoutes);

router.use("/bill", billRoutes);

router.use("/menu", menuRoutes);

module.exports = router;
