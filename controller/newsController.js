var News = require('mongoose').model('News');
var controller = exports;

controller.getNewss = function (callback) {
    News.find({})
        .exec(function (err, data) {

            callback(data, err);
        });
};

controller.getNews = function (identifier, callback) {
    var query = {};
    if (identifier) {
        query.title = identifier;
    }

    var result = News.findOne(query)
    result.exec(function (err, data) {

        if (data) {
            callback(data, err);
        } else {
            query = {};
            if (identifier) {
                query._id = identifier;
            }

            var result = News.findOne(query)
            result.exec(function (err, data) {
                callback(data, err);
            });
        }

    });
};

controller.updateNews = function (identifier, news, callback) {
    var query = {};
    if (identifier) {
        query.title = identifier;
    }

    News.findOneAndUpdate(query,
        news, {
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

                News.findOneAndUpdate(query,
                    news, {
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

controller.createNews = function (news, callback) {
    console.log(news);
    var newNews = new News();

    for (var item in news) {
        newNews[item] = news[item];
    }

    newNews.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newNews);
    });
};

controller.deleteNews = function (identifier, callback) {
    var query = {};
    if (identifier) {
        query.name = identifier;
    }

    News.findOneAndRemove(query,
        function (err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                News.findOneAndRemove(query,
                    function (err, data) {
                        data.status = "deleted";
                        callback(data, err);
                    }
                );
            }
        }
    );
};
