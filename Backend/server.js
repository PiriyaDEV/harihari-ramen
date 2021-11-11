const dotenv = require("dotenv");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

const logger = require("./lib/logger/index");

// use config environment from .env
dotenv.config();

// create an application object
const app = express();

// define cors options
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
};

// enable cross-origin resource sharing
app.use(cors(corsOptions));

// serve static files
app.use("/images", express.static("public"));

// parse requests of content-type: application/json
app.use(bodyParser.json({ limit: "20mb" }));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));

// parse requests to router
const router = require("./app/routes");
app.use("/api/v1", router);

// handle 404 requests
app.use((req, res) => {
  res.status(404).send(`<h1>404 Page Not Found!</h1>`);
});

// set port and start a server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  logger.info(`Hari Hari Ramen's API server is running on port ${PORT}.`);
});

const io = socketIO(server);

io.use()

io.on("connection", (client) => {
  logger.info("A user is connected");

  client.on("message", (message) => {
    logger.info(`message from ${client.id} : ${message}`);
  });

  client.on("disconnect", () => {
    logger.info(`socket ${client.id} disconnected`);
  });
});
