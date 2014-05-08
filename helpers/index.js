var markdown = require('markdown').markdown,
    strftime = require('strftime');

var containsMarkup = function (str) {
  return str.match(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/);
};

/**
 * Application level helper methods.
 */
module.exports = function (app) {
  /**
   * Render markdown as HTML or simply return content containing HTML.
   */
  app.locals.renderHTML = function (str) {
    if (containsMarkup(str)) {
      return str;
    } else {
      return markdown.toHTML(str);
    }
  },

  /**
   * Return the page title from a piece of content.
   */
  app.locals.pageTitle = function(obj) {
    return (obj && obj.title ? obj.title : "");
  },

  app.locals.formatDate = function (date) {
    return strftime("%A, %d %B %Y", date);
  }
}
