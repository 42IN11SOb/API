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

middlewares.getUserAgent = function getUserAgent() {
    var ua = req.headers['user-agent'],
        $ = {};

    if (/mobile/i.test(ua))
        $.Mobile = true;

    if (/like Mac OS X/.test(ua)) {
        $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
        $.iPhone = /iPhone/.test(ua);
        $.iPad = /iPad/.test(ua);
    }

    if (/Android/.test(ua))
        $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

    if (/webOS\//.test(ua))
        $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

    if (/(Intel|PPC) Mac OS X/.test(ua))
        $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

    if (/Windows NT/.test(ua))
        $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

    console.log($);
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
