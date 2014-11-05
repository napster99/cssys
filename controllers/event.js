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


//提交增加事件
exports.addEvent_data = function(opts, callback) {
  eventModuleObj.add(opts, function(err, result) {
    if(err) {
      callback(err,{});
    }else{
      if( result.length > 0 ) {
        callback(true);
      }else{
        callback(null);
      }
    }
  });
}

//编辑事件
exports.updateEvent_view = function(req, res) {
  res.render('updateEvent',{'cur' : 'event', 'userName' : req.session.user.name});
}



//编辑事件
exports.updateEvent_data = function(opts, callback) {
  eventModuleObj.upd(opts, function(err, result) {
    if(err) {
      callback(err,{});
    }else{
      callback(null, result);
    }
  });
}



//查询事件
exports.selectEvent_view = function(req, res) {
  res.render('selectEvent',{'cur' : 'event', 'userName' : req.session.user.name});
}

//查询事件
exports.getEventById_data = function(opts, callback) {
  eventModuleObj.getEventById(opts, function(err, result) {
    if(err) {
      callback(err,{});
    }else{
      callback(null, result);
    }
  });
}


//查询事件 (分页 & 条件)
exports.getEventsByPage_data = function(opts, callback) {
  eventModuleObj.getEventsByPage(opts, function(err, result) {
    if(err) {
      callback(err,{});
    }else{
      callback(null, result);
    }
  });
}

//所有查询事件
exports.getEvents_data = function(opts, callback) {
  eventModuleObj.sel(opts, function(err, result) {
    if(err) {
      callback(err,{});
    }else{
      callback(null, result);
    }
  });
}