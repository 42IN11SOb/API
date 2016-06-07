var express = require('express');
var router = express.Router();
var controller = require('../controller/pepdagdatesController.js');
var middlewares = require('../middlewares/middlewares');

//isAuthorized midleware checkt of user ingelogd is
router.get('/', function (req, res, next) {
    controller.getPepdagdatess(function callback(data, err) {
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
    controller.createPepdagdates(req.body, function callback(data, err) {
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
    var pepdagdates = req.body;
    controller.getPepdagdates(req.params.name, function callback(data, err) {
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
    var pepdagdates = req.body;
    controller.updatePepdagdates(req.params.name, pepdagdates, function callback(data, err) {
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
    var pepdagdates = req.body;
    controller.deletePepdagdates(req.params.name, function callback(data, err) {
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
