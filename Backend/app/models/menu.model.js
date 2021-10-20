const sql = require("../database/connection");

exports.create = async (menu) => {
  menu.created_at = Date.now();
  menu.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(`INSERT INTO main_menus SET ?`, menu);

    console.log(
      `Inserted ${result.affectedRows} menu >>> id: ${result.insertId}`
    );
    return { product_id: result.insertId, ...menu };
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
