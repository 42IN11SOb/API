var Passport = require('mongoose').model('Passport');
var controller = exports;

controller.getPassports = function (callback) {
    Passport.find({})
        .populate('season')
        .exec(function (err, data) {
            console.log(err);

            callback({
                success: true,
                passports: data
            }, err);
        });
};

controller.getPassport = function (passport, callback) {
    /**
     * TODO: SEACH ON PASSPORT ID
     */

    var result = Passport.findOne(query).populate('colors');
    result.exec(function (err, data) {
        callback(data, err);
    });
};

controller.createPassport = function (passport, callback) {
    var newPassport = new Passport();
    newPassport.season = passport.season;
    //season.colors = season.colors;0

    newPassport.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newPassport);
    });

};
