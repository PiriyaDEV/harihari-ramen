const socketIO = require("socket.io");
const logger = require("../../lib/logger/index");

var exportSocket = null;

exports.initialize = (server, corsOptions) => {
  const io = socketIO(server, {
    //transports: ["polling"],
    cors: {
      cors: corsOptions,
    },
  });

  exportSocket = io;

  let customerCount = 0;
  let staffCount = 0;

  io.of("/harihari-customer").on("connection", (socket) => {
    customerCount++;
    logger.socket(
      `[${customerCount} customer(s)] Connected >>> id ${socket.id}`
    );

    const room_id = socket.handshake.auth.id;
    socket.join(room_id);

    socket.on("disconnect", () => {
      customerCount--;
      logger.socket(
        `[${customerCount} customer(s)] Disconnected >>> id ${socket.id}`
      );
    });
  });

  io.of("/harihari-staff").on("connection", (socket) => {
    staffCount++;
    logger.socket(`[${staffCount} staff(s)] Connected >>> id ${socket.id}`);

    socket.join("staff");

    socket.on("disconnect", () => {
      staffCount--;
      logger.socket(
        `[${staffCount} staff(s)] Disconnected >>> id ${socket.id}`
      );
    });
  });
};

exports.getSocket = () => {
  return exportSocket;
};
