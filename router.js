/**
 * massive-collections-sample
 *
 * Author: Alexandre PENOMBRE <aluzed_AT_gmail.com>
 * Copyright (c) 2018
 */
const router = require('express').Router();

module.exports = (app) => {
  const Users = app.get('users_model');

  router.get('/users', (req, res) => {
    Users.find({}).then(users => {
      return res.json(users);
    })
    .catch(err => {
      return res.status(500).send(err);
    })
  });

  router.post('/users', (req, res) => {
    let tmpUser = req.body;

    Users.insert(tmpUser).then(user => {
      return res.json(user);
    })
    .catch(err => {
      return res.status(500).send(err);
    })
  });

  router.put('/users/:id', (req, res) => {
    if(!req.params.id)
      return res.status(400).send('Bad parameters');

    let tmpUser = req.body;

    Users.update(parseInt(req.params.id, 10), tmpUser)
      .then(user => {
        return res.json(user);
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  });

  router.delete('/users/:id', (req, res) => {
    if(!req.params.id)
      return res.status(400).send('Bad parameters');

    Users.remove(parseInt(req.params.id, 10)).then(deletedUser => {
      return res.json(deletedUser);
    })
    .catch(err => {
      return res.status(500).send(err);
    })
  })

  app.use('/', router);
};
