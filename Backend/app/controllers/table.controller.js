const uuid = require("uuid");

const Table = require("../models/table.model");
const Bill = require("../models/bill.model");

exports.generate = async (req, res) => {
  const table = {
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

exports.getTableById = async (req, res) => {
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  try {
    let billResult = await Bill.getLatestBillByTable(bill);

    let result = {
      table_id: table.table_id,
      reserve: table.reserve,
      call_waiter:table.call_waiter,
      checkin_at: billResult.created_at,
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.callWaiter = async (req, res) => {
  const table = req.body.table;
  const call_waiter = req.body.call_waiter;

  try {
    let updateTable = {
      table_id: table.table_id,
      call_waiter: call_waiter,
    };

    await Table.update(updateTable);

    return res.status(200).json({
      success: true,
      message: "Called a waiter successfully",
      table_id: table.guest_uid,
    });
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
    uid: uuid.v4(),
  };

  try {
    let billResult = {};

    if (!table.reserve) {
      let updateTable = {
        table_id: table.table_id,
        reserve: true,
      };

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

exports.checkout = async (req, res) => {
  const table = req.body.table;
  const uid = req.body.uid;
  const bill = {
    table_id: table.table_id,
  };

  try {
    let billResult = await Bill.getLatestBillByTable(bill);

    if (billResult.uid !== uid) throw new Error("Invalid bill");

    let updateBill = {
      bill_id: billResult.bill_id,
      checkout_at: Date.now(),
    };
    await Bill.update(updateBill);

    let updateTable = {
      table_id: table.table_id,
      guest_uid: uuid.v4(),
      reserve: false,
    };
    await Table.update(updateTable);

    let billSummary = await Bill.getBillSummary(billResult);

    return res.status(200).json({
      success: true,
      message: "Checked out successfully",
      guest_uid: table.guest_uid,
      bill: {
        uid: billResult.uid,
        checkout_at: updateBill.checkout_at,
        items: billSummary,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
