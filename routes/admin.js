var express = require('express');
var router = express.Router();
var passport = require('passport');
var controller = require('../controller/adminController.js');
var userController = require('../controller/userController.js');

var secret = "oogVerblindenMooi";

router.get('/season', function(req, res, next){
	controller.newSeason(req, res, function(data, err){
		if (err) { return; }
		res.render('admin/season/new', {});
	});
});

router.post('/season', function(req, res, next){
	controller.addSeason(req, res, function(savedSeason, err){
		if (err) { return; }
		res.status(201);
		res.json(savedSeason); // TODO: replace by layout render
	});
});

function isLoggedIn(req, res, next) {
	userController.checkToken(req, secret, next, function(response){
		if(!response.success)
			res.json(response);
	});
}

module.exports = router;