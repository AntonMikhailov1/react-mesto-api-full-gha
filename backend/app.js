require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const httpStatus = require('http-status-codes').StatusCodes;
const CardsRouter = require('./routes/cards');
const UsersRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

const { MONGO_URL, PORT } = require('./config');

const auth = require('./middlewares/auth');
const { validateUser, validateLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
  credentials: true,
  origin: [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'http://antonmikhailov.nomoredomainsrocks.ru',
    'https://api.antonmikhailov.nomoredomainsrocks.ru',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(requestLogger);
app.use(helmet());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов',
});

app.use(express.json());
app.use(limiter);

mongoose.connect(MONGO_URL);

app.get('/', (req, res) => {
  res.status(httpStatus.OK).send({ message: 'Hello World!' });
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', CardsRouter);
app.use('/', UsersRouter);
app.use('/*', () => {
  throw new NotFoundError({ message: 'Страница не найдена' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
