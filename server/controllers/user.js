const user = require('../models/user.js');
// const jwt = require('koa-jwt'); // 引入koa-jwt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const getUserInfo = function* (){
//   const id = this.params.id; // 获取url里传过来的参数里的id
//   const result = yield user.getUserById(id);  // 通过yield “同步”地返回查询结果
//   this.body = result // 将请求的结果放到response的body里返回
// }

const getUserInfo = async (ctx, next) =>{
    const id = ctx.params.id; // 获取url里传过来的参数里的id
    const result = await user.getUserById(id);  // “同步”地返回查询结果
    ctx.body = result // 将请求的结果放到response的body里返回
}

const postUserAuth = async (ctx, next) =>{
    const data = ctx.request.body; // 获取post里传过来的body里的data
    const userInfo = await user.getUserByName(data.name);
    if(userInfo != null){ // 如果查无此用户会返回null
        console.log(bcrypt.hashSync(data.password,bcrypt.genSaltSync(10)));
        if(userInfo.password != data.password){
            ctx.body = {
                success: false, // success标志位是方便前端判断返回是正确与否
                info: '密码错误！'
            }
        }else{ // 如果密码正确
            const userToken = {
                name: userInfo.user_name,
                id: userInfo.id
            }
            const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断token合法性的标志
            // const token = jwt.sign(userToken,secret); // 签发token
            const token = jwt.sign(userToken, secret)
            ctx.body = {
                success: true,
                token: token, // 返回token
            }
        }
    }else{
        ctx.body = {
            success: false,
            info: '用户不存在！' // 如果用户不存在返回用户不存在
        }
    }
}

module.exports = {
  getUserInfo, // 把获取用户信息的方法暴露出去 
  postUserAuth
}