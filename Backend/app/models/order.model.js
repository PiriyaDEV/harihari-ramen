const sql = require("../database/connection");
const logger = require("../../lib/logger/index");

exports.createOrder = async (order) => {
  order.status = "ordered";
  order.created_at = Date.now();
  order.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(`INSERT INTO orders SET ?`, order);

    logger.info(
      `Inserted ${result.affectedRows} order >>> id: ${result.insertId}`
    );
    return { order_id: result.insertId, ...order };
  } catch (error) {
    logger.error(error);
  }
};

exports.updateOrder = async (order) => {
  order.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `UPDATE orders SET ? WHERE order_id = '${order.order_id}'`,
      order
    );

    logger.info(`Updated order >>> id: ${order.order_id}`);
  } catch (error) {
    logger.error(error);
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

    logger.info(
      `Inserted ${result.affectedRows} menu(s) >>> order id: ${info[0][1]}`
    );
    return {
      order_id: info[0][1],
      inserted: result.affectedRows,
    };
  } catch (error) {
    logger.error(error);
  }
};

exports.createCustomRamen = async (custom) => {
  custom.status = true;
  custom.created_at = Date.now();
  custom.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `INSERT INTO custom_ramens SET ?`,
      custom
    );

    logger.info(
      `Inserted ${result.affectedRows} menu >>> id: ${result.insertId}`
    );
    return {
      ramen_id: result.insertId,
      ...custom,
    };
  } catch (error) {
    logger.error(error);
  }
};

exports.findCustomRamen = async (custom) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT
          *
        FROM
          custom_ramens
        WHERE
          soup_type = ${custom.soup_type}
          AND noodle = ${custom.noodle}
          AND spring_onion = ${custom.spring_onion}
          AND garlic = ${custom.garlic}
          AND spice = ${custom.spice}
          AND chashu = ${custom.chashu}
          AND richness = ${custom.richness}
          AND grease = ${custom.grease}`,
      custom
    );

    if (result.length) {
      logger.info(`Found ramen >>> id: ${result[0].ramen_id}`);
      return { isFound: true, ...result[0] };
    } else {
      logger.info(`Not found ramen`);
      return { isFound: false };
    }
  } catch (error) {
    logger.error(error);
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

    logger.info(
      `Subtotal ${result[0].subtotal} baht >>> order id: ${order.order_id}`
    );

    return result[0].subtotal;
  } catch (error) {
    logger.error(error);
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
                'price',
                MM.price,
                'quantity',
                OM.quantity,
                'comment',
                OM.comment,
                'en',
                (
                  SELECT
                    IMM.name
                  FROM
                    info_main_menus IMM
                  WHERE
                    IMM.product_id = OM.product_id
                    AND IMM.language = 'en'
                    AND IMM.status = 1
                ),
                'jp',
                (
                  SELECT
                    IMM.name
                  FROM
                    info_main_menus IMM
                  WHERE
                    IMM.product_id = OM.product_id
                    AND IMM.language = 'jp'
                    AND IMM.status = 1
                ),
                'th',
                (
                  SELECT
                    IMM.name
                  FROM
                    info_main_menus IMM
                  WHERE
                    IMM.product_id = OM.product_id
                    AND IMM.language = 'th'
                    AND IMM.status = 1
                )       
              )
            )
          FROM
            order_menus OM
            LEFT JOIN main_menus MM ON OM.product_id = MM.product_id
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

    logger.info(`Selected ${result.length} order(s)`);
    return result;
  } catch (error) {
    logger.error(error);
  }
};
