const socketIO = require("socket.io");
const logger = require("../../lib/logger/index");

var socketInstance = null;

exports.initialize = (server, corsOptions) => {
  const io = socketIO(server, {
    transports: ["polling"],
    cors: {
      cors: corsOptions,
    },
  });

  let count = 0;

  io.on("connection", (socket) => {
    socketInstance = socket;
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

exports.getSocket = () => {
  return socketInstance;
};
