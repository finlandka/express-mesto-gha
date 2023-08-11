const { celebrate, Joi } = require('celebrate');

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(/[\w-]+@[\w-]*\.[a-z]*/),
    password: Joi.string().required(),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/([\w-]+\.)+([a-z])+(\/[\w\-.]*)*/),
    email: Joi.string().required().email().regex(/[\w-]+@[\w-]*\.[a-z]*/),
    password: Joi.string().required(),
  }),
});

module.exports = { validateAuth, validateRegister };
