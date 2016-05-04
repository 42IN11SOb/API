'use strict';
var express = require('express');
var router = express.Router();
var roleController = require('../controller/roleController.js');
var middlewares = require('../middlewares/middlewares');

/* GET users listing. */
router.get('/', middlewares.isLoggedIn, function (req, res, next) {
    roleController.getRoles(function (result) {
        res.send(result);
    });
})

router.post('/', middlewares.isLoggedIn, function (req, res, next) {
    var role = {};

    role.name = req.body.name;
    role.parent = req.body.parent;
    role.users = req.body.users;

    roleController.createRole(role, function (result) {
        res.send(result);
    });
})

module.exports = router;
