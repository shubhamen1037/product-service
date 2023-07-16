const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const Logger = require('smart-node-logger');

const routes = require('./routes');


const { PORT, NAME } = require('./config');

const app = express();

const server = app.listen(PORT);

try {
  app.enable('trust proxy');

  app.use(cors({
    exposedHeaders: [ 'message', 'page-limit', 'total-records' ],
  }));
  app.use(compression());
  app.use(helmet());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(express.json());
  // app.use( Authentication());

  app.use('/', routes);
} catch (e) {
  server.close();
}

module.exports = server;
