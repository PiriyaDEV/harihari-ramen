import http from "./../http-common";

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
})();
