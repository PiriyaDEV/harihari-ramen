import http from "../http-common";

export default new (class TableService {
  async getTables() {
    return await http
      .get("/table/allTables")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  async checkin(uid) {
    return await http
      .put("/table/checkin", {}, { headers: { "x-access-token": uid }})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  async callWaiter(uid) {
    return await http
      .put("/table/callWaiter", {call_waiter: true}, { headers: { "x-access-token": uid }})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  async getTableById(uid) {
    return await http
      .get("/table/getTableById", { headers: { "x-access-token": uid }})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.location = "http://localhost:3000/invalid";
        return error.response;
      });
  }
  
})();
