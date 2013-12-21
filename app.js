
/**
 * Module dependencies.
 */

var adminRoutes = require('./routes/admin')
  , adminContentRoutes = require('./routes/admin/contents')
  , ejs       = require('ejs')
  , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
  , express   = require('express')
  , http      = require('http')
  , mongoose  = require('mongoose')
  , partials  = require('express-partials')
  , passport  = require('passport')
  , path      = require('path')
  , routes    = require('./routes');

/**
 * Mongoose config
 */
mongoose.set('debug', true); // TODO: Should be ENV dependent.
mongoose.connect(process.env.MONGOHQ_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to MongoDB");
});

/**
 * App config
 */
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('m0ng0hQ-n0d3'));
  app.use(express.session({ secret: 'm0ng0hQ-n0d3-535510n' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(partials());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Libs and helpers.
 */
require('./lib/markdown');
require('./lib/passport');

app.locals.pageTitle = function(obj) {
  return (obj.title ? obj.title : obj);
};

// Redundant middleware as the catchall route handles this.
// I still feel better knowin it's there though.
app.use(function(req, res, next){
  res.send(404, 'That piece of the internet is missing.');
});

/**
 * Routing
 */
app.get('/', routes.index);
// Auth routes
app.get('/login', routes.login);
app.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));
// Admin routes
app.get('/admin/index',             ensureLoggedIn(), adminRoutes.index);
// Admin content routes
app.get('/admin/contents',          ensureLoggedIn(), adminContentRoutes.index);
app.get('/admin/contents/new',      ensureLoggedIn(), adminContentRoutes._new);
app.post('/admin/contents',         ensureLoggedIn(), adminContentRoutes.create);
app.get('/admin/contents/:id/edit', ensureLoggedIn(), adminContentRoutes.edit);
app.put('/admin/contents/:id',      ensureLoggedIn(), adminContentRoutes.update);

app.get('/search', routes.search);

// Give other specific routes priority by placing them before this one
app.get('/:path', routes.contentByPath);


// Export the app for tests/console debugging.
module.exports = app;

if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}
