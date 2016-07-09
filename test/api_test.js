var request = require('supertest');
var app = require('../app').app
var client = request(app)

describe('GET /', function() {
  it('respond with json', function(done) {
    client.get('/genesis/')
      .expect(/The LORD your God gave me success/)
      .expect(200, done);
  });
  it('respond with json', function(done) {
    client.get('/genesis/1')
      .expect(/^In the beginning God created the heavens and the earth.Now the earth was formless and empty, darkness was over  the surface of the deep, and the Spirit of God was hovering  over the waters./)
      .expect(200, done);
  });
});
