import http from "../http-common";

export default new (class OrderService {
  async createOrder(menu, uid) {
    return await http
      .post(
        "/order/create",
        { info: menu },
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
  async updateStatus(order,uid) {
    return await http
      .put("/order/updateStatus",{ order_id: order.order_id , status : order.status },{ headers: { "x-access-token": uid } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
})();
