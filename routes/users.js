var express = require('express');
var router = express.Router();
var passport = require('passport');
var controller = require('../controller/userController.js');
var middlewares = require('../middlewares/middlewares');

/* GET users listing. */
router.get('/', function (req, res) {
    controller.getAll(function (response) {
        res.json({
            success: true,
            data: response
        });

    });
});

/* GET users listing. */
router.put('/:name', function (req, res) {
    controller.updateUser(req.params.name, req.body, function (response) {
        res.json({
            success: true,
            data: response
        });
    });
});

//isLoggedIn midleware checkt of user ingelogd is
router.get('/profile', middlewares.isLoggedIn, function (req, res) {
    controller.getProfile(req.userID, function (response) {
        res.json({
            success: true,
            data: response
        });
    });
});

//isLoggedIn midleware checkt of user ingelogd is
router.get('/:name', middlewares.isLoggedIn, function (req, res) {
    controller.getProfile(req.params.name, function (response) {
        res.json({
            success: true,
            data: response
        });
    });
});

router.put('/profile', middlewares.isLoggedIn, function (req, res) {
    req.body.userID = req.userID;
    controller.updateUser(req.body, function (response) {
        res.json({
            success: true,
            data: response
        });
    });
});

router.post('/signup', passport.authenticate('local-signup', {
    session: false
}), function (req, res) {
    res.status(201).json({
        'message': 'account created succesful'
    });
});

router.post('/login', passport.authenticate('local-login', {
    session: false
}), function (req, res) {
    controller.getToken(req.user, function (resp) {
        controller.getProfile(req.userID, function (response) {
            resp.profile = response;

            res.json({
                success: true,
                data: resp
            });
        });
    });
});

router.post('/logout', function (req, res) {
    req.logout();
    req.userID = null;

    res.json({
        success: true,
        message: "Logout succesful."
    });
});

router.get('/loggedIn', middlewares.isLoggedIn, function (req, res) {
    if (req.userID != null) {
        res.json({
            success: true,
            message: "User is logged in."
        });
    }
});

module.exports = router;

/*router.get('/addtest', function(req, res) {
    var TestAdmin = new Role({
        name: "TestAdmin"
    });

    TestAdmin.save(function(err){
        //if (err) return handleError(err);

        var Admin = new User({
            username: "Admin",
            password: "test1235",
            active: true,
            email: "info@bartimeus.nl",
            role: TestAdmin._id
        });

        Admin.save(function(err){
            if (err) res.send(err + " An error occured");
            else //return handleError(err);
                res.send("Saved user");
        })
    });

});*/

/*router.get('/', function(req, res) {
  User.find().exec(function(e, users){
    //res.render('users/index', {
        if (e){ retur(e); }
        res.json(users);
        //"users" : docs
    //});
  });
});*/
