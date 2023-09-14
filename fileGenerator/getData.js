const fs = require("fs");
const getAllData = async (fileneme = "") => {
  const jsonString = fs.readFileSync(fileneme);
  try {
    const customer =JSON.parse(jsonString);
    return customer;
  } catch (error) {
    return [];
  }
};

module.exports = { getAllData };
