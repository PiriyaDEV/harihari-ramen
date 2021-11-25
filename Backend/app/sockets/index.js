const socketIO = require("socket.io");
const logger = require("../../lib/logger/index");

// socket object to export for using in other modules
var exportSocket = null;

// initialize socket IO
exports.initialize = (server, corsOptions) => {
  // create socket server
  const io = socketIO(server, {
    cors: {
      cors: corsOptions,
    },
  });

  // used for export socket
  exportSocket = io;

  // check connection from customer pipe
  io.of("/harihari-customer").on("connection", (socket) => {
    // current connection
    let customerCount = io.of("/harihari-customer").sockets.size;
    logger.socket(
      `[${customerCount} customer(s)] Connected >>> id ${socket.id}`
    );

    // join room by guest id
    const room_id = socket.handshake.auth.id;
    socket.join(room_id);

    // check disconnect
    socket.on("disconnect", () => {
      // current connection
      customerCount = io.of("/harihari-customer").sockets.size;
      logger.socket(
        `[${customerCount} customer(s)] Disconnected >>> id ${socket.id}`
      );
    });
  });

  // check connection from staff pipe
  io.of("/harihari-staff").on("connection", (socket) => {
    // current connection
    let staffCount = io.of("/harihari-staff").sockets.size;
    logger.socket(`[${staffCount} staff(s)] Connected >>> id ${socket.id}`);

    // join staff room
    socket.join("staff");

    // check disconnect
    socket.on("disconnect", () => {
      // current connection
      staffCount = io.of("/harihari-staff").sockets.size;
      logger.socket(
        `[${staffCount} staff(s)] Disconnected >>> id ${socket.id}`
      );
    });
  });
};

// export socket to use in other modules
exports.getSocket = () => {
  return exportSocket;
};
