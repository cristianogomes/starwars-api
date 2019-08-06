const Joi = require('joi');

module.exports = {
  createPlanet: {
    body: {
      name: Joi.string().required(),
      climate: Joi.string().required(),
      terrain: Joi.string().required()
    },
    options: {
      contextRequest: true
    }
  },

  updatePlanet: {
    params: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/, 'ObjectID')
    },
    body: {
      name: Joi.string().required(),
      climate: Joi.string().required(),
      terrain: Joi.string().required()
    },
    options: {
      contextRequest: true
    }
  },

  deletePlanet: {
    params: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/, 'ObjectID')
    }
  }
};
