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

  io.of("/harihari-customer").on("connection", (socket) => {
    let customerCount = io.of("/harihari-customer").sockets.size;
    logger.socket(
      `[${customerCount} customer(s)] Connected >>> id ${socket.id}`
    );

    const room_id = socket.handshake.auth.id;
    socket.join(room_id);

    socket.on("disconnect", () => {
      customerCount = io.of("/harihari-customer").sockets.size;
      logger.socket(
        `[${customerCount} customer(s)] Disconnected >>> id ${socket.id}`
      );
    });
  });

  io.of("/harihari-staff").on("connection", (socket) => {
    let staffCount = io.of("/harihari-staff").sockets.size;
    logger.socket(`[${staffCount} staff(s)] Connected >>> id ${socket.id}`);

    socket.join("staff");
    // logger.socket(io.of("/harihari-staff").adapter.rooms)

    socket.on("disconnect", () => {
      staffCount = io.of("/harihari-staff").sockets.size;
      logger.socket(
        `[${staffCount} staff(s)] Disconnected >>> id ${socket.id}`
      );
    });
  });
};

exports.getSocket = () => {
  return exportSocket;
};
