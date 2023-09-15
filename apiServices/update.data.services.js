const fs = require('fs')
const { catchHandler } = require("../allHandlers/handlers");
const updateDataServices = async (req, res, data =[], fileName, appendData,index) => {
  try {
    data.splice(index,1,appendData);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 4), (err) => {
      // Checking for errors
      if (err) throw err;
    });
    return appendData;
  } catch (error) {
    catchHandler(req, res, error);
  }
};

module.exports = updateDataServices;
