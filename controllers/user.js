/**
 *
 * @desc 控制器--用户
 * 
 * 
 */
var userModule = require('../modules/user');

var userModuleObj = new userModule();


//个人设置
exports.settings_view = function(req, res) {
  res.render('settings',{
      'cur' : 'settings'
    , 'userName' : req.session.user['name']
    , 'userAccount' : req.session.user['account']
    , 'userPwd' : req.session.user['password']
  });
}



//添加客服
exports.addUser_view = function(req, res) {
  res.render('addUser',{
      'cur' : 'addUser'
    , 'userName' : req.session.user['name']
    , 'userAccount' : req.session.user['account']
    , 'userPwd' : req.session.user['password']
  });
}

//添加客服 提交
exports.addUser_data = function(opts, callback) {
  userModuleObj.add(opts, function(err, result) {
    if(err) {
      callback(err,{});
    }else{
      callback(null);
    }
  });
}

//账号验证
exports.accountCheck_data = function(opts, callback) {
  userModuleObj.accountCheck(opts, function(err, result) {
    if(err) {
      callback(err,{});
    }else{
      if(result.length > 0 && opts['account'] != opts['req']['session']['user']['account']) {
        callback(true);
      }else{
        callback(null);
      }
    }
  });
}


//账号验证 全新
exports.accountCheckOther_data = function(opts, callback) {
  userModuleObj.accountCheck(opts, function(err, result) {
    if(err) {
      callback(err,{});
    }else{
      if(result.length > 0 ) {
        callback(true);
      }else{
        callback(null);
      }
    }
  });
}

//个人资料更新
exports.update_data = function(opts, callback) {
  var user = {
      'name' : opts['name']
    , 'account' : opts['account']
    , 'password' : opts['password']
    , 'id' : opts['req']['session']['user']['id']
  }

  userModuleObj.upd(user, function(err, result) {
    if(err) {
      callback(err, {});
    }else{
      //同时更新session
      if(opts['req']['session']['user']) {
        opts['req']['session']['user']['name'] = opts['name'];
        opts['req']['session']['user']['account'] = opts['account'];
        opts['req']['session']['user']['password'] = opts['password'];
      }else{
        opts['res'].render('login',{'cur' : 'login'});
      }
      callback(false,{});
    }
  });
}

//登录页面
exports.login_view = function(req, res) {
  res.render('login',{'cur' : 'login'});
}

//提交登录
exports.login_data = function(opts, callback) {
  userModuleObj.sel(opts, function(err, result) {
    if(err) {
      callback(err,{});
    }else{
      //设置session
      opts['req']['session'].user = result[0];
      if(result.length > 0) {
        callback(null);
      }else{
        callback(true);
      }
    }
  });

}

//提交登出
exports.logout_data = function(opts, callback) {
  delete opts['req']['session'].user;
  opts['res'].render('login',{'cur' : 'login'});
}