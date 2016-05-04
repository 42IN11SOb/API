'use strict';
var path = require('path');
var logger = require('morgan');
var express = require('express');
var favicon = require('serve-favicon');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var middlewares = require('./middlewares/middlewares');
var cookieParser = require('cookie-parser');

mongoose.connect('mongodb://projectpep:42in11sob@ds017070.mlab.com:17070/projectpep');
//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:27017/bartimeus');

var models = ['user', 'color', 'figure', 'passport', 'role', 'season'];

var l = models.length;
for (var i = l - 1; i >= 0; i--) {
    require("./model/" + models[i]);
}

var app = express();

// Routes
var users = require('./routes/users');
var roles = require('./routes/roles');
var admin = require('./routes/admin');
var routes = require('./routes/index');
var colors = require('./routes/colors');
var figures = require('./routes/figure');
var seasons = require('./routes/seasons');
var passports = require('./routes/passport');

require('./config/passport')(passport); // pass passport for configuration

// Middlewares CORS FIX
app.use(middlewares.CORS);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport

app.use(passport.initialize());

// Define all routes
app.use('/', routes);
app.use('/roles', roles);
app.use('/users', users);
app.use('/seasons', seasons);
app.use('/admin', admin);
app.use('/colors', colors);
app.use('/figures', figures);
app.use('/passports', passports);

// Middleware error handling
app.use(middlewares.ERROR404);
app.use(middlewares.devError);
//app.use(middlewares.productionError);

module.exports = app;
