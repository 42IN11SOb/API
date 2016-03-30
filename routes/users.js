var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find().exec(function(err, users){
		if (err){ return next(err); }
		res.json(users);
	});
})

/*router.get('/', function(req, res, next) { 
  User.find().exec(function(e, users){
  	//res.render('users/index', {
  		if (e){ return next(e); }
  		res.json(users);
  		//"users" : docs
  	//});
  });
});*/

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
})

module.exports = router;