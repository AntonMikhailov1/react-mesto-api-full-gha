// routes/index.js
const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');
const { validateUser, validateLogin } = require('../middlewares/validation');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.use('*', auth, () => {
  throw new NotFoundError({ message: 'Страница не найдена' });
});

module.exports = router;
