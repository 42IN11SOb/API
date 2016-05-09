var middlewares = exports;
var pjson = require('../package.json');

middlewares.CORS = function CORS(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
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
}
