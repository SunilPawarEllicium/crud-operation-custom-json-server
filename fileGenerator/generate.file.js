const fs = require("fs");
const geneareteFile = async (fileName) => {
  const table = [];
  fs.exists(fileName, function (exists) {
    if (!exists) {
      let json = JSON.stringify(table, null, 4);
      fs.writeFileSync(fileName, json);
    }
  });
};

module.exports = { geneareteFile };
