const Table = require("../models/table.model");

// authenticate by guest id
module.exports = async (req, res, next) => {
  try {
    // get access token
    let guest_uid = req.headers["x-access-token"];

    // if no access token exist
    if (!guest_uid) throw new Error("No access token");

    // table object to find
    const table = {
      guest_uid: guest_uid,
    };

    // find table by guest id
    let result = await Table.find(table);

    // if table does not exist
    if (!result.isFound) throw new Error("Table not available");

    // put table info to request body
    req.body.table = result;

    // parse requests to next middleware
    next();
  } catch (error) {
    // return unauthenticated requests
    return res.status(401).json({
      success: false,
      message: "Unauthorized: " + error.message,
    });
  }
};
