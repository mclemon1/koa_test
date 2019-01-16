const api = require('../controllers/test.js'); 
const router = require('koa-router')();

router.post('/', api.postUrl);

module.exports = router; // 把router规则暴露出去