var Season = require('mongoose').model('Season');
var controller = exports;

controller.getSeasons = function(callback) {
    Season.find({}).populate("colors.color")
        .exec(function(err, data) {

            callback( data, err);
        });
};

controller.getSeason = function(identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    var result = Season.findOne(query).populate("colors.color");
    result.exec(function(err, data) {

        if (data) {
            callback(data, err);
        } else {
            query = {};
            if (identifier) {
                query._id = identifier;
            }

            var result = Season.findOne(query).populate("colors.color");
            result.exec(function(err, data) {
                callback(data, err);
            });
        }

    });
};

controller.updateSeason = function(identifier, season, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Season.findOneAndUpdate(query,
        season, {
            autoIndexId: false,
            upsert: false,
            new: true
        },
        function(err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                Season.findOneAndUpdate(query,
                    season, {
                        autoIndexId: false,
                        upsert: false,
                        new: true
                    },
                    function(err, data) {
                        callback(data, err);
                    }
                );
            }
        }
    );
};

controller.createSeason = function(season, callback) {
    console.log(season);
    var newSeason = new Season();

    for (var item in season) {
        newSeason[item] = season[item];
    }

    newSeason.save(function(err) {
        if (err) {
            throw err;
        }
        return callback(newSeason);
    });
};

controller.deleteSeason = function(identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Season.findOneAndRemove(query,
        function(err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                Season.findOneAndRemove(query,
                    function(err, data) {
                        data.status = "deleted";
                        callback(data, err);
                    }
                );
            }
        }
    );
};
