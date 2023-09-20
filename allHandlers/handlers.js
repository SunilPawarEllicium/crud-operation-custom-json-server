const catchHandler = (req, res, error,status=500) =>
  res.status(status).json({
    success: 0,
    data:null,
    error:error.message,
  });

  // const errorHandler=(req,res)=>{

  // }

  module.exports = {catchHandler}