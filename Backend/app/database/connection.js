const mysql = require("mysql2/promise");

const logger = require("../../lib/logger/index");
const dbConfig = require("../config/db.config");

// mysql database config
const config = {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  decimalNumbers: true,
};

// connect to database
function handleConnection() {
  try {
    // initialize pool connection
    let pool = mysql.createPool(config);

    logger.info(
      `Successfully connected to ${dbConfig.DB} database on port ${dbConfig.PORT}.`
    );
    return pool;
  } catch (error) {
    // if connection error
    logger.error(error);
  }
}

const pool = handleConnection();

module.exports = pool;
