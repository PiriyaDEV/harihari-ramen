const sql = require("../database/connection");

exports.createOrder = async (order) => {
  order.status = true;
  order.created_at = Date.now();
  order.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(`INSERT INTO orders SET ?`, order);

    console.log(
      `Inserted ${result.affectedRows} order >>> id: ${result.insertId}`
    );
    return { order_id: result.insertId, ...order };
  } catch (error) {
    console.log(error);
  }
};

exports.createOrderMenu = async (info) => {
  try {
    const [result, fields] = await sql.query(
      `INSERT INTO order_menus VALUES ?`,
      [info]
    );

    console.log(
      `Inserted ${result.affectedRows} menu(s) >>> order id: ${info[0][1]}`
    );
    return {
      order_id: info[0][1],
      inserted: result.affectedRows,
    };
  } catch (error) {
    console.log(error);
  }
};
