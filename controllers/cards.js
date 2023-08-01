const Card = require('../models/card');
const {
  BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR,
} = require('../controlErrors');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  const {
    name, link,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Карточка с указанным _id не найдена' });
      }
    });
};

const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          res.status(BAD_REQUEST).send({ message: 'Передан некорректный _id карточки' });
          break;
        case 'ValidationError':
          res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка' });
          break;
        default:
          res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
          break;
        case 'ValidationError':
          res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка' });
          break;
        default:
          res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
};
