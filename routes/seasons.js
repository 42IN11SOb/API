var express = require('express');
var router = express.Router();
var controller = require('../controller/seasonController.js');
var middlewares = require('../middlewares/middlewares');

//isLoggedIn midleware checkt of user ingelogd is
router.get('/', function (req, res, next) {
    controller.getSeasons(function callback(data, err) {
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
    controller.createSeason(req.body, function callback(data, err) {
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
    var season = req.body;
    controller.getSeason(req.params.name, function callback(data, err) {
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
    var season = req.body;
    controller.updateSeason(req.params.name, season, function callback(data, err) {
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
    var season = req.body;
    controller.deleteSeason(req.params.name, function callback(data, err) {
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
