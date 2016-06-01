'use strict';
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('mongoose').model('User');
var Role = require('mongoose').model('Role');
var pjson = require('../package.json');
var userController = exports;

var populateQuery = [{
    path: 'role',
    model: 'Role'
}, {
    path: 'passport',
    model: 'Passport',
    populate: [{
        path: 'season',
        model: 'Season',
        populate: {
            path: 'colors.color',
            model: 'Color'
        }

    }, {
        path: 'figure',
        model: 'Figure'

    }]
}];

userController.getToken = function(user, callback) {
    var token = jwt.sign(user, pjson.secret, {
        expiresIn: '1 year' // expires in 24 hours
    });

    callback({
        success: true,
        message: 'Enjoy your token',
        token: token
    });
};

userController.checkToken = function(req, next, callback) {
    // check header for token
    // var token = req.headers['x-access-token'];
    var token = req.headers.authorization || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, pjson.secret, function(err, decoded) {
            if (err) {
                callback({
                    success: false,
                    data: 'Failed to authenticate token.'
                });
            } else {
                req.decoded = decoded;
                req.userID = decoded._doc._id;
                callback({
                    success: true,
                    data: 'Succesfully authenticated'
                });
            }
        });

    } else {
        // if there is no token
        // return an error
        callback({
            success: false,
            data: 'No token provided. Or token invalid'
        });
    }
};

userController.getProfile = function(identifier, callback) {
    var query = {};
    if (identifier) {
        query.username = identifier;
    }

    var result = User.findOne(query).populate(populateQuery);
    result.exec(function(err, data) {

        if (data) {
            callback(data, err);
        } else {
            query = {};
            if (identifier) {
                query._id = identifier;
            }

            var result = User.findOne(query).populate(populateQuery);
            result.exec(function(err, data) {
                callback(data, err);
            });
        }

    });
};

userController.getAll = function(callback) {
    User.find({}).populate(populateQuery).exec(function(err, users) {
        if (err) {
            return next(err);
        }
        callback(users);
    })
};

userController.createUser = function(callback) {
    User.findOne({
        'username': username
    }, function(err, user) {
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
            newUser.save(function(err) {
                if (err)
                    throw err;
                return callback(newUser);
            });
        }

    });
}

userController.updateUser = function(identifier, passport, callback) {
    var query = {};
    if (identifier) {
        query.username = identifier;
    }

    User.findOneAndUpdate(query,
        passport, {
            autoIndexId: false,
            upsert: false,
            new: true
        },
        function(err, data) {
            if (data) {
                callback(data, err);
            } else {
                var query = {};
                if (identifier) {
                    query._id = identifier;
                }

                User.findOneAndUpdate(query,
                    passport, {
                        autoIndexId: false,
                        upsert: false,
                        new: true
                    },
                    function(err, data) {
                        callback(data, err);
                    }
                );
            }
        }
    );
};
