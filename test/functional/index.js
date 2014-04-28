var helper          = require('../test-helper'),
    cheerio         = require('cheerio'),
    Content         = helper.Content,
    Factory         = helper.Factory,
    request         = helper.request;

var response = {};

describe('The homepage', function() {

  before(function(done){
    Factory.create('content',function(){});
    request.get('http://localhost:3001/', function(err, res, body) {
      response.err = err;
      response.res = res;
      response.body = body;
      response.$ = cheerio.load(body);
      done();
    });
  });

  it('should set the cache header', function(done) {
    response.res.headers['cache-control'].should.equal('max-age=1800, public');
    done();
  });

  it('should show some headings', function(done){
    response.res.statusCode.should.be.ok;
    response.body.should.match(/Some test content/);
    done();
  });

  it('should have navigation', function(done){
    response.$(".nav li:nth-child(1)").text().should.equal("Clients");
    response.$(".nav li:nth-child(2)").text().should.equal("Code");
    response.$(".nav li:nth-child(3)").text().should.equal("Comment");
    response.$(".nav li:nth-child(4)").text().should.equal("Contact");
    done();
  });

  it('should have some footer text', function(done){
    response.$(".footer p.credit").text().should.match(/© Laing Solutions 20\d\d\. Registered Company No. 6376724/);
    done();
  });

});
