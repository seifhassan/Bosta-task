const Joi = require("joi");

const UsersValidator = {
  login: {
      body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(7),
    }),
  },
  signUp: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
      username: Joi.string().required().min(5),
    })
  },
  verify:{
    query: Joi.object().keys({
      id: Joi.string().required(),
    }),
  },
  logout:{
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
  },
};


module.exports = {
  UsersValidator,
};
