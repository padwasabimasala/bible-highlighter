var request = require('supertest');
var app = require('../app').app

describe('GET /', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/')
      // .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
