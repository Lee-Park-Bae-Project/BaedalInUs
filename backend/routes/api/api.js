const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth');

const logoutRouter = require('./logout');
const chatRouter = require('./chat');
const postRouter = require('./post');

/**
 * 여기까지는 localhost:3000/api
 */

/**
 * 토큰 검증하는 미들웨어
 * 실패시
 * res.status(403).json({
 *  success:false,
 *  message:error.message
 * })
 * 반환
 */
router.use(authMiddleware);
router.use('/logout', logoutRouter); // 로그아웃
router.use('/chat', chatRouter); // 글쓰기
router.use('/postRouter', postRouter); // 채팅

module.exports = router;
