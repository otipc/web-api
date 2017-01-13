var express = require('express');
var router = express.Router();

/* GET jobs listing. */
router.get('/', function (req, res) {
    res.render('pages/job/jobs');
});

router.get('/add', function (req, res) {
    res.render('pages/job/addJob');
});

module.exports = router;