const sql = require("../database/connection");

const Bill = function (bill) {
  this.table_id = bill.table_id;
  this.subtotal = bill.subtotal;
  this.status = bill.status;
  this.checkout_at = bill.checkout_at;
  this.created_at = bill.created_at;
  this.updated_at = bill.updated_at;
};

Bill.create = (bill, result) => {
  bill.created_at = Date.now();
  bill.updated_at = Date.now();
  bill.checkout_at = Date.now();
  bill.subtotal = 0;


  sql.query(`INSERT INTO bills SET ?`, bill, (err, res) => {
    if (err) {
      console.log(
        `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} `,
        err
      );
      result(err, null);
      return;
    }

    console.log(
      `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} Inserted ${
        res.affectedRows
      } bill >>> id: ${res.insertId}`
    );
    result(null, { bill_id: res.insertId, ...bill });
    return;
  });
};

Bill.getBills = (result) => {
  sql.query(`SELECT subtotal FROM tables WHERE status = 1 AND `, (err, res) => {
    if (err) {
      console.log(
        `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} `,
        err
      );
      result(err, null);
      return;
    }

    console.log(
      `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} Selected ${
        res.length
      } table(s)`
    );
    result(null, res);
    return;
  });
};
module.exports = Bill;
