const router = require("express").Router();

const tableRoutes = require("./table.route");

router.use("/table", tableRoutes);

module.exports = router;
