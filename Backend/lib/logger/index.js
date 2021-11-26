const Color = require("./colorCodes");

// get current timestamp with format [YYYY-MM-DD HH:MM:SS]
function getTimestamp() {
  // get current timestamp
  const datetime = new Date();

  // get date
  const year = datetime.getFullYear();
  const month = (datetime.getMonth() + 1).toString().padStart(2, 0);
  const date = datetime.getDate().toString().padStart(2, 0);

  // get time
  const hours = datetime.getHours().toString().padStart(2, 0);
  const minutes = datetime.getMinutes().toString().padStart(2, 0);
  const seconds = datetime.getSeconds().toString().padStart(2, 0);

  // format timestamp
  const timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  return `${Color.Reset}${Color.Bright}${Color.FgCyan}[${timestamp}]${Color.Reset}`;
}

// log debug level
exports.debug = (message) => {
  // colourized
  const level = `${Color.Reset}${Color.Bright}${Color.FgMagenta}DEBUG${Color.Reset}`;
  const timestamp = getTimestamp();

  console.debug(`${timestamp} ${level} `, message);
};

// log info level
exports.info = (message) => {
  // colourized
  const level = `${Color.Reset}${Color.Bright}${Color.FgGreen}INFO${Color.Reset}`;
  const timestamp = getTimestamp();

  console.info(`${timestamp} ${level}  `, message);
};

// log socket info level
exports.socket = (message) => {
  // colourized
  const level = `${Color.Reset}${Color.Bright}${Color.FgOrange}SOCKET${Color.Reset}`;
  const timestamp = getTimestamp();

  console.info(`${timestamp} ${level}`, message);
};

// log warn level
exports.warn = (message) => {
  // colourized
  const level = `${Color.Reset}${Color.Bright}${Color.FgYellow}WARN${Color.Reset}`;
  const timestamp = getTimestamp();

  console.warn(`${timestamp} ${level}  `, message);
};

// log error level
exports.error = (message) => {
  // colourized
  const level = `${Color.Reset}${Color.Bright}${Color.FgRed}ERROR${Color.Reset}`;
  const timestamp = getTimestamp();

  console.error(`${timestamp} ${level} `, message);
};
