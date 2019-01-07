const db = require('../config/db.js'), 
      userModel = '../schema/user.js'; // 引入user的表结构
const teatDb = db.teatDb; // 引入数据库

const User = teatDb.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserById = async (id) =>{
    const userInfo = await User.findOne({ // 控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
        where: {
          id: id
        }
      });
    return userInfo // 返回数据
}

const getUserByName = async (name) =>{
    const userInfo = await User.findOne({ // 控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
        where: {
            user_name: name
        }
    });
    return userInfo // 返回数据
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

// var  userGetSql = 'SELECT * FROM user';

// //查 query
// connection.query(userGetSql,function (err, result) {
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
  getUserById,  // 导出getUserById的方法，将会在controller里调用
  getUserByName
}