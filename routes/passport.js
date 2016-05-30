var express = require('express');
var router = express.Router();
var controller = require('../controller/passportController.js');
var middlewares = require('../middlewares/middlewares');

//isLoggedIn midleware checkt of user ingelogd is
router.get('/', function (req, res, next) {
    controller.getPassports(function callback(data, err) {
        if (err) {
            res.json({
                success: false,
                data: err
            });
            return;
        }
        res.json({
            success: true,
            data: data
        });
    });
});

//add season
router.post('/', function (req, res, next) {
    controller.createPassport(req.body, function callback(data, err) {
        if (err) {
            res.json({
                success: false,
                data: err
            });
            return;
        }
        res.json({
            success: true,
            data: data
        });
    });

});

//get single seaons
router.get('/:name', function (req, res, next) {
    controller.getPassport(req.params.name, function callback(data, err) {
        if (err) {
            res.json({
                success: false,
                data: err
            });
            return;
        }
        res.json({
            success: true,
            data: data
        });
    });
});

//get single seaons
router.put('/:name', function (req, res, next) {
    var passport = req.body;
    controller.updatePassport(req.params.name, passport, function callback(data, err) {
        if (err) {
            res.json({
                success: false,
                data: err
            });
            return;
        }
        res.json({
            success: true,
            data: data
        });
    });
});

//get single seaons
router.delete('/:name', function (req, res, next) {
    var passport = req.body;
    controller.deletePassport(req.params.name, function callback(data, err) {
        if (err) {
            res.json({
                success: false,
                data: err
            });
            return;
        }
        res.json({
            success: true,
            data: data
        });
    });
});

module.exports = router;
