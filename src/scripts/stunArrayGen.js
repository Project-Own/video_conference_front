const fs = require("fs");
const os = require("os");
const readline = require("readline");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./src/config/stunServer.txt"),
  console: false,
});

let result = '{"stunServer":[';

readInterface.on("line", function (line) {
  result += `{ "url": "${line}" },` + os.EOL;
});

readInterface.on("close", () => {
  result = result.slice(0, result.length - 2);
  result += os.EOL + "]}";
  console.log(result);
  fs.writeFile("./src/config/stunServer.json", result, () => {
    console.log("Done.");
  });
});
