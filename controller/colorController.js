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

controller.updateColors = function (identifier, color, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Season.findOneAndUpdate(query,
        color, {
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

controller.createColor = function (color, callback) {
    console.log(color);
    var newColor = new Color();
    newColor.name = color.name;
    newColor.r = color.r;
    newColor.g = color.g;
    newColor.b = color.b;
    //color.colors = color.colors;

    newColor.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newColor);
    });

};
