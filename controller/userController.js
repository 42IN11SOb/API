'use strict';
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('mongoose').model('User');
var Role = require('mongoose').model('Role');
var pjson = require('../package.json');
var userController = exports;

userController.getToken = function (user, callback) {
    var token = jwt.sign(user, pjson.secret, {
        expiresIn: '1 year' // expires in 24 hours
    });

    callback({
        success: true,
        message: 'Enjoy your token',
        token: token
    });
};

userController.checkToken = function (req, next, callback) {
    // check header for token
    // var token = req.headers['x-access-token'];
    var token = req.headers.authorization || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, pjson.secret, function (err, decoded) {
            if (err) {
                callback({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.decoded = decoded;
                req.userID = decoded._doc._id;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        callback({
            success: false,
            message: 'No token provided. Or token invalid'
        });
    }
};

userController.getProfile = function (id, callback) {
    User.findOne({
            _id: id
        })
        .populate('role')
        .populate('passport')
        .exec(function (err, user) {
            if (err) {
                callback(err)
            }
            if (!user) {
                callback({
                    success: false,
                    message: "User not found."
                });
            }
            var populateQuery = [{
                path: 'passport.season',
                model: 'Season'
            }, {
                path: 'passport.figure',
                model: 'Figure'
            }];
            var options = {
                path: 'passport.season',
                model: 'Season'
            };

            user.populate(populateQuery, function (err, user) {

                var options = {
                    path: 'passport.season.colors.color',
                    model: 'Color'
                };
                user.populate(options, function (err, user) {

                    callback({
                        success: true,
                        user: user
                    });
                });
            });
        });
};

userController.getAll = function (callback) {
    User.find({}).populate('role').exec(function (err, users) {
        if (err) {
            return next(err);
        }
        callback({
            success: true,
            users: users
        });
    })
};

userController.createUser = function (callback) {
    User.findOne({
        'username': username
    }, function (err, user) {
        // if there are any errors, return the error
        if (err)
            return callback(err);

        // check to see if theres already a user with that email
        if (user) {
            return callback(false, {
                'signupMessage': 'That username is already taken.'
            });
        } else {
            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.email = req.body.email;
            newUser.password = newUser.generateHash(password); // use the generateHash function in our user model
            newUser.username = username;
            newUser.active = true;
            newUser.role = req.body.role; ///for now

            // save the user
            newUser.save(function (err) {
                if (err)
                    throw err;
                return callback(newUser);
            });
        }

    });
}

userController.updateUser = function (userData, callback) {

    User.findOne({
        '_id': userData.userID
    }, function (err, user) {
        // if there are any errors, return the error
        if (err)
            return callback(err);

        // check to see if theres already a user with that email
        if (user) {
            user.passport = userData.passport;
            user.save();
            return callback({
                success: true,
                message: "User updated",
                user: user
            });
        } else {
            callback({
                success: false,
                message: "User not found."
            });
        }

    });
}
