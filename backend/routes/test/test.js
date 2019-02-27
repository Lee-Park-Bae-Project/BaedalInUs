const router = require('express').Router();

const testRouter = require('./test2');

router.use('/test2', testRouter);

/**
 * /test
 */
router.get('/', (req, res)=>{
    res.status(200).json({success:true});
});
module.exports = router;
