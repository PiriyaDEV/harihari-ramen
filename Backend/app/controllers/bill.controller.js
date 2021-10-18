const Bill = require("../models/bill.model");


exports.create = (req, res) => {
    let bill = new Bill("");
  
    bill.table_id = req.body.table_id
    bill.status = true;
  
    Bill.create(bill, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message || "Failed creating a new bill",
        });
      }
  
      return res.status(201).send(`<h1>New bill generated : ${result.bill_id}</h1>`);
    });
  };
  