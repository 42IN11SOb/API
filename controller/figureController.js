var Figure = require('mongoose').model('Figure');
var controller = exports;

controller.getFigures = function (callback) {
    Figure.find({})
        .populate('colors')
        .exec(function (err, data) {
            console.log(err);

            callback({
                success: true,
                users: data
            }, err);
        });
};

controller.getFigure = function (req, res, callback) {
    var query = {};
    if (req.params.id) {
        query._id = req.params.id;
    }

    var result = Figure.findOne(query).populate('colors');
    result.exec(function (err, data) {
        callback(data, err);
    });
};

controller.createFigure = function (season, callback) {
    console.log(season);
    var newFigure = new Figure();
    newFigure.title = season.title;
    newFigure.advice = season.advice;
    newFigure.dos = season.dos;
    newFigure.donts = season.donts;
    newFigure.img = season.img;
    newFigure.info = season.info;
    //season.colors = season.colors;

    newFigure.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newFigure);
    });

};
