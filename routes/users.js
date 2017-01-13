var express = require('express');
var router = express.Router();

var http = require('http');

// var user_base_url = "http://127.0.0.1:18080";
var user_base_url = "http://192.168.49.119:9093";

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('pages/user/users');
});

router.get('/add', function (req, res) {
    res.render('pages/user/addUser');
});


router.get('/:id', function (req, res) {
    var id = req.param('id');
    console.log("token: " + id);
    http.get(user_base_url + "/manage/user/" + id, function (response) {
        response.on('data', function (chunk) {
            // var returnData = JSON.parse(chunk);//如果服务器传来的是json字符串，可以将字符串转换成json
            res.send(chunk);
        });
    }).on('error', function (e) {
        // console.log("Got error: " + e.message);
        res.send(500);
    });
});

router.get('/refresh/:id', function (req, res) {
    var id = req.param('id');
    console.log("refresh: " + id);
    http.get(user_base_url + "/manage/refresh/token/" + id, function (response) {
        response.on('data', function (chunk) {
            // var returnData = JSON.parse(chunk);//如果服务器传来的是json字符串，可以将字符串转换成json
            res.send(chunk);
        });
    }).on('error', function (e) {
        // console.log("Got error: " + e.message);
        res.send(500);
    });
});

module.exports = router;
