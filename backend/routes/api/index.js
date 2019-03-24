const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth');


const chat = require('./chat');
const logout = require('./logout');
const post = require('./post');

// router.use(authMiddleware);
router.use('/chat', chat);
router.use('/post', post);
router.use('/logout', logout);

module.exports = router;
