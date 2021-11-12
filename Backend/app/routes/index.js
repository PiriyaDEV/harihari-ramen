const router = require("express").Router();

const tableRoutes = require("./table.route");
const menuRoutes = require("./menu.route");
const orderRoutes = require("./order.route");
const billRoutes = require("./bill.route");

router.use("/table", tableRoutes);

router.use("/menu", menuRoutes);

router.use("/order", orderRoutes);

router.use("/bill", billRoutes);

module.exports = router;
