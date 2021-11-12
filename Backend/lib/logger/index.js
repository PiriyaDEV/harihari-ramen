const Color = require("./colorCodes");

function getTimestamp() {
  const datetime = new Date();

  const year = datetime.getFullYear();
  const month = (datetime.getMonth() + 1).toString().padStart(2, 0);
  const date = datetime.getDate().toString().padStart(2, 0);

  const hours = datetime.getHours().toString().padStart(2, 0);
  const minutes = datetime.getMinutes().toString().padStart(2, 0);
  const seconds = datetime.getSeconds().toString().padStart(2, 0);

  const timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  return `${Color.Reset}${Color.Bright}${Color.FgCyan}[${timestamp}]${Color.Reset}`;
}

exports.debug = (message) => {
  const level = `${Color.Reset}${Color.Bright}${Color.FgMagenta}DEBUG${Color.Reset}`;
  const timestamp = getTimestamp();

  console.debug(`${timestamp} ${level} `, message);
};

exports.info = (message) => {
  const level = `${Color.Reset}${Color.Bright}${Color.FgGreen}INFO${Color.Reset}`;
  const timestamp = getTimestamp();

  console.info(`${timestamp} ${level}  `, message);
};

exports.socket = (message) => {
  const level = `${Color.Reset}${Color.Bright}${Color.FgOrange}SOCKET${Color.Reset}`;
  const timestamp = getTimestamp();

  console.info(`${timestamp} ${level}`, message);
};

exports.warn = (message) => {
  const level = `${Color.Reset}${Color.Bright}${Color.FgYellow}WARN${Color.Reset}`;
  const timestamp = getTimestamp();

  console.warn(`${timestamp} ${level}  `, message);
};

exports.error = (message) => {
  const level = `${Color.Reset}${Color.Bright}${Color.FgRed}ERROR${Color.Reset}`;
  const timestamp = getTimestamp();

  console.error(`${timestamp} ${level} `, message);
};
