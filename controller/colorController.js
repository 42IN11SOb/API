var Color = require('mongoose').model('Color');
var controller = exports;

controller.getColors = function (callback) {
    Color.find({})
        .populate('colors')
        .exec(function (err, data) {
            console.log(err);

            callback({
                success: true,
                users: data
            }, err);
        });
};

controller.getColor = function (req, res, callback) {
    var query = {};
    if (req.params.id) {
        query._id = req.params.id;
    }

    var result = Color.findOne(query).populate('colors');
    result.exec(function (err, data) {
        callback(data, err);
    });
};

controller.createColor = function (season, callback) {
    console.log(season);
    var newColor = new Color();
    newColor.name = season.name;
    newColor.r = season.r;
    newColor.g = season.g;
    newColor.b = season.b;
    //season.colors = season.colors;

    newColor.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newColor);
    });

};
