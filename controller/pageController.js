var Page = require('mongoose').model('Page');
var controller = exports;

controller.getPages = function(callback) {
    Page.find({})
        .exec(function(err, data) {

            callback( data, err);
        });
};

controller.getPage = function(identifier, callback) {
    var query = {};
    if (identifier) {
        query.title = identifier;
    }

    var result = Page.findOne(query)
    result.exec(function(err, data) {

        if (data) {
            callback(data, err);
        } else {
            query = {};
            if (identifier) {
                query._id = identifier;
            }

            var result = Page.findOne(query)
            result.exec(function(err, data) {
                callback(data, err);
            });
        }

    });
};

controller.updatePage = function(identifier, page, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Page.findOneAndUpdate(query,
        page, {
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

                Page.findOneAndUpdate(query,
                    page, {
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

controller.createPage = function(page, callback) {
    console.log(page);
    var newPage = new Page();

    for (var item in page) {
        newPage[item] = page[item];
    }

    newPage.save(function(err) {
        if (err) {
            throw err;
        }
        return callback(newPage);
    });
};

controller.deletePage = function(identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    Page.findOneAndRemove(query,
        function(err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                Page.findOneAndRemove(query,
                    function(err, data) {
                        data.status = "deleted";
                        callback(data, err);
                    }
                );
            }
        }
    );
};
