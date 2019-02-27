const router = require('express').Router();



router.post('/', (req, res)=>{
    res.status(200).json({success:'/api/post'});
});

module.exports = router;
