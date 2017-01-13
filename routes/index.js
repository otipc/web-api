var express = require('express');
var router = express.Router();

var http = require('http');

var request = require('request');
var queryString = require('querystring');


// var user_base_url = "http://127.0.0.1:18080";
var user_base_url = "http://192.168.49.119:9093";


router.use(function (req, res, next) {
    console.log("sign = " + req.session.sign);
    console.log("token = " + req.session.token);
    var url = req.originalUrl;
    console.log("originalUrl = " + url);
    if (url != "/login" && !req.session.token && !req.session.sign) {
        return res.redirect("/login");
    }
    next();
});

router.use(function (req, res, next) {
    req.session._garbage = Date();
    req.session.touch();
    next();
});

// app.use(require('cors')());

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/index');
});

router.get('/login', function (req, res, next) {
    res.render('pages/login', {error: ''});
});

router.post('/login', function (req, res, next) {

    console.log("user=" + "post login");

    var data = {
        clientId: '098f6bcd4621d373cade4e832627b4f6',
        userName: req.body.username,
        password: req.body.password
    };

    data = queryString.stringify(data);

    http.get(user_base_url + "/oauth/login?" + data, function (response) {
        response.on('data', function (chunk) {
            var returnData = JSON.parse(chunk);//如果服务器传来的是json字符串，可以将字符串转换成json
            if (200 == returnData.code) {
                req.session.sign = true;
                req.session.token = returnData.data.token;
                res.setHeader("Set-Cookie", ['account=' + req.body.username + '']);
                res.send(200);
            } else {
                res.send(400);
            }
        });
    }).on('error', function (e) {
        res.send(500);
    });

});

router.get('/logout', function (req, res, next) {
    req.session.sign = false;
    req.session.token = null;
    res.redirect("/login");
});

router.get('/about', function (req, res, next) {
    res.render('pages/about');
});

router.post('/testPost', function (req, res, next) {
    var products = [
        {name: 'apple juice', description: 'good', price: 12.12},
        {name: 'banana juice', description: 'just so sos', price: 4.50}
    ];
    res.json(products);
    return;
});

router.get('/test', function (req, res, next) {
    res.render('shopList');
});


module.exports = router;
