var Passport = require('mongoose').model('Passport');
var controller = exports;
var populateQuery = [{
        path: 'passport',
        model: 'Passport'
    }, {
        path: 'figure',
        model: 'Figure'
    }];

controller.getPassports = function(callback) {
    Passport.find({}).populate(populateQuery)
        .exec(function(err, data) {

            callback({
                success: true,
                passports: data
            }, err);
        });
};

controller.getPassport = function(identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    var result = Passport.findOne(query).populate(populateQuery);
    result.exec(function(err, data) {

        if (data) {
            callback(data, err);
        } else {
            query = {};
            if (identifier) {
                query._id = identifier;
            }

            var result = Passport.findOne(query).populate(populateQuery);
            result.exec(function(err, data) {
                callback(data, err);
            });
        }

    });
};

controller.updatePassport = function(identifier, passport, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Passport.findOneAndUpdate(query,
        passport, {
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

                Passport.findOneAndUpdate(query,
                    passport, {
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

controller.createPassport = function(passport, callback) {
    console.log(passport);
    var newPassport = new Passport();

    for (var item in passport) {
        newPassport[item] = passport[item];
    }

    newPassport.save(function(err) {
        if (err) {
            throw err;
        }
        return callback(newPassport);
    });
};

controller.deletePassport = function(identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Passport.findOneAndRemove(query,
        function(err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                Passport.findOneAndRemove(query,
                    function(err, data) {
                        data.status = "deleted";
                        callback(data, err);
                    }
                );
            }
        }
    );
};

