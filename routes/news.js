var express = require('express');
var router = express.Router();
var controller = require('../controller/newsController.js');
var middlewares = require('../middlewares/middlewares');

//isLoggedIn midleware checkt of user ingelogd is
router.get('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.getNewss(function callback(data, err) {
        if (err) return;

        res.json({
            success: true,
            data: data
        });
    });
});

//add news
router.post('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.createNews(req.body, function callback(data, err) {
        if (err) return;
        res.json({
            success: true,
            data: data
        });
    });

});

//get single news
router.get('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var news = req.body;
    controller.getNews(req.params.name, function callback(data, err) {
        if (err) return;

        res.json({
            success: true,
            data: data
        });
    });
});

//get single news
router.put('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var news = req.body;
    controller.updateNews(req.params.name, news, function callback(data, err) {
        if (err) return;

        res.json({
            success: true,
            data: data
        });
    });
});

//get single news
router.delete('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var news = req.body;
    controller.deleteNews(req.params.name, function callback(data, err) {
        if (err) return;

        res.json({
            success: true,
            data: data
        });
    });
});

module.exports = router;
