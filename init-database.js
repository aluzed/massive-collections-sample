/**
 * massive-collections-sample
 *
 * Author: Alexandre PENOMBRE <aluzed_AT_gmail.com>
 * Copyright (c) 2018
 */
const massive          = require("massive");
const config           = require('./config');
const connectionString = `postgres://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.database}`;

module.exports = massive(connectionString);
