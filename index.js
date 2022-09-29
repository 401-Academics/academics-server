'use strict';

require ('dotenv').config();
const app = require('./src/server');
const { database } = require('./src/auth/models');

database.sync().then(() => {
  app.start(process.env.PORT || 3002);
});
