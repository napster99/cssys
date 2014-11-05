/**
 *
 * @desc 数据库配置
 * 
 * 
 */
var mysql = require('mysql');


/* 创建MySQL连接对象 */
// var connection = mysql.createConnection({
//   host : 'localhost',
//   port: 3307,
//   user : 'root',
//   password : 'root',  
//   database : 'cssys'
// });

// var pool  = mysql.createPool({  
//   host     : 'localhost',
//   port     : 3307,
//   user     : 'root',
//   password : 'root',
//   database : 'cssys',
//   debug    : false
// });

// module.exports = pool;

// connection.connect(function(err) {
//   if(err) {
//     console.log('connection err ' + err);
//   } else {
//     console.log('mysql connection success!');
//   }
// });


var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'cssys',
  password:'root',
  port:3306
});
console.log(conn.connect)
conn.connect();

module.exports = conn;