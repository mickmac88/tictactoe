require('./utils');
var request = require('supertest'),
    should = require('chai').should(),
    app = require('../../index').app;

describe('index page', function() {

    it('should have an index page', function(done) {
        request(app)
            .get('/')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });

    it('should have ng-view', function(done) {
        request(app)
            .get('/')
            .set('Accept', 'text/html')
            .end(function(err, res) {
                res.text.should.include('ng-view');
                // res.body.users[0].createdAt.should.be.instanceOf(Date);
                // example of just returning any value for an array object/attribute
                done();
            });
    });
});
