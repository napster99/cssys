/**
 *
 * @desc 配置相关
 * 
 * 
 */

var db = require('./db');
var common = require('../routes/common');

function ConfigModel() {
  this.db = db;
}

// create table config
// (
//   id int(4) auto_increment not null primary key, 
//   value int(4) not null,
//   name varchar(50),
//   which varchar(50)
// )ENGINE=InnoDB DEFAULT CHARSET=utf8;


//增加
ConfigModel.prototype.add = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    var data = {
        name : opts['name']
      , value : opts['value']
      , which : opts['which']
    }
    this.db.query('insert into config SET ?', data, function(err, result) {  
      callback(err, result);
    });  
  // });
}

//删除
ConfigModel.prototype.del = function() {

}

//修改 个人资料
ConfigModel.prototype.upd = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    this.db.query('update event set name = ? , account = ? , password = ? where id = ?',[opts['name'], opts['account'], opts['password'], opts['id']], function(err, rows) {
      callback(err);
    });
  // });
}

//查询
ConfigModel.prototype.sel = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    this.db.query('select * from config', function(err, result) {  
      callback(err, result);
    });  
  // });
}

//验证用户名是否存在
ConfigModel.prototype.accountCheck = function(opts, callback) {
  // this.db.getConnection(function(err, connection) {
    this.db.query('select * from event where account = ?', opts['account'],  function(err, result) {
      callback(err, result);
    })
  // });
}


module.exports = ConfigModel;