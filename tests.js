const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const host = 'http://localhost:3000';
const Promise = require('bluebird');
const express = require('express');
const app = express();

chai.use(chaiHttp);

describe('Test Massive Collections Sample', () => {

  let testUser = null;

  // Init db connection
  it('Should clean our database', done => {
    require('./init-database').then(db => {
      app.set('db', db);

      const Users = require('./collections/users')(app);

      app.set('users_model', Users);

      Users.flush().then(() => {
        done();
      }).catch(err => {
        throw err;
      });
    })
  })

  // POST /users | insert test
  it('Should add a new user', done => {
    chai.request(host)
    .post('/users')
    .send({
      username: 'john doe',
      password: 'qwerty',
      email: 'john.doe@domain.tld'
    })
    .end(function(err, res) {
      testUser = res.body;
      expect(res).to.have.status(200);
      expect(res.body).to.deep.include({
        username: 'john doe',
        password: 'qwerty',
        email: 'john.doe@domain.tld'
      });
      done();
    });
  })

  // GET /users | get
  it('Should list users', done => {
    chai.request(host)
    .get('/users')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  })

  // PUT /users/id
  it('Should update a user', done => {
    chai.request(host)
    .put('/users/' + testUser.id)
    .send({
      username: 'jane doe'
    })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.deep.include({
        username: 'jane doe',
        password: 'qwerty',
        email: 'john.doe@domain.tld'
      });
      done();
    });
  })

  // DELETE /users/id
  it('Should remove a user', done => {
    chai.request(host)
    .delete('/users/' + testUser.id)
    .end(function(err, res) {
      expect(res).to.have.status(200);

      const Users = app.get('users_model');

      Users.find().then(users => {
        expect(users.length).to.equal(0);
        done();

        setTimeout(() => {
          process.exit(0);
        }, 500)
      });
    });
  });
})
