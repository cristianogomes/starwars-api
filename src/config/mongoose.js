const mongoose = require('mongoose');
const { mongo } = require('./vars');
const logger = require('./logger');

mongoose.Promise = Promise;

mongoose.connection.on('error', err => {
  logger.error('erro de conexao com o banco mongoose');
  process.exit(-1);
});

mongoose.connection.on('disconnected', () => {
  logger.info('conexao com o banco mongoose encerrada');
});

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

exports.connect = () => {
  mongoose.connect(mongo.uri, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true
  });
};

exports.close = () => {
  mongoose.connection.close();
};

exports.clearDB = () => {
  mongoose.connection.dropDatabase();
};
