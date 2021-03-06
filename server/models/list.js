const db = require('../config/db.js'),
  listModel = '../schema/list.js'; // 引入list的表结构
const teatDb = db.teatDb; // 引入数据库
const {
  dbRes
} = require('../config/response');

const list = teatDb.import(listModel); // 用sequelize的import方法引入表结构，实例化了list。

const getlistById = async (id) => {
  try {
    const listDb = await list.findAll({ // 查找全部的list
      where: {
        user_id: id,
        status: '1'
      },
      attributes: ['id', 'content'] // 只需返回这三个字段的结果即可
    });
    return dbRes({
      _data: listDb,
      _status: true
    }) // 返回数据
  } catch (e) {
    console.log(e);
    return dbRes({
      _status: false,
      _errMsg: e
    })
  }
}

const createlist = async (data) => { // 给某个用户创建一条list
  try {
    let res = await list.create({
      user_id: data.user_id, // 用户的id，用来确定给哪个用户创建
      content: data.content,
      status: data.status
    })
    return dbRes({
      _data: res.dataValues.id,
      _status: true
    })
  } catch (e) {
    console.log(e);
    return dbRes({
      _status: false,
      _errMsg: e
    })
  }
}

const removeList = async (id) => { // 给某个用户删除一条list
  try {
    // await list.destroy({// 删除指定id
    //     where: {
    //         id
    //     }
    // })
    await list.update({
      status: "0"
    }, {
      where: {
        id: id
      }
    })
    return dbRes({
      _status: true
    })
  } catch (e) {
    console.log(e, 'err');
    return dbRes({
      _status: false,
      _errMsg: e
    })
  }
}

const updataList = async (data) => { // 给某个用户修改一条list
  try {
    await list.update({
      content: data.content
    }, {
      where: {
        id: data.id
      }
    })
    return dbRes({
      _status: true
    })
  } catch (e) {
    console.log(e);
    return dbRes({
      _status: false,
      _errMsg: e
    })
  }
}

// var mysql  = require('mysql');  

// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'root',
//   password : '123456',
//   port: '3306',
//   database: 'teat_db',
// }); 

// connection.connect();

// var  listGetSql = 'SELECT * FROM list';

// //查 query
// connection.query(listGetSql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }
//        console.log('---------------SELECT----------------');
//        console.log(result);
//        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'); 

// });

// connection.end();



module.exports = {
  getlistById, // 导出getlistById的方法，将会在controller里调用
  createlist,
  removeList,
  updataList
}
