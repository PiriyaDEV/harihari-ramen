const uuid = require("uuid");

const Table = require("../models/table.model");

exports.generate = (req, res) => {
  let table = new Table("");

  table.table_uid = uuid.v4();
  table.reserve = false;
  table.status = true;

  Table.create(table, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed creating a new table",
      });
    }

    return res.status(201).send(`<h1>New table generated : ${result.table_uid}</h1>`);
  });
};

exports.getTables = (req, res) => {
  Table.getTables((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed getting all tables",
      });
    }

    return res.status(200).json(result);
  });
};

exports.checkin = (req, res) => {
  let table = {
    table_uid: req.query.id,
    reserve: true,
  }

  Table.update(table, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed check-in table",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Checked-in successfully"
    });
  });
};