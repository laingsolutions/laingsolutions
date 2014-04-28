var mongoose = require('mongoose'),
    markdown = require('markdown').markdown;

var Content = function() {

  var contentSchema = mongoose.Schema({
    title: { type: String, required: true },
    path: { type: String, required: true },
    body: { type: String, required: true },
    tags: [String]
  }, { collection: 'contents' } );

  contentSchema.methods.bodyText = function() {
    var html = markdown.toHTML(this.body),
        htmlRe = /(<([^>]+)>)|(&#\d+;)/ig;
    return html.replace(htmlRe, "");
  }

  return mongoose.model('Content', contentSchema);

}();

module.exports = Content;
