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
})();
