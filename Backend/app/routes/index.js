const router = require("express").Router();

// import routes from each module
const tableRoutes = require("./table.route");
const menuRoutes = require("./menu.route");
const orderRoutes = require("./order.route");
const billRoutes = require("./bill.route");

// parse requests to table routes
router.use("/table", tableRoutes);

// parse requests to menu routes
router.use("/menu", menuRoutes);

// parse requests to order routes
router.use("/order", orderRoutes);

// parse requests to bill routes
router.use("/bill", billRoutes);

module.exports = router;
