const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, getCurrentUser, updateUser, updateAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/me', getCurrentUser);
users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);
users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUser);
users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/([a-z0-9\\-]+\.)*ru(\/[a-z\\/]*)*$/),
  }).unknown(true),
}), updateAvatar);

module.exports = users;
