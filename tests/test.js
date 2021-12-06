
var request = require('supertest');
var app = require('../server.js');

describe('GET/', function() {
    it('respond with status 200', function(done) {
        request(app).get("/").end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
});