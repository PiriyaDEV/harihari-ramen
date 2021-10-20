const uuid = require("uuid");

const Table = require("../models/table.model");

exports.generate = async (req, res) => {
  let table = {
    guest_uid: uuid.v4(),
    reserve: false,
    status: true,
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
  let guest_uid = req.query.id;

  let table = {
    guest_uid: guest_uid,
  };

  try {
    let findResult = await Table.find(table);

    if (!findResult.isFound || findResult.reserve) {
      return res.status(200).json({
        success: false,
        message: "Table not available",
        guest_uid: guest_uid,
      });
    }

    table.table_id = findResult.table_id;
    table.reserve = true;
    await Table.update(table);

    return res.status(200).json({
      success: true,
      message: "Checked in successfully",
      guest_uid: guest_uid,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
