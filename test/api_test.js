var request = require('supertest');
var app = require('../app').app
var client = request(app)

describe('GET /', function() {
  it('respond with json', function(done) {
    client.get('/genesis/')
      // .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(/The LORD your God gave me success/)
      .expect(200, done);
  });
});
