/**
 *
 * @desc 控制器--用户
 * 
 * 
 */
var userModule = require('../modules/user');

var userModuleObj = new userModule();

//提交登录
exports.login_data = function(opts, callback) {
  console.log('提交登录')
  console.log(opts)
  userModuleObj.sel(opts, callback);
  
}