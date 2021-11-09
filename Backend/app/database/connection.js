const mysql = require("mysql2/promise");

const dbConfig = require("../config/db.config");

const config = {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  decimalNumbers: true
};

function handleConnection() {
  try {
    let pool = mysql.createPool(config);

    console.log(
      `Successfully connected to ${dbConfig.DB} database on port ${dbConfig.PORT}.`
    );
    return pool;
  } catch (error) {
    console.log(error);
  }
}

const pool = handleConnection();

module.exports = pool;
