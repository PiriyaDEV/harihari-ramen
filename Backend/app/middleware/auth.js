const Table = require("../models/table.model");

module.exports = async (req, res, next) => {
  try {
    let guest_uid = req.headers["x-access-token"];

    if (!guest_uid) throw new Error("No access token");

    const table = {
      guest_uid: guest_uid,
    };

    let result = await Table.find(table);

    if (!result.isFound) throw new Error("Table not available");

    req.body.table = result;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: " + error.message,
    });
  }
};
