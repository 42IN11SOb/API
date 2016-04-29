var Season = require('mongoose').model('Season');
var controller = exports;

controller.getSeasons = function (callback) {
    Season.find({})
        .populate('colors')
        .exec(function (err, data) {
            console.log(err);

            callback({
                success: true,
                users: data
            }, err);
        });
};

controller.getSeason = function (req, res, callback) {
    var query = {};
    if (req.params.id) {
        query._id = req.params.id;
    }

    var result = Season.findOne(query).populate('colors');
    result.exec(function (err, data) {
        callback(data, err);
    });
};

controller.createSeason = function (season, callback) {
    console.log(season);
    var newSeason = new Season();
    newSeason.name = season.name;
    //season.colors = season.colors;

    newSeason.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newSeason);
    });

};
