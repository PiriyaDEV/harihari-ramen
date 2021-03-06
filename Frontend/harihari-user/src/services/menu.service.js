import http from "../http-common";

// Call the menu api to get the menu information.
export default new (class MenuService {
  async getMainMenus(value) {
    return await http
      .get("/menu/mainMenus")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  async customRamen() {
    return await http
      .get("/menu/customRamen")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
})();
