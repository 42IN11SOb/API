var express = require('express');
var router = express.Router();
var controller = require('../controller/pageController.js');
var middlewares = require('../middlewares/middlewares');

//isLoggedIn midleware checkt of user ingelogd is
router.get('/', function (req, res, next) {
    controller.getPages(function callback(data, err) {
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

//add page
router.post('/', function (req, res, next) {
    controller.createPage(req.body, function callback(data, err) {
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

//get single page
router.get('/:name', function (req, res, next) {
    var page = req.body;
    controller.getPage(req.params.name, function callback(data, err) {
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

//get single page
router.put('/:name', function (req, res, next) {
    var page = req.body;
    controller.updatePage(req.params.name, page, function callback(data, err) {
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

//get single page
router.delete('/:name', function (req, res, next) {
    var page = req.body;
    controller.deletePage(req.params.name, function callback(data, err) {
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
