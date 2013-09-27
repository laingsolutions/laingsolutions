var helper          = require('../test-helper'),
    Content         = helper.Content,
    Factory         = helper.Factory;

describe("Content", function() {
  describe("bodyText", function(){
    it("should return the body excluding markdown and html", function(done){
      Factory.create('content', { body: "# My amazing content\n\n### It's so cool!\n\n**I love it**" }, function(content){
        content.bodyText().should.equal("My amazing content\n\nIts so cool!\n\nI love it");
        done();
      });
    });
  });
  describe("validation", function(){
    it("should validate required field title, path and body", function(done){
      var content = new Content();
      content.save(function(err){
        err.errors.title.message.should.equal("Validator \"required\" failed for path title with value `undefined`");
        err.errors.path.message.should.equal("Validator \"required\" failed for path path with value `undefined`");
        err.errors.body.message.should.equal("Validator \"required\" failed for path body with value `undefined`");
        done();
      });
    });
  });
});
