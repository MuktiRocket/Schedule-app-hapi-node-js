require('dotenv').config();
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const basicAuth = require('basic-auth');
const server = require('./config/server');
const Pack = require('./package.json');
const logger = require('./config/logger');
const baseRouter = require('./routes');
const authMiddleware = require('./middleware/auth');

const init = async () => {
  server.ext('onRequest', (req, h) => {
    const route = req.url.pathname;
    if (route === '/meeting-api-docs' || route === '/api/swagger.json') {
      const user = basicAuth(req);

      if (!user
        || user.name !== process.env.SWAGGER_UNAME
        || user.pass !== process.env.SWAGGER_PASSWORD) {
        return h.response('Unauthorized')
          .code(401)
          .header('WWW-Authenticate', 'Basic realm="Node"')
          .takeover();
      }
    }
    return h.continue;
  });

  server.auth.scheme('custom', authMiddleware);
  server.auth.strategy('default', 'custom');
  server.auth.default('default');

  const swaggerOptions = {
    documentationPath: '/meeting-api-docs',
    basePath: '/api',
    info: {
      title: 'Meeting API documentation',
      version: Pack.version,
    },
    grouping: 'tags',
    securityDefinitions: {
      basicAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ basicAuth: [] }],
    jsonPath: '/api/swagger.json',
    swaggerUIPath: '/api/swagger/ui',
    schemes: ['http', 'https'],
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  // server.ext('onPreResponse', (req, h) => {
  //   const swaggerAllowedPaths = ['/cast-api-docs', '/images/icons/gear.png', '/favicon.ico'];
  //   if (req.path.includes('swagger') || swaggerAllowedPaths.includes(req.path)) {
  //     return h.continue;
  //   }

  //   const result = req.response;
  //   if (result.source) {
  //     return h.response({
  //       ...result.source,
  //     }).header('Access-Control-Allow-Origin', '*').code(200);
  //   }
  //   if (result.output) {
  //     if (result.statusCode && result.statusCode === 500) {
  //       logger.info(result.stack);
  //     }
  //     return h.response({
  //       message: req.response.message,
  //     }).header('Access-Control-Allow-Origin', '*').code(result.statusCode || 500);
  //   }
  //   return h.response({
  //     message: req.response.message,
  //   }).header('Access-Control-Allow-Origin', '*').code(result.statusCode || 500);
  // });

  await server.register(baseRouter, {
    routes: {
      prefix: '/api',
    },
  });

  server.events.on('response', (request) => {
    logger.info(`${request.info.remoteAddress}:${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}`);
  });
  await server.start();
  logger.info('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  logger.info(err.message);
  process.exit(1);
});

init();