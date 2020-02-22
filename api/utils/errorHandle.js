class ErrorHandler extends Error {
 
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
 console.log('--d----d');

  }
}
const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
module.exports = {
  ErrorHandler,
  handleError,
}