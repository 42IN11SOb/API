var express = require('express');
var router = express.Router();
var controller = require('../controller/figureController.js');
var middlewares = require('../middlewares/middlewares');

//isAuthorized midleware checkt of user ingelogd is
router.get('/', function (req, res, next) {
    controller.getFigures(function callback(data, err) {
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

//add figure
router.post('/', function (req, res, next) {
    controller.createFigure(req.body, function callback(data, err) {
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

//get single figure
router.get('/:name', function (req, res, next) {
    var figure = req.body;
    controller.getFigure(req.params.name, function callback(data, err) {
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

//get single figure
router.put('/:name', function (req, res, next) {
    var figure = req.body;
    controller.updateFigure(req.params.name, figure, function callback(data, err) {
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

//get single figure
router.delete('/:name', function (req, res, next) {
    var figure = req.body;
    controller.deleteFigure(req.params.name, function callback(data, err) {
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
