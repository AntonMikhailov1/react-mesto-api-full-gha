const httpStatus = require('http-status-codes').StatusCodes;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = httpStatus.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
