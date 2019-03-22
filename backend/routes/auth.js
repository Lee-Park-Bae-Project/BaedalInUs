const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const users = require('../models/user');

const kakaoinfoRouter = require('./kakaoInfo');
router.use('/kakaoinfo', kakaoinfoRouter);

// const authMiddleware = require('../middlewares/auth');
//
// router.use(authMiddleware);

router.get('/login', (req, res) => {
    //   let session = req.session;
    //    res.render('login', {session: session});
});

//
router.post('/login', (req, res) => {
    console.log(`in /login post`);
    const id = req.body.user.id.toString();
    const pw = req.body.user.pw.toString();
    const secret = req.app.get('jwt-secret');

    console.log(`id: ${id}`);
    console.log(`pw: ${pw}`);

    // res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // res.setHeader("Access-Control-Allow-Origin", "*");     //허용할 Origin(요청 url) : "*" 의 경우 모두 허용
    // res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");     //허용할 request http METHOD : POST, GET, DELETE, PUT
    // res.setHeader("Access-Control-Max-Age", "3600");     //브라우저 캐시 시간(단위: 초) : "3600" 이면 최소 1시간 안에는 서버로 재요청 되지 않음
    // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");    //요청 허용 헤더(ajax : X-Requested-With)

    /**
     * @param result
     * 아이디가 있는지 없는지 검사
     */
    const checkResult = (result) => {
        if (result.length !== 0) {
            return result;
        }
        throw new Error('id is not correct');
    };

    /**
     *
     * @param result
     * @returns {Promise<any>}
     * 유저가 입력한 pw, db에 저장된 pw, salt로 비번이 맞는지 검증하는 함수
     */
    const authenticate = (result) => {
        if (users.authenticate(pw, result[0].password, result[0].salt)) {
            // create a promise that generates jwt asynchronously
            // 토큰 생성
            let tokenGeneratePromise = new Promise(((resolve, reject) => {
                jwt.sign(
                    {
                        _id: result._id,
                        userID: result.id,
                    },
                    secret,
                    {
                        expiresIn: '7d',
                        issuer: 'hoodadak',
                        subject: 'userInfo'
                    },
                    (err, token) => {
                        if (err) reject(err);
                        resolve(token);
                    }
                )
            }));
            // 토큰을 생성하는 promise를 리턴
            return tokenGeneratePromise;
        }
        throw new Error('wrong password');
    };

    /**
     *
     * @param token
     * 마지막으로 응답해주는 함수
     */
    const respond = (token) => {
        res.cookie('access_token', token, { maxAge: 1000 * 60 * 60, httpOnly: false });
        res.status(200).json(token);
    };

    /**
     *
     * @param error
     * 에러받는 함수
     */
    const onError = (error) => {
        console.log(error);
        res.status(201).json({ message: error.message });
    };

    users.find({ id: id })
        .then(checkResult)
        .then(authenticate)
        .then(respond)
        .catch(onError);

});

router.post('/setKakaoProperties', (req, res) => {
    const userToken = req.body.userToken;
    const userInfo = req.body.userInfo;
    const kakaoid = req.body.userInfo.id;
    const secret = req.app.get('jwt-secret');

    console.log(userInfo);

    const respond = (token) => {
        res.cookie('access_token', token, { maxAge: 1000 * 60 * 60, httpOnly: true });
        res.status(200).json(token);
    };

    /**
     *
     * @param error
     * 에러받는 함수
     */
    const onError = (error) => {
        console.log(error);
        res.status(201).json({ message: error.message });
    };

    // const findkakaoid = () => {
    //     console.log('findkakaoid');
    //     users.find({ id: kakaoid }, (err, result) => {
    //         if (err) {
    //             console.log('시발 에러다');
    //             throw new Error(err);
    //         }
    //         return result.length;
    //     });
    // };

    const t1 = (result) => {
        if (result.length === 0) {
            console.log('hihi');

            let makeNewUserPromise = new Promise(((resolve, reject) => {
                var newUser = new users({ id: kakaoid, nickname: userInfo.properties.nickname });

                newUser.save()
                    .then((result) => { resolve(true); })
                    .catch((err) => { reject(err); });
            }
            ));

            return makeNewUserPromise;

        } else {
            return true;
        }
    };
    const t2 = (tf) => {
        console.log('t2');
        if (tf) {
            users.findOneAndUpdate({ id: kakaoid },
                {
                    $set:
                    {
                        userToken: {
                            access_token: userToken.access_token,
                            expires_in: userToken.expires_in,
                            refresh_token: userToken.refresh_token,
                            refresh_token_expires_in: userToken.refresh_token_expires_in,
                            scope: userToken.scope,
                            token_type: userToken.token_type
                        },
                        userInfo: {
                            id: userInfo.id,
                            properties: {
                                nickname: userInfo.properties.nickname,
                                profile_image: userInfo.properties.profile_image,
                                thumbnail_image: userInfo.properties.thumbnail_image
                            },
                            kakao_account: {
                                has_email: userInfo.kakao_account.has_email,
                                is_email_vaild: userInfo.kakao_account.is_email_vaild,
                                is_email_verified: userInfo.kakao_account.is_email_verified,
                                email: userInfo.kakao_account.email,
                                has_age_range: userInfo.kakao_account.has_age_range,
                                has_birthday: userInfo.kakao_account.has_birthday,
                                has_gender: userInfo.kakao_account.has_gender
                            }
                        }

                    }
                })
                .then(result => {
                    let tokenGeneratePromise = new Promise(((resolve, reject) => {
                        jwt.sign(
                            {
                                userID: kakaoid
                            },
                            secret,
                            {
                                expiresIn: '7d',
                                issuer: 'hoodadak',
                                subject: 'userInfo'
                            },
                            (err, token) => {
                                if (err) reject(err);
                                resolve(token);
                            }
                        )
                    }));
                    // 토큰을 생성하는 promise를 리턴
                    return tokenGeneratePromise;
                })
                .catch(err => { throw new Error(err) })
        }
    };


    users.find({ id: kakaoid })
        .then(t1)
        .then(t2)
        .then(respond)
        .catch(onError);


});

router.post('/signUp', (req, res) => {
    users.find({}, (err, data) => {
        if (err) return res.json(err);
    });

    let id = req.body.user.id.toString();
    let pw = req.body.user.pw.toString();
    let email = req.body.user.email.toString();
    let name = req.body.user.name.toString();
    let nickname = req.body.user.nickname.toString();

    console.log(nickname);

    //id 중복검사
    users.find({ id: id }, (err, result) => {
        if (err) return res.json(err);
        console.log(result);
        if (result.length != 0) {
            res.status(204).json({ complete: false }); // 204 - 자원 생성 실패, 아이디 중복임
            // res.redirect('/signup');
        } else {
            console.log(`else`);
            let newData = new users({ id: id, pw: pw, name: name, email: email , nickname: nickname});
            newData.password = pw;
            newData.save();
            res.status(201).json({ complete: true });// 자원 생성 완료
        }
    });

});


/////////////////////////////////////////////////////
// 테스트용임

router.post('/check', (req, res) => {
    const token = req.headers['x-access-token'] || req.query.token

    // token does not exist
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if (err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if token is valid, it will respond with its info
    const respond = (token) => {
        res.json({
            success: true,
            info: token
        })
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then(respond).catch(onError)
})
module.exports = router;
