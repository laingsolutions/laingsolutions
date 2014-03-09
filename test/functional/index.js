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
 
  it('should show some headings', function(done){
    response.res.statusCode.should.be.ok;
    response.body.should.match(/Testing!/)
    response.body.should.match(/Some test content/);
    done();
  });

  it('should have navigation', function(done){
    response.$("ul.nav li.active a").text().should.equal("Home");
    response.$("ul.nav li a[href='/projects']").text().should.equal("Recent work");
    response.$("ul.nav li a[href='/contact']").text().should.equal("Contact");
    response.$("ul.nav li a[href='/about']").text().should.equal("About");
    done();
  });

  it('should have some footer text', function(done){
    response.$("div.container p.credit").text().should.match(/© Laing Solutions 20\d\d\. Company # 6376724/);
    done();
  });

});
