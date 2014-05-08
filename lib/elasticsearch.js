var request = require('request'),
    endpoint = function () {
      return process.env.BONSAI_URL;
    },
    searchURL = function (query) {
      return endpoint() + '/lsl-content/content/_search?q=' + query;
    },
    submitURL = function (content) {
      return endpoint() + '/lsl-content/content/' + content.path.replace('/','-');
    };

exports.search = function(query, callback) {
  request.get(searchURL(query), function (err, res, body) {
    if (err){
      callback({ total : 0, error : err });
    } else {
      callback(JSON.parse(body).hits);
    }
  });
};

exports.submit = function(content) {
  request(
    {
      url: submitURL(content),
      body: JSON.stringify({
        title: content.title,
        body: content.bodyText(),
        path: content.path,
        tags: content.tags,
        updated: new Date()
      }),
      method: 'POST'
    },
    function(err, res, body){
      if (err){
        console.log(err);
        throw new Error(err.message);
      } else {
        console.log(body);
      }
    }
  );
};
