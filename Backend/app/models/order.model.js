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

exports.getSubtotalByOrder = async (order) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT
          SUM(O.quantity * M.price) AS subtotal
        FROM
          order_menus O
          LEFT JOIN main_menus M ON O.product_id = M.product_id
        WHERE
          O.order_id = ${order.order_id}
          AND O.status = 1`
    );
    
    console.log(
      `Subtotal ${result[0].subtotal} baht >>> order id: ${order.order_id}`
    );

    return result[0].subtotal;
  } catch (error) {
    console.log(error);
  }
};
