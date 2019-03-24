const router = require('express').Router();
const controller = require('./controller');

router.post('/postOrder', controller.postOrder);
router.post('/postUpdate/:id', controller.postUpdate);

module.exports = router;
