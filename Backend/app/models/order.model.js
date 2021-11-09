const sql = require("../database/connection");

exports.createOrder = async (order) => {
  order.status = "ordered";
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

exports.updateOrder = async (order) => {
  order.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `UPDATE orders SET ? WHERE order_id = '${order.order_id}'`,
      order
    );

    console.log(`Updated order >>> id: ${order.order_id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.createOrderMenu = async (info) => {
  try {
    const [result, fields] = await sql.query(
      `INSERT INTO
        order_menus (
          order_menu_id,
          order_id,
          product_id,
          ramen_id,
          quantity,
          comment,
          status,
          created_at,
          updated_at
        )
        VALUES ?`,
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

exports.getOrderHistory = async (order) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT
        O.order_id,
        O.status,
        O.created_at,
        (
          SELECT
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'product_id',
                OM.product_id,
                'name',
                IMM.name,
                'image_url',
                MM.image_url,
                'price',
                MM.price,
                'quantity',
                OM.quantity,
                'comment',
                OM.comment
              )
            )
          FROM
            order_menus OM
            LEFT JOIN main_menus MM ON OM.product_id = MM.product_id
            LEFT JOIN info_main_menus IMM ON MM.product_id = IMM.product_id
            AND IMM.language = 'en'
          WHERE
            OM.order_id = O.order_id
            AND OM.status = 1
        ) AS menus
        FROM
          Orders O
        WHERE
          O.bill_id = ${order.bill_id}
        ORDER BY
          O.created_at DESC`
    );

    console.log(`Selected ${result.length} order(s)`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
