const sql = require("../database/connection");
const logger = require("../../lib/logger/index");

// function using for creating new bill
exports.create = async (bill) => {
  bill.subtotal = 0;
  bill.status = true;
  bill.checkout_at = 0;
  bill.created_at = Date.now();
  bill.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(`INSERT INTO bills SET ?`, bill);

    logger.info(
      `Inserted ${result.affectedRows} bill >>> id: ${result.insertId}`
    );
    return { bill_id: result.insertId, ...bill };
  } catch (error) {
    // if query error
    logger.error(error);
  }
};

// function for updating bill
exports.update = async (bill) => {
  bill.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `UPDATE bills SET ? WHERE bill_id = '${bill.bill_id}'`,
      bill
    );

    logger.info(`Updated bill >>> id: ${bill.bill_id}`);
  } catch (error) {
    // if query error
    logger.error(error);
  }
};

// function that use for query leastest bill by using table
exports.getLatestBillByTable = async (bill) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT * FROM bills
        WHERE
          table_id = ${bill.table_id}
          AND checkout_at = 0
        ORDER BY created_at DESC
        LIMIT 1`
    );

    // found data
    if (result.length) {
      logger.info(`Found bill >>> id: ${result[0].bill_id}`);
      return { isFound: true, ...result[0] };
    }
    // not found data
    else {
      logger.info(`Not found bill >>> id: ${bill.table_id}`);
      return { isFound: false };
    }
  } catch (error) {
    // if query error
    logger.error(error);
  }
};

// function that query for summary for that bill (main menus)
exports.getBillSummary = async (bill) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT
        MM.product_id,
        MM.price,
        SUM(OM.quantity) AS quantity,
        GROUP_CONCAT(COMMENT SEPARATOR ', ') AS comment,
        (
          SELECT
            IMM.name
          FROM
            info_main_menus IMM
          WHERE
            IMM.product_id = MM.product_id
            AND IMM.language = 'en'
            AND IMM.status = 1
        ) AS en,
        (
          SELECT
            IMM.name
          FROM
            info_main_menus IMM
          WHERE
            IMM.product_id = MM.product_id
            AND IMM.language = 'jp'
            AND IMM.status = 1
        ) AS jp,
        (
          SELECT
            IMM.name
          FROM
            info_main_menus IMM
          WHERE
            IMM.product_id = MM.product_id
            AND IMM.language = 'th'
            AND IMM.status = 1
        ) AS th
        FROM
          bills B,
          orders O,
          order_menus OM,
          main_menus MM
        WHERE
          B.bill_id = ${bill.bill_id}
          AND B.bill_id = O.bill_id
          AND O.order_id = OM.order_id
          AND MM.product_id = OM.product_id
          AND O.status = 'served'
        GROUP BY
          OM.product_id,
          OM.ramen_id`
    );

    logger.info(
      `Selected ${result.length} menu(s) >>> bill id: ${bill.bill_id}`
    );
    return result;
  } catch (error) {
    // if query error
    logger.error(error);
  }
};

// function that query for summary for that bill (custom ramens)
exports.getBillCustomSummary = async (bill) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT
        CR.ramen_id,
        CR.price,
        SUM(OM.quantity) AS quantity,
        GROUP_CONCAT(COMMENT SEPARATOR ', ') AS comment,
        (
          SELECT
            JSON_OBJECT(
              'soup_type',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.soup_type = IRC.choice_id
                  AND IRC.language = 'en'
                  AND IRC.status = 1
              ),
              'noodle',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.noodle = IRC.choice_id
                  AND IRC.language = 'en'
                  AND IRC.status = 1
              ),
              'spring_onion',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.spring_onion = IRC.choice_id
                  AND IRC.language = 'en'
                  AND IRC.status = 1
              ),
              'garlic',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.garlic = IRC.choice_id
                  AND IRC.language = 'en'
                  AND IRC.status = 1
              ),
              'spice',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.spice = IRC.choice_id
                  AND IRC.language = 'en'
                  AND IRC.status = 1
              ),
              'chashu',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.chashu = IRC.choice_id
                  AND IRC.language = 'en'
                  AND IRC.status = 1
              ),
              'richness',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.richness = IRC.choice_id
                  AND IRC.language = 'en'
                  AND IRC.status = 1
              )
            )
        ) AS en,
        (
          SELECT
            JSON_OBJECT(
              'soup_type',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.soup_type = IRC.choice_id
                  AND IRC.language = 'jp'
                  AND IRC.status = 1
              ),
              'noodle',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.noodle = IRC.choice_id
                  AND IRC.language = 'jp'
                  AND IRC.status = 1
              ),
              'spring_onion',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.spring_onion = IRC.choice_id
                  AND IRC.language = 'jp'
                  AND IRC.status = 1
              ),
              'garlic',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.garlic = IRC.choice_id
                  AND IRC.language = 'jp'
                  AND IRC.status = 1
              ),
              'spice',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.spice = IRC.choice_id
                  AND IRC.language = 'jp'
                  AND IRC.status = 1
              ),
              'chashu',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.chashu = IRC.choice_id
                  AND IRC.language = 'jp'
                  AND IRC.status = 1
              ),
              'richness',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.richness = IRC.choice_id
                  AND IRC.language = 'jp'
                  AND IRC.status = 1
              )
            )
        ) AS jp,
        (
          SELECT
            JSON_OBJECT(
              'soup_type',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.soup_type = IRC.choice_id
                  AND IRC.language = 'th'
                  AND IRC.status = 1
              ),
              'noodle',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.noodle = IRC.choice_id
                  AND IRC.language = 'th'
                  AND IRC.status = 1
              ),
              'spring_onion',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.spring_onion = IRC.choice_id
                  AND IRC.language = 'th'
                  AND IRC.status = 1
              ),
              'garlic',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.garlic = IRC.choice_id
                  AND IRC.language = 'th'
                  AND IRC.status = 1
              ),
              'spice',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.spice = IRC.choice_id
                  AND IRC.language = 'th'
                  AND IRC.status = 1
              ),
              'chashu',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.chashu = IRC.choice_id
                  AND IRC.language = 'th'
                  AND IRC.status = 1
              ),
              'richness',
              (
                SELECT
                  IRC.name
                FROM
                  info_ramen_choices IRC
                WHERE
                  CR.richness = IRC.choice_id
                  AND IRC.language = 'th'
                  AND IRC.status = 1
              )
            )
        ) AS th
        FROM
          bills B,
          orders O,
          order_menus OM,
          custom_ramens CR
        WHERE
          B.bill_id = ${bill.bill_id}
          AND B.bill_id = O.bill_id
          AND O.order_id = OM.order_id
          AND CR.ramen_id = OM.ramen_id
          AND O.status = 'served'
        GROUP BY
          OM.ramen_id`
    );

    logger.info(
      `Selected ${result.length} custom ramen(s) >>> bill id: ${bill.bill_id}`
    );
    return result;
  } catch (error) {
    // if query error
    logger.error(error);
  }
};
