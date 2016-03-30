var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');
var Role = require('mongoose').model('Role');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find().exec(function(err, users){
		if (err){ return next(err); }
		res.json(users);
	});
})

router.get('/addtest', function(req, res, next) {
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

});

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