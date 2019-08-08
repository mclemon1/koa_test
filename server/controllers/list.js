const list = require('../models/list.js');
// const jwt = require('koa-jwt'); // 引入koa-jwt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {getRes} = require('../config/response');

const getUserlist = async (ctx, next) => {
  const id = ctx.params.id; // 获取url里传过来的参数里的id
	const result = await list.getlistById(id); // “同步”地返回查询结果
  ctx.body = getRes(result) // 将请求的结果放到response的body里返回
}

const createlistAuth = async (ctx, next) => {
  const data = ctx.request.body; // 获取post里传过来的body里的data
	const result = await list.createlist(data);
	let res = {id:result}
  ctx.body = getRes(result,res)
}

const deleteUserlist = async (ctx, next) => {
  const id = ctx.params.id;
  const result = await list.removeList(id); // “同步”地返回查询结果
	ctx.body = getRes(result)
}

const updataUserlist = async (ctx, next) => {
  const data = ctx.request.body;
  const result = await list.updataList(data); // “同步”地返回查询结果
  ctx.body = getRes(result)
}

module.exports = {
  getUserlist, // 把获取用户列表的方法暴露出去 
  createlistAuth,
  deleteUserlist,
  updataUserlist
}
