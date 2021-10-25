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

// exports.getBills = async (result, bill_id, table_id) => {
//   try {
//     const [result, fields] = await sql.query(
//       `SELECT subtotal FROM tables WHERE status = 1`
//     );

//     console.log(`Selected ${res.length} bill(s)`);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };
