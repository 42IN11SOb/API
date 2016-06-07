var Pepdagdates = require('mongoose').model('Pepdagdates');
var controller = exports;

controller.getPepdagdatess = function (callback) {
    Pepdagdates.find({})
        .exec(function (err, data) {

            callback(data, err);
        });
};

controller.getPepdagdates = function (identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    var result = Pepdagdates.findOne(query)
    result.exec(function (err, data) {

        if (data) {
            callback(data, err);
        } else {
            query = {};
            if (identifier) {
                query._id = identifier;
            }

            var result = Pepdagdates.findOne(query)
            result.exec(function (err, data) {
                callback(data, err);
            });
        }
    });
};

controller.updatePepdagdates = function (identifier, pepdagdates, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Pepdagdates.findOneAndUpdate(query,
        pepdagdates, {
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

                Pepdagdates.findOneAndUpdate(query,
                    pepdagdates, {
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

controller.createPepdagdates = function (pepdagdates, callback) {
    console.log(pepdagdates);
    var newPepdagdates = new Pepdagdates();

    for (var item in pepdagdates) {
        newPepdagdates[item] = pepdagdates[item];
    }

    newPepdagdates.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newPepdagdates);
    });
};

controller.deletePepdagdates = function (identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Pepdagdates.findOneAndRemove(query,
        function (err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                Pepdagdates.findOneAndRemove(query,
                    function (err, data) {
                        data.status = "deleted";
                        callback(data, err);
                    }
                );
            }
        }
    );
};
