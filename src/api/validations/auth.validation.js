const Joi = require('joi');

module.exports = {
  logonValidate: {
    body: {
      login: Joi.string()
        .max(32)
        .required(),
      password: Joi.string()
        .min(6)
        .max(32)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string()
        .max(128)
        .required()
    },
    options: {
      contextRequest: true
    }
  }
};
