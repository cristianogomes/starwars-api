const httpStatus = require('http-status');

const handler = (err, req, res, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    err.status = httpStatus.CONFLICT;
  }

  return res.status(err.status).json(err);
};

exports.handler = handler;
