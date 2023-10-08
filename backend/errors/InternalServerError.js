const httpStatus = require('http-status-codes').StatusCodes;

class InternalServerError extends Error {
  constructor({ message }) {
    super(message);
    this.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
