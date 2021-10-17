const sql = require("../database/connection");

const Table = function (table) {
  this.table_uid = table.table_uid;
  this.reserve = table.reserve;
  this.status = table.status;
  this.created_at = table.created_at;
  this.updated_at = table.updated_at;
};

Table.create = (table, result) => {
  table.created_at = Date.now();
  table.updated_at = Date.now();

  sql.query(`INSERT INTO tables SET ?`, table, (err, res) => {
    if (err) {
      console.log(
        `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} : `,
        err
      );
      result(err, null);
      return;
    }

    console.log(
      `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} : Inserted ${
        res.affectedRows
      } table(s) >>> id: ${res.insertId}`
    );
    result(null, { table_id: res.insertId, ...table });
    return;
  });
};

Table.getAlls = (result) => {
  sql.query(`SELECT * FROM tables`, (err, res) => {
    if (err) {
      console.log(
        `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} : `,
        err
      );
      result(err, null);
      return;
    }

    console.log(
      `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} : Selected ${
        res.length
      } table(s)`
    );
    result(null, res);
    return;
  });
};

module.exports = Table;
