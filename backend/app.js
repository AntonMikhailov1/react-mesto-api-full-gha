require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status-codes').StatusCodes;

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('./middlewares/cors');

const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 1000,
  max: 5000,
  message: 'Слишком много запросов',
});

app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(cors);

app.use('/', router);

app.get('/', (req, res) => {
  res.status(httpStatus.OK).send({ message: 'Hello World!' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
