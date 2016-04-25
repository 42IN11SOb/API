var express = require('express');
var router = express.Router();
var passport = require('passport');
var controller = require('../controller/userController.js');

var secret = "oogVerblindenMooi";

/* GET users listing. */
router.get('/', function(req, res, next) {
	controller.getAll(function(response){
		res.json(response);
	});
});

/*router.get('/addtest', function(req, res, next) {
	var TestAdmin = new Role({
		name: "TestAdmin"
	});

	TestAdmin.save(function(err){
		//if (err) return handleError(err);

		var Admin = new User({
			username: "Admin",
			password: "test1235",
			active: true,
			email: "info@bartimeus.nl",
			role: TestAdmin._id
		});

		Admin.save(function(err){
			if (err) res.send(err + " An error occured"); 
			else //return handleError(err);
				res.send("Saved user");
		})
	});

});*/

/*router.get('/', function(req, res, next) { 
  User.find().exec(function(e, users){
  	//res.render('users/index', {
  		if (e){ return next(e); }
  		res.json(users);
  		//"users" : docs
  	//});
  });
});*/

//isLoggedIn midleware checkt of user ingelogd is
router.get('/profile',isLoggedIn, function(req, res, next) {
	controller.getProfile(req.userID, function(response) {
		res.json(response);
	});
});

router.post('/signup', passport.authenticate('local-signup'), function (req, res) {
		res.status(201).json({'message':'account created succesful'});
	});

router.post('/login', passport.authenticate('local-login'), function(req, res) {
        controller.getToken(req.user, secret, function(response) {
        	req.session.token = response.token;
            res.json(response);
        });
});

router.post('/logout', function(req, res, next) {
	req.logout();
	req.userID = null;

	res.json({
		success: true,
		message: "Logout succesful."
	});
});

function isLoggedIn(req, res, next) {
	controller.checkToken(req, secret, next, function(response){
		if(!response.success)
			res.json(response);
	});
}

module.exports = router;