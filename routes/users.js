var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');
var Role = require('mongoose').model('Role');
var passport = require('passport');
var controller = require('../controller/userController.js');

var secret = "oogVerblindenMooi";

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}).populate('role').exec(function(err, users){
		if (err){ return next(err); }
		res.json(users);
	});
});

router.post('/', function(req, res) {
	var db = req.db;

	// get the fields

	var collection = db.get('user');

	collection.insert({
		// set the fields
	}, function(err, doc) {
		if (err) {
            res.send("There was an error");
		} else {
            res.redirect("/");
		}
	})
});

//isLoggedIn midleware checkt of user ingelogd is
router.get('/profile',isLoggedIn, function(req, res, next) {
	res.json(req.user);
});

router.get('/login', function(req, res, next) {
	res.render('users/login');
});

router.get('/signup', function(req, res, next) {
	res.render('users/signup');
});

router.post('/signup', passport.authenticate('local-signup'), function (req, res) {
		res.status(201).json({'message':'account created succesful'});
	});

router.post('/login', passport.authenticate('local-login'), function(req, res) {
    controller.getToken(req.user, secret, function(response) {
        res.json(response);
    });
});



/*// route middleware to make sure user is logged in: for PASSPORT
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	var reqPath 	= req.path.split('/')[1];

	res.status(401);
	res.json({
        message: 'Not logged in'
    });

}*/

function isLoggedIn(req, res, next) {
	controller.checkToken(req, secret,next, function(response){
		res.json(response);
	});
}

module.exports = router;