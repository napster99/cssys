/**
 *
 * @desc Node.js 路由
 * 
 * 
 */
var querystring = require('querystring');
var requireFiles = require('./requireFiles');
var url = require('url');
var db = require('../modules/db.js');

function Route(app) {
  this.app = app || {};
  this.init.call(this);
}


Route.prototype.init = function() {
  var that = this;

  //session 过期,重新登录
  this.app['get']('*',  function(req, res, next) {
    if( (req.url === '/' || /^\/views/.test(req.url)) && !req.session.user) {
      res.render('login',{'cur' : 'login'});
    }else{
      next();
    }
  });
  
  //for views
  this.app['get']('/',  function(req, res, next) {
    requireFiles['controllers']['index']['index_view'](req, res);
  });
  
  this.app['get']('/views/:controller/:action', function(req, res, next) {
    var controller = req.params['controller'];
    var action = req.params['action']+'_view';
    if(!controller || !action) {
      res.send('Require Params!');
    }
    if(typeof requireFiles['controllers'][controller][action] !== 'function') {
      res.send('Not Found Views!'); 
    }
    requireFiles['controllers'][controller][action](req, res);
  });

  //for models
  ['get', 'post', 'put', 'patch', 'delete', 'del', 'all'].forEach(function(method) {
    that.app[method]('/data/:controller/:action',function(req, res) {
      that.resolution(req, res);
    });
  });
}

Route.prototype.isEmptyObject = function(o) {
  for(var n in o) {
    return false;
  } 
  return true;
}

Route.prototype.resolution = function(req, res) {
  // var url = req.originalUrl;
  var controller = req.params['controller'];
  var action = req.params['action'] + '_data';
  var options = {};
  
  if(!this.isEmptyObject(req.body)) {
    options = req.body;
  }else{
    options = querystring.parse(url.parse(req.url).query);
  }
  options['req'] = req;
  options['res'] = res;
  
  if(typeof requireFiles['controllers'][controller][action] === 'function') {
    // delete options['callback'];
    requireFiles['controllers'][controller][action](options,function(err,result) {
      
      if(!err) {
        res.json({
          'code' : '0'
          ,'message' : 'success'
          ,'data' : result
        });
      } else {
        res.json({
          'code' : '1'
          ,'message' : 'failure'
        });
      }
    });
  }else {
    res.send('Invalid Action!');
  }
}


module.exports = Route;