'use strict';

// Outside Party Resources
const express = require('express');
const cors = require('cors');

// Routes Resources
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
const authRoutes = require('./auth/routes/auth-routes');
const v2Routes = require('./auth/routes/v2');
const v1Routes = require('./auth/routes/v1');

// express
const app = express();

// App uses
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use('./api/v2', v2Routes);
app.use('./api/v1', v1Routes);

// Errors
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if(!port){ throw new Error('Port is missing');}
    app.listen(port, () => {
      console.log(`Server is Up on ${port}`);
    });
  },
};
