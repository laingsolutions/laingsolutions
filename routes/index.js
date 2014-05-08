var Content = require('./../models/content'),
    ContentService = require('./../services/content_service'),
    es = require('./../lib/elasticsearch'),
    mongoose = require('mongoose'),
    request = require('request');

var noDoc = {
  title : "Oops!",
  body : "## That piece of the internet is missing!\n\n[Log in to create some internets](/admin/contents/new)"
}

exports.login = function(req, res) {
  res.render('login');
}

exports.setExpiry = function(req, res, next) {
  res.setHeader('Cache-Control', 'max-age=1800, public');
  next();
};

/*
 * GET index.
 */
exports.index = function(req, res){
  Content.findOne({path : "/"},
    function(err, doc) {
      res.render('index', { content: doc });
  });
}


/*
 * GET content by path.
 */
exports.contentByPath = function(req, res){
  Content.findOne({path : req.params.path},
    function(err, doc) {
      if (err) {}
      if (doc == null) {
        doc = noDoc
      };
      res.render('content', { content: doc });
  });
}

exports.comments = function (req, res) {
  es.search('tags:comment', function (comments) {
    res.render('comments', { comments: ContentService.getContents(comments.hits) });
  });
};

exports.search = function(req, res){
  es.search(req.query.q, function(results) {
    res.render('results', {
      results: ContentService.getContents(results.hits),
      query: req.query.q,
      total: results.total
    });
  });
}
