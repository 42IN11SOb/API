var express = require('express');
var router = express.Router();
var passport = require('passport');
var controller = require('../controller/adminController.js');
var middlewares = require('../middlewares/middlewares');

router.get('/season', middlewares.isLoggedIn, function (req, res, next) {
    controller.newSeason(req, res, function (data, err) {
        if (err) {
            return;
        }
        res.render('admin/season/new', {});
    });
});

router.post('/season', middlewares.isLoggedIn, function (req, res, next) {
    controller.addSeason(req, res, function (savedSeason, err) {
        if (err) {
            return;
        }
        res.status(201);
        res.json(savedSeason); // TODO: replace by layout render
    });
});

module.exports = router;
