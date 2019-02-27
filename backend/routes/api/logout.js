const router = require('express').Router();

router.post('/', (req, res) => {
    console.log('Cookies: ', req.cookies.access_token);
    res.clearCookie('access_token')
    res.status(200).json({success: '/api/logout'});
});

module.exports = router;
