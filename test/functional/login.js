var helper          = require('../test-helper'),
    User            = helper.User,
    Factory         = helper.Factory,
    passwordHash    = require('password-hash'),
    request         = helper.request;

describe('GET to /admin/index', function() {

  before(function(done){
    Factory.create('user', { username : 'Administrator',
                             password : passwordHash.generate('5up3r53cr3t') }, function(){ done(); });
  });

  it('should be protected by authentication', function(done){
    request.get('http://localhost:3001/admin/index', function(err, res, body) {
      res.statusCode.should.equal(200);
      res.req.path.should.equal('/login');
      done();
    });
  });
  it('should be possible to log in', function(done){
    request.post('http://localhost:3001/login', { form: {username: 'Administrator', password: '5up3r53cr3t'}}, function(err, res, body) {
      res.statusCode.should.equal(302);
      body.should.equal("Moved Temporarily. Redirecting to /admin/index");
      done();
    });
  });
});
