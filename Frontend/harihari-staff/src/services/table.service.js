import http from "./../http-common";

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
  async checkout(guest_uid, bill_uid) {
    console.log(bill_uid)
    return await http
      .put("/table/checkout", {uid: bill_uid}, { headers: { "x-access-token": guest_uid }})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  async callWaiter(uid) {
    return await http
      .put("/table/callWaiter", {call_waiter: false}, { headers: { "x-access-token": uid }})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
})();
