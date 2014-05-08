var helper          = require('../test-helper'),
    cheerio         = require('cheerio'),
    es              = require('./../../lib/elasticsearch'),
    nock            = helper.nock,
    request         = helper.request;

describe('Searching', function() {
  before(function(done) {
    process.env.BONSAI_URL = "http://example.com"
    var scope = nock("http://example.com").get("/lsl-content/content/_search?q=tags:comment").reply(200, JSON.stringify({ hits: {
      total: 2,
      hits: [
        {_source: {title : "Bongzilla", path : "bongzilla"}},
        {_source: {title : "Beelzebong", path : "beelzebong"}}
      ]
    }}));
    done();
  });
  it("should format search results when present", function(done){
    request.get('http://localhost:3001/comment', function(err, res, body) {
      var $ = cheerio.load(body);
      $('.content ul li').eq(0).text().should.match(/Bongzilla/);
      $('.content ul li').eq(1).text().should.match(/Beelzebong/);
      done();
    });
  });
});
