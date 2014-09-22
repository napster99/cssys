/**
 *
 * @desc Node.js 路由
 * 
 * 
 */


function Route(app) {
  this.app = app || {};
  this.init.call(this);
}


Route.prototype.init = function() {
  this.app.use(function(req, res, next) {
    console.log(req.url)
  });
}


module.exports = Route;