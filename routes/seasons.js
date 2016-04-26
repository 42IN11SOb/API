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
		// res.json(data);
		//dummy data remove when database is populated
		var dummySeason =  [

			{r:123,g:211,b:255},
			{r:1,g:200,b:0},
			{r:150,g:0,b:12},
			{r:255,g:125,b:255},
			{r:0,g:0,b:0}
		];

		res.json(dummySeason);
	});
});

function isLoggedIn(req, res, next) {
	userController.checkToken(req, secret, next, function(response){
		if(!response.success)
			res.json(response);
	});
}

//add season
router.post('/postSeason',isLoggedIn,function(req,res,next) {
	controller.postSeason(req,res,function callback(data, err){
		if (err) return;
		res.json(data);
	});

});

module.exports = router;