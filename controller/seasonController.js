var Season = require('mongoose').model('Season');
var controller = exports;

controller.getSeasons = function getSeasons(req, res, callback){
	var query = {};
	if (req.params.id){
		query._id = req.params.id;
	}
	var result = Season.find(query).populate('colors');

	results.exec(function(err, data){
		if (req.params.id && data != null){
			data = data[0];
		}

		callback(data, err);
	});
}

controller.getSeason = function getSeason(req, res, callback){
	var query = {};
	if (req.params.id){
		query._id = req.params.id;
	}

	var result = Season.findOne(query).populate('colors');
	result.exec(function(err, data){
		callback(data, err);
	});
}