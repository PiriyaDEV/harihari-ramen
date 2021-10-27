const Order = require("../models/order.model");
const Bill = require("../models/bill.model");

exports.create = async (req, res) => {
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  let info = req.body.info;

  try {
    let billResult = await Bill.getLatestBillByTable(bill);
    let infoArr = [];

    let order = {
      bill_id: billResult.bill_id,
    };

    let orderResult = await Order.createOrder(order);

    infoArr = info.map((info) => [
      null,
      orderResult.order_id,
      info.product_id,
      null,
      info.quantity,
      true,
      Date.now(),
      Date.now(),
    ]);

    let orderMenuResult = await Order.createOrderMenu(infoArr);

    return res.status(201).json({
      success: true,
      message: "Created Successfully",
      order_id: orderMenuResult.order_id,
      menuCount: orderMenuResult.inserted
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
