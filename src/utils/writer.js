const fs = require("fs");

async function writeLineToFile(line, path) {
  return fs.promises.appendFile(path, line + "\n");
}

module.exports = {
  writeLineToFile,
};
