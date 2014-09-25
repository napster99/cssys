/**
 *
 * @desc Node.js 控制器
 * 
 * 
 */


//首页视图
exports.index_view = function(req, res) {
  res.render('index',{'cur' : 'home', 'userName' : req.session.user.name});
}

