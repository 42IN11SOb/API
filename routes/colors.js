var express = require('express');
var router = express.Router();
var controller = require('../controller/colorController.js');
var middlewares = require('../middlewares/middlewares');

//isLoggedIn midleware checkt of user ingelogd is
router.get('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.getColors(function callback(data, err) {
        if (err) return;

        res.json(data);
    });
});

//add season
router.post('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.createColor(req.body, function callback(data, err) {
        if (err) return;
        res.json(data);
    });

});

//get single seaons
router.get('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var color = req.body;
    controller.getColor(req.params.name, function callback(data, err) {
        if (err) return;

        res.json(data);
    });
});

//get single seaons
router.put('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var color = req.body;
    controller.updateColor(req.params.name, color, function callback(data, err) {
        if (err) return;

        res.json(data);
    });
});

//get single seaons
router.delete('/:name', middlewares.isLoggedIn, function (req, res, next) {
    var color = req.body;
    controller.deleteColor(req.params.name, function callback(data, err) {
        if (err) return;

        res.json(data);
    });
});

module.exports = router;
