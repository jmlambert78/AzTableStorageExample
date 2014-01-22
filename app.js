
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var postRoutes = require('./routes/posts')
var http = require('http');
var path = require('path');
var azure = require('azure');
var nconf = require('nconf');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// Setup config values using nconf
nconf.env()
     .file({file:'config.json'}); // use environment vals if present, else get it from config.json

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/createpost', postRoutes.createpost);
app.get('/posts', postRoutes.getall);
app.get('/post/:id', postRoutes.getpost);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
