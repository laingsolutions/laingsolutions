var helper          = require('../test-helper'),
    cheerio         = require('cheerio'),
    es              = require('./../../lib/elasticsearch'),
    nock            = helper.nock,
    request         = helper.request;

describe('Searching', function() {
  before(function(done) {
    process.env.BONSAI_URL = "http://example.com"
    var scope = nock("http://example.com").get("/lsl-content/content/_search?q=bong").reply(200, JSON.stringify({ hits: {
      total: 2,
      hits: [
        {_source: {title : "Bongzilla", url : "http://www.youtube.com/watch?v=MW1enu9YAJY"}},
        {_source: {title : "Beelzebong", url : "http://www.youtube.com/watch?v=yLKB9huoTkU"}}
      ]
    }}));
    done();
  });
  it("should format search results when present", function(done){
    request.get('http://localhost:3001/search?q=bong', function(err, res, body) {
      var $ = cheerio.load(body);
      $('.content p').eq(0).text().should.equal("2 results found for 'bong'");
      $('.content ol li').eq(0).text().should.equal("Bongzilla");
      $('.content ol li').eq(1).text().should.equal("Beelzebong");
      done();
    });
  });
});
