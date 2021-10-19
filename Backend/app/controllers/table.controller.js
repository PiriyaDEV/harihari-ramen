const uuid = require("uuid");

const Table = require("../models/table.model");

// exports.generate = async (req, res) => {
//   let table = new Table("");

//   table.guest_uid = uuid.v4();
//   table.reserve = false;
//   table.status = true;

//   Table.create(table, (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: err.message
//       });
//     }

//     return res
//       .status(201)
//       .send(`<h1>New table generated : ${result.guest_uid}</h1>`);
//   });
// };
exports.generate = async (req, res) => {
  let table = {
    guest_uid: uuid.v4(),
    reserve: false,
    status: true,
  };

  try {
    result = await Table.create(table);
    
    return await res
      .status(201)
      .send(`<h1>New table generated : ${result.guest_uid}</h1>`);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getTables = (req, res) => {
  Table.getTables((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(200).json(result);
  });
};

exports.checkin = async (req, res) => {
  let guest_uid = req.query.id;

  let table = {
    guest_uid: guest_uid,
    reserve: true,
  };

  Table.update(table, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Checked-in successfully",
      guest_uid: table.guest_uid,
    });
  });
};
