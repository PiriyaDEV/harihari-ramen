const Bill = require("../models/bill.model");

exports.summary = async (req, res) => {
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  try {
    let billResult = await Bill.getLatestBillByTable(bill);

    let billSummary = await Bill.getBillSummary(billResult);

    return res.status(200).json({
      bill: {
        uid: billResult.uid,
        items: billSummary
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};