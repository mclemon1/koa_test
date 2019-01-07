const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger') // 引入各种依赖
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')();
const auth = require('./server/routes/auth.js'); 
const api = require('./server/routes/api.js'); 
const Kcors = require('kcors');
const jwt = require('koa-jwt');
const path =require('path');
const serve = require('koa-static');

//静态文件serve在koa-router的其他规则之上
app.use(serve(path.resolve('dist')));// 将webpack打包好的项目目录作为Koa静态文件服务的目录

// 跨域设置
const corsOptions = {
  'origin': '',
  'credentials': true,
  'maxAge': 3600
};
app.use(Kcors(corsOptions));
//数据格式化
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json());
app.use(logger());
//打印时间
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`) // 显示执行的时间
})
//路由验证
app.use(async (ctx,next) =>{  //  如果JWT验证失败，返回验证失败信息
    try {
      await next();
    } catch (err) {
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body = {
          success: false,
          token: null,
          info: 'Protected resource, use Authorization header to get access'
        };
      } else {
        throw err;
      }
    }
});
//错误打印
app.on('error', function(err, ctx){
  console.log('server error', err);
});
//路由使用
router.use('/auth', auth.routes());
router.use('/api',jwt({secret: 'vue-koa-demo'}), api.routes());
app.use(router.routes())
//开始监听
app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;