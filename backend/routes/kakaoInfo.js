const router = require('express').Router();
const users = require('../models/user');


router.post('/setKakaoUserInfo', (req, res)=>{
    console.log('/setKakaoUserInfo');
    const userInfo = req.body.userInfo;
    const userID = req.body.userInfo.id;

    users.findOneAndUpdate({id:userID}, {$set:{userInfo:userInfo}})
        .then(
            res=>{res.status(200);}
        )
        .catch(
            err=>{res.status(202).json(err);}
        )
});

router.post('/setKakaoUserToken', (req, res)=>{
    const userToken = req.body.userToken;
    const userID = req.body.userID;

    users.findOneAndUpdate({id:userID}, {$set:{userToken:userToken}})
        .then(
            result=>{ res.status(200); }
        )
        .catch(
            err=>{ res.status(202).json(err); }
        )

});



module.exports = router;
