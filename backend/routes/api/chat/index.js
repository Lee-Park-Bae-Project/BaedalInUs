const router = require('express').Router();
const controller = require('./controller');

router.post('/getChatRooms', controller.getChatRooms); // 채팅방 리스트를 리턴해줌
router.post('/getRoom/:roomID', controller.getRoom); // 특정 채팅방을 리턴해줌
router.post('/sendMsg', controller.sendMsg); // 새로운 메시지 보낼떄 디비에 저장시킴

router.post('/makeRoom', controller.makeRoom);
router.post('/getSumOfUnCheckMsg', controller.getSumOfUnCheckMsg);

module.exports = router;
