var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/install', function(req, res, next) {
 var controller = require('../controller/installController.js');

 controller.install(function callback(data, err) {
        if (err) {
            res.json({
                success: false,
                data: err
            });
            return;
        }

        res.json({
            success: true,
            data: data
        });
    });
});

module.exports = router;
