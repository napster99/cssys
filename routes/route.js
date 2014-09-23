/**
 *
 * @desc Node.js 路由
 * 
 * 
 */
var requireFiles = require('./requireFiles');
var URLConfig = require('./URLConfig');
var url = require('url');

function Route(app) {
  this.app = app || {};
  this.init.call(this);
}


Route.prototype.init = function() {
  var that = this;
  //for views
  this.app['get']('/',  function(req, res, next) {
    requireFiles['controllers']['index']['index'](req, res);
  });

  this.app['get']('/views/:controller/:action', function(req, res, next) {
    var controller = req.params['controller'];
    var action = req.params['action'];
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


Route.prototype.resolution = function(req, res) {
  // var url = req.originalUrl;
  var controller = req.params['controller'];
  var action = req.params['action'];
  var options = {};
  

  if(!this.isEmptyObject(req.body)) {
    options = req.body;
  }else{
    options = querystring.parse(url.parse(req.url).query);
  }

  if(typeof requireFiles[controller][action] === 'function') {
    // delete options['callback'];
    requireFiles[controller][action](options,function(err,result) {
      
      if(!err) {
        res.json({
          'code' : '1'
          ,'message' : 'success'
          ,'data' : result
        });
      } else {
        res.json({
          'code' : '0'
          ,'message' : 'failure'
        });
      }
    });
  }else {
    res.send('Invalid Action!');
  }
}


module.exports = Route;