const User = require('../models/user');
const { INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } = require('../controlErrors');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
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
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
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
