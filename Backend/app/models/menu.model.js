const sql = require("../database/connection");
const logger = require("../../lib/logger/index");

exports.createMainMenu = async (menu) => {
  menu.status = true;
  menu.created_at = Date.now();
  menu.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `INSERT INTO main_menus SET ?`,
      menu
    );

    logger.info(
      `Inserted ${result.affectedRows} menu >>> id: ${result.insertId}`
    );
    return { product_id: result.insertId, ...menu };
  } catch (error) {
    logger.error(error);
  }
};

exports.createInfoMainMenu = async (info) => {
  try {
    const [result, fields] = await sql.query(
      `INSERT INTO
        info_main_menus (
          product_id,
          language,
          name,
          category,
          description,
          status,
          created_at,
          updated_at
        )
        VALUES ?`,
      [info]
    );

    logger.info(
      `Inserted ${result.affectedRows} menu's info(s) >>> menu id: ${info[0][0]}`
    );
    return {
      product_id: info[0][0],
      name: info[0][2],
      inserted: result.affectedRows,
    };
  } catch (error) {
    logger.error(error);
  }
};

exports.createChoice = async (choice) => {
  choice.status = true;
  choice.created_at = Date.now();
  choice.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `INSERT INTO ramen_choices SET ?`,
      choice
    );

    logger.info(
      `Inserted ${result.affectedRows} choice >>> id: ${result.insertId}`
    );
    return { choice_id: result.insertId, ...choice };
  } catch (error) {
    logger.error(error);
  }
};

exports.createInfoChoice = async (info) => {
  try {
    const [result, fields] = await sql.query(
      `INSERT INTO
        info_ramen_choices (
          choice_id,
          language,
          name,
          category,
          description,
          status,
          created_at,
          updated_at
        )
        VALUES ?`,
      [info]
    );

    logger.info(
      `Inserted ${result.affectedRows} choice's info(s) >>> choice id: ${info[0][0]}`
    );
    return {
      choice_id: info[0][0],
      name: info[0][2],
      inserted: result.affectedRows,
    };
  } catch (error) {
    logger.error(error);
  }
};

exports.getMainMenus = async (result) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT
        M.product_id,
        M.image_url,
        M.price,
        (
          SELECT
            JSON_OBJECT(
              'name',
              I.name,
              'category',
              I.category,
              'description',
              I.description
            )
          FROM
            info_main_menus I
          WHERE
            I.product_id = M.product_id
            AND I.language = 'en'
            AND I.status = 1
        ) AS en,
        (
          SELECT
            JSON_OBJECT(
              'name',
              I.name,
              'category',
              I.category,
              'description',
              I.description
            )
          FROM
            info_main_menus I
          WHERE
            I.product_id = M.product_id
            AND I.language = 'jp'
            AND I.status = 1
        ) AS jp,
        (
          SELECT
            JSON_OBJECT(
              'name',
              I.name,
              'category',
              I.category,
              'description',
              I.description
            )
          FROM
            info_main_menus I
          WHERE
            I.product_id = M.product_id
            AND I.language = 'th'
            AND I.status = 1
        ) AS th
        FROM
          main_menus M
        WHERE
          M.status = 1`
    );

    logger.info(`Selected ${result.length} menu(s)`);
    return result;
  } catch (error) {
    logger.error(error);
  }
};

exports.getCustomRamen = async (result) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT
      RC.choice_id,
      RC.image_url,
      (
        SELECT
          JSON_OBJECT(
            'name',
            I.name,
            'category',
            I.category,
            'description',
            I.description
          )
        FROM
         info_ramen_choices I
        WHERE
          I.choice_id = RC.choice_id
          AND I.language = 'en'
          AND I.status = 1
      ) AS en,
      (
        SELECT
          JSON_OBJECT(
            'name',
            I.name,
            'category',
            I.category,
            'description',
            I.description
          )
        FROM
         info_ramen_choices I
        WHERE
          I.choice_id = RC.choice_id
          AND I.language = 'jp'
          AND I.status = 1
      ) AS jp,
      (
        SELECT
          JSON_OBJECT(
            'name',
            I.name,
            'category',
            I.category,
            'description',
            I.description
          )
        FROM
       info_ramen_choices I
        WHERE
          I.choice_id = RC.choice_id
          AND I.language = 'th'
          AND I.status = 1
      ) AS th
      FROM
        ramen_choices RC
      WHERE
        RC.status = 1`
    );

    logger.info(`Selected ${result.length} choice(s)`);
    return result;
  } catch (error) {
    logger.error(error);
  }
};
