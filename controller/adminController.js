var Season = require('mongoose').model('Season');
var controller = exports;

controller.createSeason = function addSeason(req, res, callback) {
    var season = new Season(req.body);
    season.save(function (err, savedSeason) {
        callback(err, savedSeason);
    });
}

controller.editSeason = function editSeason(req, res, callback) {
    var query = {};
    query._id = req.params.id;

    var result = Season.findOne(query).populate('colors');
    result.exec(function (err, season) {
        season.name = req.body.name;
        season.save(function (err, saved) {
            callback(saved, err);
        });
    });
}

controller.removeSeason = function removeSeason(req, res, callback) {
    if (req.params.id) {
        var id = req.params.id;
        Season.remove({
            _id: id
        }).exec(function (err) {
            callback(err);
        })
    }
}
