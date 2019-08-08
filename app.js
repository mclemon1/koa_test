const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger') // 引入各种依赖
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')();
const auth = require('./server/routes/auth.js');
const api = require('./server/routes/api.js');
const test = require('./server/routes/test.js');
const Kcors = require('kcors');
const jwt = require('koa-jwt');
const path = require('path');
const serve = require('koa-static');
// const mime = require('mime');

//静态文件serve在koa-router的其他规则之上
app.use(serve(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
// 跨域设置
const corsOptions = {
  'origin': '',
  'credentials': true,
  'maxAge': 3600
};
app.use(Kcors(corsOptions));
//数据格式化
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
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
app.use(async (ctx, next) => { //  如果JWT验证失败，返回验证失败信息
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
app.on('error', function (err, ctx) {
  console.log('server error', err);
});
//路由使用
router.use('/auth', auth.routes());
router.use('/api', jwt({
  secret: 'vue-koa-demo'
}), api.routes());
router.use('/test', test.routes());
app.use(router.routes())
//开始监听
app.listen(8889, () => {
  console.log('Koa is listening in 8889');
});

const http = require('http')
const fs = require('fs')
const httpPort = 9998
const cache = {};

function send404(response) {
  response.writeHead(404, {
    'Conten-Type': 'text/plain'
  });
  response.write('Error 404 : resource not found');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  let fileType = filePath.split('.').pop()
  if (fileType == '/') fileType = 'html'
  response.writeHead(
    200, {
      'Content-Type': "text/" + fileType + '; charset=utf-8'
    }
  );
  response.end(fileContents);
}

http.createServer((req, res) => {
  let filePath = 'dist/index.html'
  // let filePath = 'nuxtStaticDist/index.html'
  if (req.url.indexOf("/_nuxt") != -1) {
    filePath = 'nuxtStaticDist' + req.url;
  }
  if (req.url.indexOf("/static") != -1) {
    filePath = 'dist' + req.url;
  }
  if (cache[filePath]) {
    sendFile(res, filePath, cache[filePath]); // 从内存中返回文件
  } else {
    fs.exists(filePath, function (exists) {
      if (exists) {
        try {
          const files = fs.readFileSync(filePath) // 同步
          cache[filePath] = files;
          sendFile(res, filePath, files);
        } catch (e) {
          send404(res);
        }
        // fs.readFile(filePath,function(err,data){ // 异步从硬盘中读取文件
        //   if(err){
        //     send404(res);
        //   }else{
        //     cache[filePath] = data;
        //     sendFile(res,filePath,data); // 从硬盘中读取文件并返回
        //   }
        // })
      } else {
        send404(res);
      }
    });
  }
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})

var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });
wss.on('connection', function (ws) {
  console.log('client connected');
  ws.on('message', function (message) {
    console.log(message, "getmessage");
    if (message === "1") {
      let num = 0;
      const timer = setInterval(() => {
        if (Number(num) >= 10) {
          ws.send('time out');
          clearInterval(timer);
          return false;
        }
        num++;
        ws.send(JSON.stringify(num));
      }, 1000);
    }
  });
});

module.exports = app;
