var express = require('express');
var router = express.Router();
var controller = require('../controller/colorController.js');
var middlewares = require('../middlewares/middlewares');

//isAuthorized midleware checkt of user ingelogd is
router.get('/', function (req, res, next) {
    controller.getColors(function callback(data, err) {
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
    controller.createColor(req.body, function callback(data, err) {
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
    var color = req.body;
    controller.getColor(req.params.name, function callback(data, err) {
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
    var color = req.body;
    controller.updateColor(req.params.name, color, function callback(data, err) {
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
    var color = req.body;
    controller.deleteColor(req.params.name, function callback(data, err) {
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
