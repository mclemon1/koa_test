const api = require('../controllers/list.js'); 
const router = require('koa-router')();

router.post('/addlist', api.createlistAuth); // 定义url的参数是id,用list的auth方法引入router
router.get('/list/:id', api.getUserlist);
router.delete('/list/:id', api.deleteUserlist);
router.put('/list/:id', api.updataUserlist);

module.exports = router; // 把router规则暴露出去