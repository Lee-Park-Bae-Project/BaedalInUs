const jwt = require('jsonwebtoken');


const authMiddleWare = (req, res, next)=>{
    // const token = req.headers['x-access-token'] || req.query.token;
    const token = req.cookies.access_token; // 쿠키에서 토큰 읽어옴

    /**
     * 로그인 안한 상태를 잡아줌
     */
    if(!token){
        return res.status(403).json({
            success:false,
            message:'not logged in'
        })
    };

    /**
     * @type {Promise<any>}
     * 토큰 생성하는 Promise
     */
    const tokenVerifyPromise = new Promise(
        ((resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded)=>{
                if(err) reject(err);
                resolve(decoded);
            })
        })
    );

    /**
     * @param error
     * 에러 핸들러
     */
    const onError = (error)=>{
        res.status(403).json({
            success:false,
            message:error.message
        })
    };

    tokenVerifyPromise.then((decoded)=>{
        req.decoded = decoded;
        next()
    }).catch(onError)
};

module.exports = authMiddleWare;
