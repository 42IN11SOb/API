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

//add season
router.post('/', middlewares.isLoggedIn, function (req, res, next) {
    controller.createFigure(req.body, function callback(data, err) {
        if (err) return;
        res.json(data);
    });

});

module.exports = router;
