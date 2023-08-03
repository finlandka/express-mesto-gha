const User = require('../models/user');
const NotValidIdError = require('../NotValidIdError');
const {
  OK, CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND,
} = require('../constantsStatus');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(OK).send({ data: user }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new NotValidIdError('NotValidId'))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case 'NotValidId':
          res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден. Не существующий _id' });
          break;
        case 'CastError':
          res.status(BAD_REQUEST).send({ message: 'Пользователь по указанному _id не найден. Не корректный _id' });
          break;
        default:
          res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          res.status(BAD_REQUEST).send({ message: 'Пользователь с указанным _id не найден. Не корректный _id' });
          break;
        case 'ValidationError':
          res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
          break;
        default:
          res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          res.status(BAD_REQUEST).send({ message: 'Пользователь с указанным _id не найден. Не корректный _id' });
          break;
        case 'ValidationError':
          res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара' });
          break;
        default:
          res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatar,
};
