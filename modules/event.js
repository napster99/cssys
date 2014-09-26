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

// create table config
// (
//   id int(4) auto_increment not null primary key, 
//   value int(4) not null,
//   name varchar(50),
//   which varchar(50)
// )ENGINE=InnoDB DEFAULT CHARSET=utf8;


//增加
EventModel.prototype.add = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    var data = {
        userName : opts['userName']
      , type : opts['type']
      , eventDesc : opts['eventDesc']
      , solution : opts['solution']
      , qq : opts['qq']
      , otherDesc : opts['otherDesc']
      , gameType : opts['gameType']
      , address : opts['address'] 
      , network : opts['network'] 
      , time : common.format(new Date, 'yyyy-MM-dd hh:mm:ss')
    }
    this.db.query('insert into event SET ?', data, function(err, result) {  
      console.log(result);
      callback(err, result);
    });  
  // });
}

//删除
EventModel.prototype.del = function() {

}

//修改 事件
EventModel.prototype.upd = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    this.db.query('update event set type = ? ,  eventDesc = ? , solution = ?, qq = ?, otherDesc = ? , gameType = ? , address = ?, network = ?  where id = ?',[opts['type'], opts['eventDesc'], opts['solution'], opts['qq'], opts['otherDesc'], opts['gameType'], opts['address'], opts['network'], opts['id']], function(err, rows) {
      callback(err);
    });
  // });
}

//查询
EventModel.prototype.sel = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    var data = 'account="'+opts['account']+'"';
    this.db.query('select * from event where account = ? and password = ?', [opts['account'], opts['password']], function(err, result) {  
      callback(err, result);
    });  
  // });
}

//验证用户名是否存在
EventModel.prototype.accountCheck = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    this.db.query('select * from event where account = ?', opts['account'],  function(err, result) {
      callback(err, result);
    })
  // });
}

//根据Id查询
EventModel.prototype.getEventById = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    this.db.query('select * from event where id = ?', opts['id'], function(err, result) {
      console.log(result)
      callback(err, result);
    });  
  // });
}


//分页查询&条件  select * from event limit 5,2;
EventModel.prototype.getEventsByPage = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    this.db.query('select * from event order by time desc',  function(err, result) {
      console.log(result)
      callback(err, result);
    });
  // });
}


module.exports = EventModel;