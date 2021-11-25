const Order = require("../models/order.model");
const Bill = require("../models/bill.model");
const socketIO = require("../sockets/index");

async function addCustomRamen(customs, infoArr, orderResult) {
  for (const custom of customs) {
    let result = await Order.findCustomRamen(custom);
    let ramen_id = null;

    if (result.isFound) {
      ramen_id = result.ramen_id;
    } else {
      let newCustomRamen = {
        price: custom.price,
        soup_type: custom.soup_type,
        noodle: custom.noodle,
        spring_onion: custom.spring_onion,
        garlic: custom.garlic,
        spice: custom.spice,
        chashu: custom.chashu,
        richness: custom.richness,
      };

      let customCreateResult = await Order.createCustomRamen(newCustomRamen);
      ramen_id = customCreateResult.ramen_id;
    }

    infoArr.push([
      null,
      orderResult.order_id,
      null,
      ramen_id,
      custom.quantity,
      custom.comment,
      true,
      Date.now(),
      Date.now(),
    ]);
  }

  return infoArr;
}

exports.create = async (req, res) => {
  let table = req.body.table;
  let bill = {
    table_id: table.table_id,
  };

  let info = req.body.info;
  let custom = req.body.custom;

  try {
    let billResult = await Bill.getLatestBillByTable(bill);
    let infoArr = [];

    let order = {
      bill_id: billResult.bill_id,
    };

    let orderResult = await Order.createOrder(order);

    if (info.length) {
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
    }

    if (custom.length) {
      infoArr = await addCustomRamen(custom, infoArr, orderResult);
    }

    let orderMenuResult = await Order.createOrderMenu(infoArr);

    let newSubtotal = await Order.getSubtotalByOrder(orderResult);

    let updateBill = {
      bill_id: billResult.bill_id,
      subtotal: Number(billResult.subtotal) + Number(newSubtotal),
    };
    await Bill.update(updateBill);

    let result = await Order.getOrderHistory(billResult);

    const socket = socketIO.getSocket();
    const room_id = table.guest_uid;

    socket.of("/harihari-staff").to("staff").emit("order-status", {
      table_id: table.table_id,
      orders: result,
    });
    socket.of("/harihari-customer").to(room_id).emit("order-history", result);

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
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  try {
    let billResult = await Bill.getLatestBillByTable(bill);

    if (!billResult.isFound) {
      return res.status(200).json([]);
    }

    let order = {
      bill_id: billResult.bill_id,
    };

    let result = await Order.getOrderHistory(order);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };
  const order = {
    order_id: req.body.order_id,
    status: req.body.status,
  };

  try {
    let updateOrder = {
      order_id: order.order_id,
      status: order.status,
    };
    await Order.updateOrder(updateOrder);

    let billResult = await Bill.getLatestBillByTable(bill);

    let result = await Order.getOrderHistory(billResult);

    const socket = socketIO.getSocket();
    const room_id = table.guest_uid;

    socket.of("/harihari-staff").to("staff").emit("order-status", {
      table_id: table.table_id,
      orders: result,
    });
    socket.of("/harihari-customer").to(room_id).emit("order-history", result);

    return res.status(200).json({
      success: true,
      message: "Updated order status successfully",
      order_id: updateOrder.order_id,
    });
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

    let result = await Order.getOrderHistory(billResult);

    const socket = socketIO.getSocket();
    const room_id = table.guest_uid;

    socket.of("/harihari-staff").to("staff").emit("order-status", {
      table_id: table.table_id,
      orders: result,
    });
    socket.of("/harihari-customer").to(room_id).emit("order-history", result);

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
