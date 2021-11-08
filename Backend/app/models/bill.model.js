const sql = require("../database/connection");

exports.create = async (bill) => {
  bill.subtotal = 0;
  bill.status = true;
  bill.checkout_at = 0;
  bill.created_at = Date.now();
  bill.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(`INSERT INTO bills SET ?`, bill);

    console.log(
      `Inserted ${result.affectedRows} bill >>> id: ${result.insertId}`
    );
    return { bill_id: result.insertId, ...bill };
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (bill) => {
  bill.updated_at = Date.now();

  try {
    const [result, fields] = await sql.query(
      `UPDATE bills SET ? WHERE bill_id = '${bill.bill_id}'`,
      bill
    );

    console.log(`Updated bill >>> id: ${bill.bill_id}`);
  } catch (error) {
    console.log(error);
  }
};

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

    if (result.length) {
      console.log(`Found bill >>> id: ${result[0].bill_id}`);
      return { isFound: true, ...result[0] };
    } else {
      console.log(`Not found bill >>> id: ${bill.table_id}`);
      return { isFound: false };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getBillSummary = async (bill) => {
  try {
    const [result, fields] = await sql.query(
      ``
    );

    console.log(`Selected ${result.length} menu(s) >>> bill id: ${bill.bill_id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
