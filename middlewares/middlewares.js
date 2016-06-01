var middlewares = exports;
var authJSON = require('../config/auth.json');

middlewares.CORS = function CORS(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
};

middlewares.ERROR404 = function ERROR404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
};

middlewares.devError = function devError(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
};

middlewares.productionError = function productionError(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
};

middlewares.isLoggedIn = function isLoggedIn(req, res, next) {
    var userController = require('../controller/userController');

    userController.checkToken(req, next, function (response) {
        if (!response.success) {
            res.json(response);
        } else {
            next();
        }
    });
};

middlewares.getUserAgent = function getUserAgent(req, res, next) {
    //console.log(req.useragent);
    next();
}

middlewares.isAuthorized = function isAuthorized(req, res, next) {

    var userController = require('../controller/userController');
    var url = req.url;

    var roles = authJSON[req.method + url];

    if (url.split("\/").length > 2 && !roles) {
        url = url.replace(/\/(?=[^\/]*$).*/, '/:name');
        roles = authJSON[req.method + url];
    }

    if (!roles) {
        roles = ["admin"];
    }

    userController.checkToken(req, next, function (response) {
        if (roles.indexOf("everyone") > -1) {
            console.log("Method: " + req.method + ", url: " + url);
            next();
        } else if (!response.success) {
            res.json(response);
        } else {
            userController.getProfile(req.decoded._doc._id, function (result) {
                var nexted = false;

                for (var i = roles.length - 1; i >= 0; i--) {
                    if (result.role.name == roles[i]) {
                        nexted = true;
                        console.log("Method: " + req.method + ", BaseUrl: " + url + ", User: " + result.username);
                        next();
                    }
                    if (nexted == false && i == 0) {
                        console.log("Method: " + req.method + ", BaseUrl: " + url + ", Message: " + "User is not authorized");
                        res.status(403);
                        res.json({
                            message: "User is not authorized",
                            error: true
                        });
                    }
                }
            });
        }
    });
};
