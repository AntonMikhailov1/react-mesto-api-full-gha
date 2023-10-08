const httpStatus = require('http-status-codes').StatusCodes;

class UnauthorizedError extends Error {
  constructor({ message }) {
    super(message);
    this.status = httpStatus.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
