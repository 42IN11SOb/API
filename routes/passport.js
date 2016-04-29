var express = require('express');
var router = express.Router();
var controller = require('../controller/passportController.js');
var middlewares = require('../middlewares/middlewares');

//isLoggedIn midleware checkt of user ingelogd is
router.get('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.getPassports(function callback(data, err) {
        if (err) return;

        res.json(data);
    });
});

//add season
router.post('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.createPassport(req.body, function callback(data, err) {
        if (err) return;
        res.json(data);
    });

});

module.exports = router;
