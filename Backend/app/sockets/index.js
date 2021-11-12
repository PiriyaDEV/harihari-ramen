const socketIO = require("socket.io");
const logger = require("../../lib/logger/index");

module.exports = function (io) {
  var count = 0;

  io.on("connection", (socket) => {
    count++;
    logger.socket(`[connected ${count}] A user is connected from ${socket.id}`);

    socket.on("disconnect", () => {
      count--;
      logger.socket(`[connected ${count}] socket ${socket.id} disconnected`);
    });
  });
};
