const Order = require("../models/order.model");
const Bill = require("../models/bill.model");
const socketIO = require("../sockets/index");

// create a new custom ramen order
async function addCustomRamen(customs, infoArr, orderResult) {
  // iterate for every item
  for (const custom of customs) {
    // check if the custom ramen combination exists
    let result = await Order.findCustomRamen(custom);
    let ramen_id = null;

    // custom ramen exists, can use its id
    if (result.isFound) {
      ramen_id = result.ramen_id;
    }
    // custom ramen does not exist, insert a new one
    else {
      // custom ramen object
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

      // insert a new custom ramen
      let customCreateResult = await Order.createCustomRamen(newCustomRamen);
      ramen_id = customCreateResult.ramen_id;
    }

    // push custom ramens to order menu list
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

// create a new order
exports.create = async (req, res) => {
  // get table info
  let table = req.body.table;
  let bill = {
    table_id: table.table_id,
  };

  // get order info
  let info = req.body.info;
  let custom = req.body.custom;

  try {
    // get bill info
    let billResult = await Bill.getLatestBillByTable(bill);
    let infoArr = [];

    let order = {
      bill_id: billResult.bill_id,
    };

    // create a new order
    let orderResult = await Order.createOrder(order);

    // if there is a main menu in the order
    if (info.length) {
      // map main menus to order menu list
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

    // if there is a custom ramen in the order
    if (custom.length) {
      infoArr = await addCustomRamen(custom, infoArr, orderResult);
    }

    // insert all order menus
    let orderMenuResult = await Order.createOrderMenu(infoArr);

    // get subtotal for this order
    let newSubtotal = await Order.getSubtotalByOrder(orderResult);

    // update subtotal to the bill
    let updateBill = {
      bill_id: billResult.bill_id,
      subtotal: Number(billResult.subtotal) + Number(newSubtotal),
    };
    await Bill.update(updateBill);

    // get all order info
    let result = await Order.getOrderHistory(billResult);

    // get socket to emit
    const socket = socketIO.getSocket();
    const room_id = table.guest_uid;

    // emit all order info to staff
    socket.of("/harihari-staff").to("staff").emit("order-status", {
      table_id: table.table_id,
      orders: result,
    });
    // emit all order info to all customers in this table
    socket.of("/harihari-customer").to(room_id).emit("order-history", result);

    // response the result
    return res.status(201).json({
      success: true,
      message: "Created Successfully",
      order_id: orderMenuResult.order_id,
      menuCount: orderMenuResult.inserted,
    });
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all order's history by table
exports.getOrderHistory = async (req, res) => {
  // get table info
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  try {
    // get bill info
    let billResult = await Bill.getLatestBillByTable(bill);

    // if bill is not exist, return empty
    if (!billResult.isFound) {
      return res.status(200).json([]);
    }

    let order = {
      bill_id: billResult.bill_id,
    };

    // get all order info
    let result = await Order.getOrderHistory(order);

    // response the result
    return res.status(200).json(result);
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update order status
exports.updateStatus = async (req, res) => {
  // get table info
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  // get order status info
  const order = {
    order_id: req.body.order_id,
    status: req.body.status,
  };

  try {
    // get bill info
    let billResult = await Bill.getLatestBillByTable(bill);

    // update the order
    let updateOrder = {
      order_id: order.order_id,
      status: order.status,
    };
    await Order.updateOrder(updateOrder);

    // get all order info
    let result = await Order.getOrderHistory(billResult);

    // get socket to emit
    const socket = socketIO.getSocket();
    const room_id = table.guest_uid;

    // emit all order info to staff
    socket.of("/harihari-staff").to("staff").emit("order-status", {
      table_id: table.table_id,
      orders: result,
    });
    // emit all order info to all customers in this table
    socket.of("/harihari-customer").to(room_id).emit("order-history", result);

    // response the result
    return res.status(200).json({
      success: true,
      message: "Updated order status successfully",
      order_id: updateOrder.order_id,
    });
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// cancel order
exports.cancel = async (req, res) => {
  // get table info
  const table = req.body.table;
  const bill = {
    table_id: table.table_id,
  };

  // get order status info
  const order = {
    order_id: req.body.order_id,
  };

  try {
    // get bill info
    let billResult = await Bill.getLatestBillByTable(bill);

    // update the order
    let updateOrder = {
      order_id: order.order_id,
      status: "cancel",
    };
    await Order.updateOrder(updateOrder);

    // get subtotal for this order
    let subtotal = await Order.getSubtotalByOrder(order);

    // update subtotal to the bill
    let updateBill = {
      bill_id: billResult.bill_id,
      subtotal: Number(billResult.subtotal) - Number(subtotal),
    };
    await Bill.update(updateBill);

    // get all order info
    let result = await Order.getOrderHistory(billResult);

    // get socket to emit
    const socket = socketIO.getSocket();
    const room_id = table.guest_uid;

    // emit all order info to staff
    socket.of("/harihari-staff").to("staff").emit("order-status", {
      table_id: table.table_id,
      orders: result,
    });
    // emit all order info to all customers in this table
    socket.of("/harihari-customer").to(room_id).emit("order-history", result);

    // response the result
    return res.status(200).json({
      success: true,
      message: "Canceled successfully",
      order_id: updateOrder.order_id,
    });
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
