var express = require('express');
var router = express.Router();
var controller = require('../controller/pepdagController.js');
var middlewares = require('../middlewares/middlewares');

//isAuthorized midleware checkt of user ingelogd is
router.get('/', function (req, res, next) {
    controller.getPepdags(function callback(data, err) {
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
    controller.createPepdag(req.body, function callback(data, err) {
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
    var pepdag = req.body;
    controller.getPepdag(req.params.name, function callback(data, err) {
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
    var pepdag = req.body;
    controller.updatePepdag(req.params.name, pepdag, function callback(data, err) {
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
    var pepdag = req.body;
    controller.deletePepdag(req.params.name, function callback(data, err) {
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
