var express = require('express');
var router = express.Router();
var controller = require('../controller/passportController.js');
var middlewares = require('../middlewares/middlewares');

//isLoggedIn midleware checkt of user ingelogd is
router.get('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.getPassports(function callback(data, err) {
        if (err) return;
         res.json({
            success: true,
            data: response
        });
    });
});

//add season
router.post('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.createPassport(req.body, function callback(data, err) {
        if (err) return;
        res.json({
            success: true,
            data: response
        });
    });

});

//get single seaons
router.get('/:name', middlewares.isLoggedIn, function (req, res, next) {
    controller.getPassport(req.params.name, function callback(data, err) {
        if (err) return;
        res.json({
            success: true,
            data: response
        });
    });
});

//get single seaons
router.put('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var passport = req.body;
    controller.updatePassport(req.params.name, passport, function callback(data, err) {
        if (err) return;
         res.json({
            success: true,
            data: response
        });
    });
});

//get single seaons
router.delete('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var passport = req.body;
    controller.deletePassport(req.params.name, function callback(data, err) {
        if (err) return;
         res.json({
            success: true,
            data: response
        });
    });
});

module.exports = router;
