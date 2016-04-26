var jwt             = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('mongoose').model('User');
var Role = require('mongoose').model('Role');

exports.getToken = function(user, secret, callback) {
    var token = jwt.sign(user, secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    callback({
    	success:true,
    	message: 'enjoy your token',
    	token: token
    });
};

exports.checkToken = function(req, secret, next, callback) {
    // check header for token
    // var token = req.headers['x-access-token'];
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.session.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                callback({ success: false, message: 'Failed to authenticate token.' });
            } else {/*
                if (req.isAuthenticated()) {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                } else {
                    callback({
                        success: false,
                        message: 'Not logged in'
                    })
                }*/

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

exports.getProfile = function(id, callback) {
    User.findOne({
        _id: id
    }).populate('role').exec(function(err, user) {
        if (err) { callback(err) }
        if (!user) {
            callback({
                success: false,
                message: "User not found."
            });
        }
        callback({
            success: true,
            user: user
        });
    });
};

exports.getAll = function(callback) {
    User.find({}).populate('role').exec(function(err, users){
        if (err){ return next(err); }
        callback({
            success:true,
            users:users
        });
    });
}
