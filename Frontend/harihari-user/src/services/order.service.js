import http from "../http-common";

// Call the order api to get the order information.
export default new (class OrderService {
  async createOrder(menu, menuCustom, uid) {
    return await http
      .post(
        "/order/create",
        { info: menu, custom: menuCustom },
        { headers: { "x-access-token": uid } }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  async getOrderHistory(uid) {
    return await http
      .get("/order/orderHistory",{ headers: { "x-access-token": uid } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  async cancelOrder(order,uid) {
    return await http
      .put(
        "/order/cancel",
        { order_id: order },
        { headers: { "x-access-token": uid } }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
})();
