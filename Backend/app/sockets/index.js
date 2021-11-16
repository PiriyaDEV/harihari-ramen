const socketIO = require("socket.io");
const logger = require("../../lib/logger/index");

module.exports = (server, corsOptions) => {
  const io = socketIO(server, {
    transports: ["polling"],
    cors: {
      cors: corsOptions,
    },
  });

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

    //socket.on('order-history', )
  });

  return io;
};
