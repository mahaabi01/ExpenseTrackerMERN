const errorHandler = (error, req, res, next) => {
  if (error) {
    if (error.message) {
      res.status(400).json({
        success: "false",
        error: error,
      });
    } else {
      res.status(400).json({
        success: "false",
        message: error,
      });
    }
  } else {
    next();
  }
};

module.exports = errorHandler;
