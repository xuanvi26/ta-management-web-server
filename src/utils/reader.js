const fs = require("fs");
const readline = require("readline");

function fileAsyncIterator(file) {
  const fileStream = fs.createReadStream(file);

  const lineReader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  return lineReader;
}

module.exports = { fileAsyncIterator };
