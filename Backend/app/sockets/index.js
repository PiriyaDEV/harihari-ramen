const logger = require("../../lib/logger/index");

module.exports = function (io) {
  let count = 0;

  io.on("connection", (socket) => {
    count++;
    logger.socket(`[${count} Connected] User connected >>> id ${socket.id}`);

    socket.on("disconnect", () => {
      count--;
      logger.socket(
        `[${count} Connected] User disconnected >>> id ${socket.id}`
      );
    });
  });
};
