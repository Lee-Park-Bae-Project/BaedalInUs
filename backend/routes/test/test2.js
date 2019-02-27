const router = require('express').Router();


/**
 * /test/test2
 */
router.get('/', (req, res)=>{
    res.status(200).json({success:'hihi'});
});

module.exports = router;
