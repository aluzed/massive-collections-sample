/**
 * massive-collections-sample
 *
 * Author: Alexandre PENOMBRE <aluzed_AT_gmail.com>
 * Copyright (c) 2018
 */
const express    = require('express');
const app        = express();
const config     = require('./config');
const bodyParser = require('body-parser');

// Init our database connection
const server = require('./init-database').then(db => {
  // Add db into our app object
  app.set('db', db);

  // Init models
  require('./init-models')(app);

  app.use(bodyParser.json());

  // Init routes
  require('./router')(app);

  app.listen(config.server.port, () => {
    console.log('Server listening on ' + config.server.port);
  });
});


module.exports = server;
