const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const SmartHttp = require('smart-http');
const sinon = require('sinon');
const authentication = require('smart-auth-middleware');

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core');

const schema = require('../graphql');

const Auth = { authentication };

const { USER_ID } = require('./constant');

const defaultRoutes = require('../routes');
const adminRoutes = require('../routes/admin');
const customerRoutes = require('../routes/customer');
const webhookRoutes = require('../routes/webhook');

const { IDENTITY_SERVICE_URL } = require('../config');
const {
  AUDIENCE_TYPE, ISSUER, ADMIN_IGNORE_PATH, CUSTOMER_IGNORE_PATH,
} = require('../utils/constant');

const app = express();

/**
 * Start the server by listening <port>
 * */

app.enable('trust proxy');
app.use(SmartHttp());

app.use(cors({
  exposedHeaders: [ 'token', 'slug', 'message', 'set-password', 'password', 'is-password-already-set', 'public-id', 'x-coreplatform-paging-limit',
    'x-coreplatform-total-records', 'x-coreplatform-concurrencystamp' ],
}));

app.use(compression());
app.use(helmet());
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

const authObj = sinon.stub().callsFake((req, res, next) => {
  req.user = { userId: USER_ID };

  if (req.originalUrl === '/ping' || req.originalUrl === '/healthcheck') {
    return next();
  }

  if ('authorization' in req.headers) {
    return next();
  }

  return res.status(401).json();
});

sinon.stub(Auth, 'authentication').callsFake(() => authObj);

app.use(Auth.authentication({
  IDENTITY_SERVICE_URL,
  AUDIENCE: 'platform',
  ignorePaths: [ '/graphql', '/ping', '/healthcheck' ],
}));

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req && req.user,
    headers: req.headers,
  }),
  plugins: [ ApolloServerPluginInlineTraceDisabled() ],
});

app.use('/v1/customer', Auth.authentication({
  IDENTITY_SERVICE_URL,
  AUDIENCE: AUDIENCE_TYPE.CUSTOMER,
  ignorePaths: CUSTOMER_IGNORE_PATH,
  ISSUER,
}), customerRoutes);

app.use('/v1/admin', Auth.authentication({
  IDENTITY_SERVICE_URL,
  AUDIENCE: AUDIENCE_TYPE.PLATFORM,
  ignorePaths: ADMIN_IGNORE_PATH,
  ISSUER,
}), adminRoutes);

app.use('/v1/webhook', webhookRoutes);

const apolloServerNew = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req && req.user,
    headers: req.headers,
  }),
  plugins: [ ApolloServerPluginInlineTraceDisabled() ],
});

app.use('/v1/graphql', Auth.authentication({
  IDENTITY_SERVICE_URL,
  AUDIENCE: AUDIENCE_TYPE.CUSTOMER,
  ignorePaths: [ ],
  ISSUER,
  credentialsRequired: false,
}));
app.use('/graphql', Auth.authentication({
  IDENTITY_SERVICE_URL,
  AUDIENCE: 'platform',
  ignorePaths: [ ],
  ISSUER,
  credentialsRequired: false,
}));
app.use('/', defaultRoutes);

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app, path: '/graphql' });
});

apolloServerNew.start().then(() => {
  apolloServerNew.applyMiddleware({ app, path: '/v1/graphql' });
});

module.exports = app;
