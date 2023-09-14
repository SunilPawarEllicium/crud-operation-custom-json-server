const fs = require('fs')
const { catchHandler } = require("../utils/handlers");
const deleteDataServices = async (req, res, data =[], fileName, appendData={},index) => {
  try {
    data.splice(index,1);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 4), (err) => {
      // Checking for errors
      if (err) throw err;
    });
    return {};
  } catch (error) {
    catchHandler(req, res, error);
  }
};

module.exports = deleteDataServices;
