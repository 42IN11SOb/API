var express = require('express');
var router = express.Router();
var controller = require('../controller/figureController.js');
var middlewares = require('../middlewares/middlewares');

//isLoggedIn midleware checkt of user ingelogd is
router.get('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.getFigures(function callback(data, err) {
        if (err) return;

        res.json(data);
    });
});

//add figure
router.post('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.createFigure(req.body, function callback(data, err) {
        if (err) return;
        res.json(data);
    });

});

//get single figure
router.get('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var figure = req.body;
    controller.getFigure(req.params.name, function callback(data, err) {
        if (err) return;

        res.json(data);
    });
});

//get single figure
router.put('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var figure = req.body;
    controller.updateFigure(req.params.name, figure, function callback(data, err) {
        if (err) return;

        res.json(data);
    });
});

//get single figure
router.delete('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var figure = req.body;
    controller.deleteFigure(req.params.name, function callback(data, err) {
        if (err) return;

        res.json(data);
    });
});

module.exports = router;
