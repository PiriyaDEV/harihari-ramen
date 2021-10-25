const Bill = require("../models/bill.model");

exports.create = async (req, res) => {
  let bill = {
    table_id: req.body.table_id,
    status: true,
  };

  try {
    let result = await Bill.create(bill);

    return res.status(201).json({
      success: true,
      message: "Generated Successfully",
      bill_id: result.bill_id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
