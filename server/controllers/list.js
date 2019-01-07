const list = require('../models/list.js');
// const jwt = require('koa-jwt'); // 引入koa-jwt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUserlist = async (ctx, next) =>{
    const id = ctx.params.id; // 获取url里传过来的参数里的id
    const result = await list.getlistById(id);  // “同步”地返回查询结果
    ctx.body = {
        list:result,
        success: true
    } // 将请求的结果放到response的body里返回
}

const createlistAuth = async (ctx, next) =>{
    const data = ctx.request.body; // 获取post里传过来的body里的data
    const result = await list.createlist(data);
    ctx.body = {
        success: true
    }
}

const deleteUserlist = async (ctx, next) =>{
    const id = ctx.params.id; // 获取url里传过来的参数里的id
    const result = await list.removeList(id);  // “同步”地返回查询结果
    console.log("result:",result);
    ctx.body = {
        success: true
    } // 将请求的结果放到response的body里返回
}

const updataUserlist = async (ctx, next) =>{
    const data = ctx.request.body; // 获取url里传过来的参数里的id
    const result = await list.updataList(data);  // “同步”地返回查询结果
    if(result == true){
        ctx.body = {
            success: true
        } // 将请求的结果放到response的body里返回
    }else{
        ctx.body = {
            success: false,
            info:result.name
        } // 将请求的结果放到response的body里返回
    }
}

module.exports = {
    getUserlist, // 把获取用户列表的方法暴露出去 
    createlistAuth,
    deleteUserlist,
    updataUserlist
}