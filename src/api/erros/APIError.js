const httpStatus = require('http-status');
const ApplicationError = require('./ApplicationError');

class APIError extends ApplicationError {
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack
    });
  }
}

module.exports = APIError;
