var Content = require('./../../../models/content');
/*
 * GET admin/contents
 */
exports.index = function(req, res){
  Content.find(function(e, docs){
    res.render('admin/contents/index', { contents : (e ? [] : docs) });
  });
}

/*
 * GET admin/contents/new
 */
exports._new = function(req, res){
  res.render('admin/contents/new', { content: new Content() });
}

/*
 * GET admin/contents/:id/edit
 */
exports.edit = function(req, res){
  Content.findOne({_id: req.params.id}, function(err, content) {
    console.log(content)
    res.render('admin/contents/edit', { content: content });
  });
}

/*
 * POST admin/contents
 * TODO: Validation, sensible routing.
 */
exports.create = function(req, res){
  var content = new Content(req.body.content);
  if (content.save(function(err, content) {
    if (err) {
      res.render('admin/contents/new', { err: err });
    } else {
      res.redirect('/admin/contents');
    }
  }));
}
