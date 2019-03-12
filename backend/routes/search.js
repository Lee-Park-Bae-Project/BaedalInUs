const router = require('express').Router();
const board = require('../models/board');


router.post('/', (req, res) => {
    const fromDist = req.query.fromDist;
    const toDist = req.query.toDist;
    const fromFee = req.query.fromFee;
    const toFee = req.query.toFee;
    const stuffname = req.query.stuffName;
    const lat = req.body.lat;
    const lng = req.body.lng;



    /**
     * dist, fee, stuffname = -1 이면 상관없다는 것
     */

    console.log(fromDist);
    console.log(toDist);
    console.log(fromFee);
    console.log(toFee);
    console.log(stuffname);
    console.log('lat : ' + lat);
    console.log('lng : ' + lng);

    const reg = new RegExp(5);
    /**
     * board에서 검색하기
     */


    board.find({title: {$regex: stuffname}, fee:{$gte: fromFee, $lte: toFee}, dist:{$gte: fromDist, $lte: toDist}})
        .then(result => {
            res.status(200).json({data: result});
        })
        .catch(err => {
            res.status(202).json({data: err});
        })

});
module.exports = router;
