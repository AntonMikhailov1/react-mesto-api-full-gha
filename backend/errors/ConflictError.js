const httpStatus = require('http-status-codes').StatusCodes;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = httpStatus.CONFLICT;
  }
}

module.exports = ConflictError;
