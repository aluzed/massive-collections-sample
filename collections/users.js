/**
 * massive-collections-sample
 *
 * Author: Alexandre PENOMBRE <aluzed_AT_gmail.com>
 * Copyright (c) 2018
 */
const { ColumnMissing } = require('massive-collections/errors.js');
const Collection = require('massive-collections');

module.exports = (app) => {
  // Get our db from app object
  const db = app.get('db');

  const Users = new Collection('users', db);

  /**
   * Before each update, update modified field
   */
  Users.preHook('update', function (next, data) {
    data.modified = new Date();
    next(data);
  });

  return Users;
});
