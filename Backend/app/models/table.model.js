const sql = require("../database/connection");

exports.create = async (table) => {
  table.created_at = Date.now();
  table.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(`INSERT INTO tables SET ?`, table);

    console.log(
      `Inserted ${result.affectedRows} table >>> id: ${result.insertId}`
    );
    return { table_id: result.insertId, ...table };
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (table) => {
  table.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `UPDATE tables SET ? WHERE table_id = '${table.table_id}'`,
      table
    );

    console.log(`Updated table >>> id: ${table.table_id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.find = async (table) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT * FROM tables WHERE guest_uid = '${table.guest_uid}'`,
      table
    );

    if (result.length) {
      console.log(`Found table >>> id: ${result[0].table_id}`);
      return { isFound: true, ...result[0] };
    } else {
      console.log(`Not found table >>> id: ${table.guest_uid}`);
      return { isFound: false };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getTables = async (result) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT table_id, guest_uid, reserve FROM tables WHERE status = 1`
    );

    console.log(`Selected ${result.length} table(s)`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
