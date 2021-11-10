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
  
})();
