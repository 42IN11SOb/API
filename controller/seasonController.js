var Season = require('mongoose').model('Season');
var controller = exports;

controller.getSeasons = function (callback) {
    Season.find({})
        .populate('colors.color')
        .exec(function (err, data) {
            console.log(err);

            callback({
                success: true,
                seasons: data
            }, err);
        });
};

controller.getSeason = function (season, callback) {
    var query = {};
    if (season.name) {
        query.name = season.name;
    }

    var result = Season.findOne(query).populate('colors.color');
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

controller.updateSeason = function (season, callback) {
    var query = {};
    if (season.name) {
        query.name = season.name;
    }

    Season.findOneAndUpdate(query,
        season, {
            autoIndexId: false,
            upsert: true,
            new: true
        },
        function (err, data) {
            data.success = true;
            callback(data, err);
        }
    );
};

controller.deleteSeason = function (season, callback) {
    var query = {};
    if (season.name) {
        query.name = season.name;
    }

    var result = Season.findOne(query);
    result.remove().exec(function (err, data) {
        callback(data, err);
    });
};
