var Figure = require('mongoose').model('Figure');
var controller = exports;

controller.getFigures = function(callback) {
    Figure.find({})
        .exec(function(err, data) {

            callback( data, err);
        });
};

controller.getFigure = function(identifier, callback) {
    var query = {};
    if (identifier) {
        query.title = identifier;
    }

    var result = Figure.findOne(query)
    result.exec(function(err, data) {

        if (data) {
            callback(data, err);
        } else {
            query = {};
            if (identifier) {
                query._id = identifier;
            }

            var result = Figure.findOne(query)
            result.exec(function(err, data) {
                callback(data, err);
            });
        }

    });
};

controller.updateFigure = function(identifier, figure, callback) {
    var query = {};
    if (identifier) {
        query.title = identifier;
    }

    Figure.findOneAndUpdate(query,
        figure, {
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

                Figure.findOneAndUpdate(query,
                    figure, {
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

controller.createFigure = function(figure, callback) {
    console.log(figure);
    var newFigure = new Figure();

    for (var item in figure) {
        newFigure[item] = figure[item];
    }

    newFigure.save(function(err) {
        if (err) {
            throw err;
        }
        return callback(newFigure);
    });
};

controller.deleteFigure = function(identifier, callback) {
    var query = {};
    if (identifier) {
        query.title = identifier;
    }

    Figure.findOneAndRemove(query,
        function(err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                Figure.findOneAndRemove(query,
                    function(err, data) {
                        data.status = "deleted";
                        callback(data, err);
                    }
                );
            }
        }
    );
};
