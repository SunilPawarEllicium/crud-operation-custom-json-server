const { catchHandler } = require("../allHandlers/handlers");

const error404 = async (req, res, next) => {
  catchHandler(req, res, { message: "Invalid url. Please check your url." },404);
};

module.exports = {error404}