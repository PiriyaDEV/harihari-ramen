const router = require("express").Router();

const tableRoutes = require("./table.route");
const menuRoutes = require("./menu.route");
const orderRoutes = require("./order.route");

router.use("/table", tableRoutes);

router.use("/menu", menuRoutes);

router.use("/order", orderRoutes);

module.exports = router;
