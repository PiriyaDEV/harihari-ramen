const Order = require("../models/order.model");
const Bill = require("../models/bill.model");

exports.create = async (req, res) => {
  let table = req.body.table;
  let bill = {
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
      info.comment,
      true,
      Date.now(),
      Date.now(),
    ]);

    let orderMenuResult = await Order.createOrderMenu(infoArr);

    let newSubtotal = await Order.getSubtotalByOrder(orderResult);

    let updateBill = {
      bill_id: billResult.bill_id,
      subtotal: Number(billResult.subtotal) + Number(newSubtotal),
    };
    await Bill.update(updateBill);

    return res.status(201).json({
      success: true,
      message: "Created Successfully",
      order_id: orderMenuResult.order_id,
      menuCount: orderMenuResult.inserted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrderHistory = async (req, res) => {
  const base_url = process.env.BASE_URL;

  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  try {
    let billResult = await Bill.getLatestBillByTable(bill);

    let order = {
      bill_id: billResult.bill_id,
    };

    let result = await Order.getOrderHistory(order);

    //result.map((menu) => (menu.image_url = `${base_url}${menu.image_url}`));

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.cancel = async (req, res) => {
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };
  const order = {
    order_id: req.body.order_id,
  };

  try {
    let billResult = await Bill.getLatestBillByTable(bill);

    let updateOrder = {
      order_id: order.order_id,
      status: "cancel",
    };
    await Order.updateOrder(updateOrder);

    let subtotal = await Order.getSubtotalByOrder(order);

    let updateBill = {
      bill_id: billResult.bill_id,
      subtotal: Number(billResult.subtotal) - Number(subtotal),
    };
    await Bill.update(updateBill);

    return res.status(200).json({
      success: true,
      message: "Canceled successfully",
      order_id: updateOrder.order_id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
