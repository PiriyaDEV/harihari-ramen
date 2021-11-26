const sql = require("../database/connection");
const logger = require("../../lib/logger/index");

// function using for creating new table
exports.create = async (table) => {
  table.reserve = false;
  table.call_waiter = false;
  table.status = true;
  table.created_at = Date.now();
  table.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(`INSERT INTO tables SET ?`, table);

    logger.info(
      `Inserted ${result.affectedRows} table >>> id: ${result.insertId}`
    );
    return { table_id: result.insertId, ...table };
  } catch (error) {
    // if query error
    logger.error(error);
  }
};

// function for updating table
exports.update = async (table) => {
  table.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `UPDATE tables SET ? WHERE table_id = '${table.table_id}'`,
      table
    );

    logger.info(`Updated table >>> id: ${table.table_id}`);
  } catch (error) {
    // if query error
    logger.error(error);
  }
};

// function that use to find the existing table
exports.find = async (table) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT * FROM tables WHERE guest_uid = '${table.guest_uid}'`,
      table
    );

    // found data
    if (result.length) {
      logger.info(`Found table >>> id: ${result[0].table_id}`);
      return { isFound: true, ...result[0] };
    }
    // not found data
    else {
      logger.info(`Not found table >>> id: ${table.guest_uid}`);
      return { isFound: false };
    }
  } catch (error) {
    // if query error
    logger.error(error);
  }
};

// function that query all tables in the database
exports.getTables = async (result) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT table_id, guest_uid, reserve, call_waiter FROM tables WHERE status = 1 ORDER BY table_id`
    );

    logger.info(`Selected ${result.length} table(s)`);
    return result;
  } catch (error) {
    // if query error
    logger.error(error);
  }
};
