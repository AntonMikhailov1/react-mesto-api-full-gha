const httpStatus = require('http-status-codes').StatusCodes;

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err);
    return;
  }
  res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send(`Ошибка по умолчанию: ${err.message}`);

  next();
};

module.exports = errorHandler;
