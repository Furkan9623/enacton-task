const createError = (message, statusCode, errorFound) => {
  return { message, statusCode, errorFound };
};

const errorHandler = async (error, req, res, next) => {
  const { message, statusCode, errorFound } = error;
  return res.status(statusCode || 500).json({
    success: false,
    message,
    errorFound,
  });
};

module.exports = { errorHandler, createError };
