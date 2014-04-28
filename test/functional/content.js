var helper          = require('../test-helper'),
    Content         = helper.Content,
    Factory         = helper.Factory,
    request         = helper.request;

describe('A CMS page', function() {

  it('should display HTML content by path', function (done) {
    Factory.create('content', {
      path: 'foo',
      body: '### Some foo content'
    }, function () {});

    request.get('http://localhost:3001/foo', function (err, res, body) {
      res.statusCode.should.be.ok;
      body.should.match(/<h3>Some foo content/);
      done();
    });
  });

  it('should not attempt to convert content already containing HTML', function (done) {
    Factory.create('content', {
      path: 'boom',
      body: '<div><p>Some boom content</p></div>'
    }, function () {});

    request.get('http://localhost:3001/boom', function (err, res, body) {
      res.statusCode.should.be.ok;
      body.should.match(/<div><p>Some boom content<\/p><\/div>/);
      done();
    });
  });
});
