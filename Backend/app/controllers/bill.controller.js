const Bill = require("../models/bill.model");

// summarized bill
exports.summary = async (req, res) => {
  // get table info
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  try {
    // get bill info
    let billResult = await Bill.getLatestBillByTable(bill);

    // get bill summary
    let billSummary = await Bill.getBillSummary(billResult);
    let billCustomSummary = await Bill.getBillCustomSummary(billResult);

    // response the result
    return res.status(200).json({
      bill: {
        uid: billResult.uid,
        items: billSummary,
        custom: billCustomSummary,
      },
    });
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
