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
})();
