/**
 * massive-collections-sample
 *
 * Author: Alexandre PENOMBRE <aluzed_AT_gmail.com>
 * Copyright (c) 2018
 */
module.exports = app => {
  // Init models
  const Users = require('./collections/users')(app);

  app.set('users_model', Users);
};
