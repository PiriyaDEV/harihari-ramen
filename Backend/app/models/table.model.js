const sql =  require("../database/connection");

// const Table = function (table) {
//   this.guest_uid = table.guest_uid;
//   this.reserve = table.reserve;
//   this.status = table.status;
//   this.created_at = table.created_at;
//   this.updated_at = table.updated_at;
// };

module.exports.create = async (table) => {
  table.created_at = Date.now();
  table.updated_at = Date.now();

  sql.query(`INSERT INTO tables SET ?`, table, (err, result) => {
    if (err) {
      console.log(
        `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} `,
        err
      );
      return err;
    }

    console.log(
      `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} Inserted ${
        result.affectedRows
      } table >>> id: ${result.insertId}`
    );
    return { table_id: result.insertId, ...table };
  });
};

module.exports.update = async (table, result) => {
  table.updated_at = Date.now();

  sql.query(
    `UPDATE tables SET ? WHERE table_id = '${table.table_id}'`,
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

module.exports.find = async (table, result) => {
  sql.query(
    `SELECT * FROM tables WHERE guest_uid = '${table.guest_uid}'`,
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

      if (res.length) {
        console.log(
          `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} Found table >>> id: ${
            res.table_id
          }`
        );
        result(null, { isFound: true, data: res });
        return;
      }

      console.log(
        `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} Not found table >>> id: ${
          table.guest_uid
        }`
      );
      result(null, { isFound: false });
      return;
    }
  );
};

module.exports.getTables = async (result) => {
  sql.query(
    `SELECT table_id, guest_uid, reserve FROM tables WHERE status = 1`,
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
        `${"\x1b[1m"}${"\x1b[38;5;105m"}[${Date()}]${"\x1b[0m"} Selected ${
          res.length
        } table(s)`
      );
      result(null, res);
      return;
    }
  );
};
