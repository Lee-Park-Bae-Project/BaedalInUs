var express = require('express');
var router = express.Router();



router.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello');
});

router.post('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log(req.body);
    var id = req.body.id;
    var pw = req.body.pw;
    console.log(id);
    console.log(pw);
    res.json(req.body);
});

module.exports = router;