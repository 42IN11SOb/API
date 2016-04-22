var express = require('express');
var router = express.Router();
var passport = require('passport');
var controller = require('../controller/seasonController.js');
var userController = require('../controller/userController.js');

var secret = "oogVerblindenMooi";

//isLoggedIn midleware checkt of user ingelogd is
router.get('/',isLoggedIn, function(req, res, next) {
	controller.getSeason(req, res, function callback(data, err){
		if (err) return;
		res.json(data);
	});
});

function isLoggedIn(req, res, next) {
	userController.checkToken(req, secret, next, function(response){
		if(!response.success)
			res.json(response);
	});
}

module.exports = router;