const uuid = require("uuid");

const Table = require("../models/table.model");
const Bill = require("../models/bill.model");
const socketIO = require("../sockets/index");

// generate a new table
exports.generate = async (req, res) => {
  // get new UUID
  const table = {
    guest_uid: uuid.v4(),
  };

  try {
    // insert a new table
    let result = await Table.create(table);

    // response the result
    return res.status(201).json({
      success: true,
      message: "Generated Successfully",
      guest_uid: result.guest_uid,
    });
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all tables
exports.getTables = async (req, res) => {
  try {
    // get data
    let result = await Table.getTables();

    // response the result
    return res.status(200).json(result);
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get table info by id
exports.getTableById = async (req, res) => {
  // get table info
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  try {
    // get bill info
    let billResult = await Bill.getLatestBillByTable(bill);

    // prepare result object
    let result = {
      table_id: table.table_id,
      reserve: table.reserve,
      call_waiter: table.call_waiter,
      checkin_at: billResult.created_at,
    };

    // response the result
    return res.status(200).json(result);
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update call waiter status
exports.callWaiter = async (req, res) => {
  // get table info
  const table = req.body.table;
  const call_waiter = req.body.call_waiter;

  try {
    // update the table
    let updateTable = {
      table_id: table.table_id,
      call_waiter: call_waiter,
    };
    await Table.update(updateTable);

    // get all table info
    let result = await Table.getTables();

    // get socket to emit
    const socket = socketIO.getSocket();
    const room_id = table.guest_uid;

    // emit all table info to staff
    socket.of("/harihari-staff").to("staff").emit("call-waiter", result);
    // emit table info to all customers in this table
    socket
      .of("/harihari-customer")
      .to(room_id)
      .emit("call-waiter", updateTable.call_waiter);

    // response the result
    return res.status(200).json({
      success: true,
      message: "Called a waiter successfully",
      table_id: table.guest_uid,
    });
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// customer check in
exports.checkin = async (req, res) => {
  // get table info
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
    uid: uuid.v4(),
  };

  try {
    let billResult = {};

    // check if a new customer enter
    if (!table.reserve) {
      let updateTable = {
        table_id: table.table_id,
        reserve: true,
      };

      // update table status and create a new bill
      await Table.update(updateTable);
      billResult = await Bill.create(bill);
    }
    // customer already checked-in this table
    else {
      // get bill info
      billResult = await Bill.getLatestBillByTable(bill);
    }

    // response the result
    return res.status(200).json({
      success: true,
      message: "Checked in successfully",
      guest_uid: table.guest_uid,
      checkin_at: billResult.created_at,
    });
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// customer check out
exports.checkout = async (req, res) => {
  // get table info
  const table = req.body.table;
  const uid = req.body.uid;
  const bill = {
    table_id: table.table_id,
  };

  try {
    // get bill info
    let billResult = await Bill.getLatestBillByTable(bill);

    // if bill id is invalid
    if (billResult.uid !== uid) throw new Error("Invalid bill");

    // update check out time
    let updateBill = {
      bill_id: billResult.bill_id,
      checkout_at: Date.now(),
    };
    await Bill.update(updateBill);

    // update table status and new guest id
    let updateTable = {
      table_id: table.table_id,
      guest_uid: uuid.v4(),
      reserve: false,
    };
    await Table.update(updateTable);

    // get bill summary
    let billSummary = await Bill.getBillSummary(billResult);
    let billCustomSummary = await Bill.getBillCustomSummary(billResult);

    // response the result
    return res.status(200).json({
      success: true,
      message: "Checked out successfully",
      guest_uid: table.guest_uid,
      bill: {
        uid: billResult.uid,
        checkout_at: updateBill.checkout_at,
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
