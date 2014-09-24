/**
 *
 * @desc 用户相关
 * 
 * 
 */

var db = require('./db');
var common = require('../routes/common');

function UserModel() {
  this.db = db;
}

// create table user
// (
//   id int(4) auto_increment not null primary key, 
//   name char(50) not null, 
//   account varchar(50) , 
//   password varchar(50),
//   role    int(1) not null default 1, 
//   joinTime  datetime  not null
// )ENGINE=InnoDB DEFAULT CHARSET=utf8;

// alter table user auto_increment =  1000;


//增加
UserModel.prototype.add = function(opts, callback) {
  this.db.getConnection(function(err, connection) {
    var data = {
        name : opts['name']
      , account : opts['account']
      , password : opts['password']
      , role : opts['role'] || 1  //1 普通  2管理员
      , joinTime : common.format(new Date, 'yyyy-MM-dd hh:mm:ss')
    }
    connection.query('insert into user SET ?', data, function(err, result) {  
      console.log(result);
      callback(err, result);
    });  
  });
}

//删除
UserModel.prototype.del = function() {

}

//修改
UserModel.prototype.upd = function() {

}

//查询
UserModel.prototype.sel = function(opts, callback) {
  this.db.getConnection(function(err, connection) {
    var data = 'account="'+opts['account']+'"';
    console.log(opts['account'])
    connection.query('select * from user where account = ?', opts['account'], function(err, result) {  
      console.log(result)
      callback(err, result);
    });  
  });
}

module.exports = UserModel;