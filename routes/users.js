var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('user');
  collection.find({}, {}, function(e, docs){
  	res.render('users/index', {
  		"users" : docs
  	});
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
})

module.exports = router;