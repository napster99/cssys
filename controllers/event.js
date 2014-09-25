/**
 *
 * @desc 控制器--事件
 * 
 * 
 */
var eventModule = require('../modules/event');

var eventModuleObj = new eventModule();

//增加事件
exports.addEvent_view = function(req, res) {
  res.render('addEvent',{'cur' : 'event', 'userName' : req.session.user.name});
}

//编辑事件
exports.updateEvent_view = function(req, res) {
  res.render('updateEvent',{'cur' : 'event', 'userName' : req.session.user.name});
}

//查询事件
exports.selectEvent_view = function(req, res) {
  res.render('selectEvent',{'cur' : 'event', 'userName' : req.session.user.name});
}

