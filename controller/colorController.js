var Color = require('mongoose').model('Color');
var controller = exports;

controller.getColors = function (callback) {
    Color.find({})
        .exec(function (err, data) {

            callback(data, err);
        });
};

controller.getColor = function (identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    var result = Color.findOne(query)
    result.exec(function (err, data) {

        if (data) {
            callback(data, err);
        } else {
            query = {};
            if (identifier) {
                query._id = identifier;
            }

            var result = Color.findOne(query)
            result.exec(function (err, data) {
                callback(data, err);
            });
        }
    });
};

controller.updateColor = function (identifier, color, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Color.findOneAndUpdate(query,
        color, {
            autoIndexId: false,
            upsert: false,
            new: true
        },
        function (err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                Color.findOneAndUpdate(query,
                    color, {
                        autoIndexId: false,
                        upsert: false,
                        new: true
                    },
                    function (err, data) {
                        callback(data, err);
                    }
                );
            }
        }
    );
};

controller.createColor = function (color, callback) {
    console.log(color);
    var newColor = new Color();

    for (var item in color) {
        newColor[item] = color[item];
    }

    newColor.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newColor);
    });
};

controller.deleteColor = function (identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Color.findOneAndRemove(query,
        function (err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                Color.findOneAndRemove(query,
                    function (err, data) {
                        data.status = "deleted";
                        callback(data, err);
                    }
                );
            }
        }
    );
};
