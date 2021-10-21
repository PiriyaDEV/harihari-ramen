const sql = require("../database/connection");

exports.createMainMenu = async (menu) => {
  menu.created_at = Date.now();
  menu.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `INSERT INTO main_menus SET ?`,
      menu
    );

    console.log(
      `Inserted ${result.affectedRows} menu >>> id: ${result.insertId}`
    );
    return { product_id: result.insertId, ...menu };
  } catch (error) {
    console.log(error);
  }
};

exports.createInfoMainMenu = async (info) => {
  let values = []
  info.forEach((item) => 
    values.push([
      item.product_id,
      item.language,
      item.name,
      item.category,
      item.description,
      item.status,
      Date.now(),
      Date.now(),
    ])
  );
    console.log(values)
  try {
    const [result, fields] = await sql.query(
      `INSERT INTO info_main_menus VALUES ?`,
      [info]
    );
    console.log(result);
    // console.log(
    //   `Inserted ${result.affectedRows} menu >>> id: ${result.insertId}`
    // );
    return result; //{ product_id: result.insertId, ...menu };
  } catch (error) {
    console.log(error);
  }
};

exports.getMenus = async (result) => {
  try {
    const [result, fields] = await sql.query(
      `SELECT * FROM tables WHERE status = 1`
    );

    console.log(`Selected ${result.length} menu(s)`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
