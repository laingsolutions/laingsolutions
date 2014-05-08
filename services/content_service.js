var Content = require('./../models/content');

var ContentService = (function () {
  return {
    getContents : function (datas) {
      var contents = [];
      datas.forEach(function (data) {
        console.log(data);
        contents.push(new Content(data._source));
      });
      return contents;
    }
  }
})();

module.exports = ContentService;
