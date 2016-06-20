var controller = require('../controller/figureController.js');
var User = require('mongoose').model('User');

var controller = exports;

controller.install = function (callback) {
    var user = new User({"username": "Admin",
    "password": "$2a$08$98D6E7weuHTembhwIhXbQuTzM4IoRDyQdW.3vDBsUd9CHEK2x.KWC",//test
    "email": true,
    "mustResetPassword": false,
    "active": true,
    "role": "57230e692a69c2a706452002",
    "passport": "57234a23357ac5b221733ebe",
    "male": false});

    user.save(function (err) {
        if (err) {
            throw err;
        }
        return callback(newNews);
    });
};
