/**
 *
 * @desc Node.js 控制器
 * 
 * 
 */


//首页视图
exports.index_view = function(req, res) {
  res.render('index',{'cur' : 'home'});
}

//增加事件
exports.addEvent_view = function(req, res) {
  res.render('addEvent',{'cur' : 'event'});
}

//编辑事件
exports.updateEvent_view = function(req, res) {
  res.render('updateEvent',{'cur' : 'event'});
}

//查询事件
exports.selectEvent_view = function(req, res) {
  res.render('selectEvent',{'cur' : 'event'});
}

//个人设置
exports.settings_view = function(req, res) {
  res.render('settings',{'cur' : 'settings'});
}

//登录页面
exports.login_view = function(req, res) {
  res.render('login',{'cur' : 'login'});
}
