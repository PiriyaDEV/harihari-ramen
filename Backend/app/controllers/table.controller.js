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
        message: err.message || "Failed creating a new table",
      });
    }

    return res.status(201).send(`<h1>New table generated : ${result.table_uid}</h1>`);
  });
};

exports.getAlls = (req, res) => {
  Table.getAlls((err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message || "Failed getting all tables",
      });
    }

    return res.status(200).json(result);
  });
};