/**
 *
 * @desc 控制器--配置
 * 
 * 
 */
var cofnigModule = require('../modules/config');

var cofnigModuleObj = new cofnigModule();

//增加事件
exports.addConfig_data = function(opts, callback) {
  cofnigModuleObj.add(opts, function(err, result) {
    callback(false);
  });
}

//获取类型
exports.getType_data = function(opts, callback) {
  cofnigModuleObj.sel(opts, function(err, result) {
    if(err) {
      callback(err)
    }else{
      callback(false, result)
    }
  });
}

//编辑事件
exports.updateEvent_view = function(req, res) {
  res.render('updateEvent',{'cur' : 'event', 'userName' : req.session.user.name});
}

//查询事件
exports.selectEvent_view = function(req, res) {
  res.render('selectEvent',{'cur' : 'event', 'userName' : req.session.user.name});
}


