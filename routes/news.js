var express = require('express');
var router = express.Router();
var controller = require('../controller/newsController.js');
var middlewares = require('../middlewares/middlewares');

//isAuthorized midleware checkt of user ingelogd is
router.get('/', function (req, res, next) {
    controller.getNewss(function callback(data, err) {
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

//add news
router.post('/', function (req, res, next) {
    controller.createNews(req.body, function callback(data, err) {
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

//get single news
router.get('/:name', function (req, res, next) {
    var news = req.body;
    controller.getNews(req.params.name, function callback(data, err) {
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

//get single news
router.put('/:name', function (req, res, next) {
    var news = req.body;
    controller.updateNews(req.params.name, news, function callback(data, err) {
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

//get single news
router.delete('/:name', function (req, res, next) {
    var news = req.body;
    controller.deleteNews(req.params.name, function callback(data, err) {
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
