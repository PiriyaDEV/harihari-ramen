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
        `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} `,
        err
      );
      result(err, null);
      return;
    }

    console.log(
      `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} Inserted ${
        res.affectedRows
      } table >>> id: ${res.insertId}`
    );
    result(null, { table_id: res.insertId, ...table });
    return;
  });
};

Table.update = (table, result) => {
  table.updated_at = Date.now();

  sql.query(
    `UPDATE tables SET ? WHERE table_uid = '${table.table_uid}'`,
    table,
    (err, res) => {
      if (err) {
        console.log(
          `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} `,
          err
        );
        result(err, null);
        return;
      }

      console.log(
        `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} Updated table >>> id: ${
          table.table_id
        }`
      );
      result(null, table);
      return;
    }
  );
};

Table.getTables = (result) => {
  sql.query(`SELECT table_id, table_uid, reserve FROM tables WHERE status = 1`, (err, res) => {
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

module.exports = Table;
