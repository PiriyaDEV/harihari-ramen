const uuid = require("uuid");

const Table = require("../models/table.model");
const Bill = require("../models/bill.model");

exports.generate = async (req, res) => {
  let table = {
    guest_uid: uuid.v4(),
  };

  try {
    let result = await Table.create(table);

    return res.status(201).json({
      success: true,
      message: "Generated Successfully",
      guest_uid: result.guest_uid,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTables = async (req, res) => {
  try {
    let result = await Table.getTables();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.checkin = async (req, res) => {
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  try {
    let billResult = {};

    if (!table.reserve) {
      const updateTable = {
        table_id: table.table_id,
        reserve: true,
      }

      await Table.update(updateTable);
      billResult = await Bill.create(bill);
    } else {
      billResult = await Bill.getLatestBillByTable(bill);
    }

    return res.status(200).json({
      success: true,
      message: "Checked in successfully",
      guest_uid: table.guest_uid,
      checkin_at: billResult.created_at,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
