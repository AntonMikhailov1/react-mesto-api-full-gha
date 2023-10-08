const mongoose = require('mongoose');
const httpStatus = require('http-status-codes').StatusCodes;
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCard = (req, res, next) => Card.find({})
  .then((cards) => res.status(httpStatus.OK).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(httpStatus.CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным id не найдена'));
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нет доступа'));
      }
      return card
        .deleteOne()
        .then(() => res.status(httpStatus.OK).send({ message: 'Карточка успешно удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий id');
      }
      return res.status(httpStatus.OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError('Переданы некорректные данные для постановки/снятия лайка'),
        );
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий id');
      }
      return res.status(httpStatus.OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError('Переданы некорректные данные для постановки/снятия лайка'),
        );
      }
      return next(err);
    });
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
