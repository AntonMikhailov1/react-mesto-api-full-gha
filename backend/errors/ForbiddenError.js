const httpStatus = require('http-status-codes').StatusCodes;

class ForbiddenError extends Error {
  constructor({ message }) {
    super(message);
    this.status = httpStatus.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
