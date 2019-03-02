const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../routeConfig/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);

server.get('/', (req, res) => {
  res.send('****** Server is live! ******');
});

module.exports = server;
