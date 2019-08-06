module.exports = {
  port: process.env.PORT || 3000,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  secret: 'worldisfullofdevelopers',
  mongo: {
    uri:
      process.env.NODE_ENV === 'test'
        ? 'mongodb://127.0.0.1:27017/test-starwars-api'
        : 'mongodb://127.0.0.1:27017/starwars-api'
  }
};
