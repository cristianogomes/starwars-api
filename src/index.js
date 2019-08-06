const app = require('./config/express');
const mongoose = require('./config/mongoose');
const { port } = require('./config/vars');
const logger = require('./config/logger');

mongoose.connect();

app.listen(port, () => {
  logger.info(`Servidor iniciado na porta ${port}`);
});
