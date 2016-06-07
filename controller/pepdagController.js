var Pepdag = require('mongoose').model('Pepdag');
var controller = exports;

controller.getPepdags = function (callback) {
    Pepdag.find({})
        .exec(function (err, data) {

            callback(data, err);
        });
};

controller.getPepdag = function (identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    var result = Pepdag.findOne(query)
    result.exec(function (err, data) {

        if (data) {
            callback(data, err);
        } else {
            query = {};
            if (identifier) {
                query._id = identifier;
            }

            var result = Pepdag.findOne(query)
            result.exec(function (err, data) {
                callback(data, err);
            });
        }
    });
};

controller.updatePepdag = function (identifier, pepdag, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Pepdag.findOneAndUpdate(query,
        pepdag, {
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

                Pepdag.findOneAndUpdate(query,
                    pepdag, {
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

controller.createPepdag = function (pepdag, callback) {
    console.log(pepdag);
    var newPepdag = new Pepdag();

    for (var item in pepdag) {
        newPepdag[item] = pepdag[item];
    }

    newPepdag.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newPepdag);
    });
};

controller.deletePepdag = function (identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Pepdag.findOneAndRemove(query,
        function (err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                Pepdag.findOneAndRemove(query,
                    function (err, data) {
                        data.status = "deleted";
                        callback(data, err);
                    }
                );
            }
        }
    );
};
