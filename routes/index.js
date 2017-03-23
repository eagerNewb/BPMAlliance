var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var fs = require('fs');
// var encoder = require('../modules/encoder');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.post('/', function(req, res) {
    console.log(req.body);
    //BREAKS ON ENCODING
    // encoder.encode(req.body);
    // var base64Data = data.replace(/^data:audio\/ogg;base64,/, "");
    
    // fs.writeFile("../out.txt", base64Data, 'base64', function(err) {
    //     if(err) throw err;
    //     console.log(err);
    // });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;