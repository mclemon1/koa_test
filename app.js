const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger') // 引入各种依赖
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')();
const auth = require('./server/routes/auth.js'); 
const Kcors = require('kcors');

// 跨域设置
const corsOptions = {
  'origin': '',
  'credentials': true,
  'maxAge': 3600
};
app.use(Kcors(corsOptions));

app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json());
app.use(logger());

// app.use(function* (next){
//   let start = new Date;
//   yield next;
//   let ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms); // 显示执行的时间
// });

app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.on('error', function(err, ctx){
  console.log('server error', err);
});

router.use('/auth', auth.routes());
app.use(router.routes())

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;