const httpStatus = require('http-status-codes').StatusCodes;

class NotFoundError extends Error {
  constructor({ message }) {
    super(message);
    this.status = httpStatus.NOT_FOUND;
  }
}

module.exports = NotFoundError;
