var express = require('express');
var router = express.Router();

/* GET jobs listing. */
router.get('/', function (req, res) {
    res.render('pages/api/apis');
});

router.get('/add', function (req, res) {
    res.render('pages/api/addApi');
});

module.exports = router;