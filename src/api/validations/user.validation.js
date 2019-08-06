const Joi = require('joi');

module.exports = {
  listUsers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string(),
      email: Joi.string()
    }
  },

  createUser: {
    body: {
      login: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required()
    },
    options: {
      contextRequest: true
    }
  }
};
