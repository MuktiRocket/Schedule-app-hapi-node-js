const Hapi = require('@hapi/hapi');

const host = process.env.HOST;
const port = process.env.PORT;
const server = Hapi.server({
  port,
  host,
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
      exposedHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Basic realm="Node"'],
      additionalExposedHeaders: ['Accept'],
      maxAge: 60,
      credentials: true,
    },
    validate: {
      failAction: async (req, res, err) => err,
      options: {
        abortEarly: false,
      },
    },
  },
});

module.exports = server;