import http from "../http-common";

// Call the bill api to get the bill information.
export default new (class BillService {
  async summary(uid) {
    return await http
      .get("/bill/summary", { headers: { "x-access-token": uid }})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
})();
