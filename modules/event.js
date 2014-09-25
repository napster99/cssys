/**
 *
 * @desc 事件相关
 * 
 * 
 */

var db = require('./db');
var common = require('../routes/common');

function EventModel() {
  this.db = db;
}

// create table event
// (
//   id int(4) auto_increment not null primary key, 
//   userName char(50) not null, 
//   type int(4) , 
//   eventDesc varchar(50),
//   solution varchar(50),
//   qq varchar(50),
//   otherDesc varchar(50),
//   gameType int(4),
//   address varchar(50),
//   network varchar(50),
//   time  datetime  not null
// )ENGINE=InnoDB DEFAULT CHARSET=utf8;


//增加
EventModel.prototype.add = function(opts, callback) {
  this.db.getConnection(function(err, connection) {
    var data = {
        name : opts['name']
      , account : opts['account']
      , password : opts['password']
      , role : opts['role'] || 1  //1 普通  2管理员
      , joinTime : common.format(new Date, 'yyyy-MM-dd hh:mm:ss')
    }
    connection.query('insert into event SET ?', data, function(err, result) {  
      console.log(result);
      callback(err, result);
    });  
  });
}

//删除
EventModel.prototype.del = function() {
  
}

//修改 个人资料
EventModel.prototype.upd = function(opts, callback) {
  this.db.getConnection(function(err, connection) {
    connection.query('update event set name = ? , account = ? , password = ? where id = ?',[opts['name'], opts['account'], opts['password'], opts['id']], function(err, rows) {
      callback(err);
    });
  });
}

//查询
EventModel.prototype.sel = function(opts, callback) {
  this.db.getConnection(function(err, connection) {
    var data = 'account="'+opts['account']+'"';
    connection.query('select * from event where account = ? and password = ?', [opts['account'], opts['password']], function(err, result) {  
      callback(err, result);
    });  
  });
}

//验证用户名是否存在
EventModel.prototype.accountCheck = function(opts, callback) {
  this.db.getConnection(function(err, connection) {
    connection.query('select * from event where account = ?', opts['account'],  function(err, result) {
      callback(err, result);
    })
  });
}



module.exports = EventModel;