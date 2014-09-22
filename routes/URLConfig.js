/**
 *
 * @desc Node.js 路由 配置
 * 
 * 
 */

 module.exports = {
  'Controller' : [''],
  'Action' : {
     '/' : {'url' : '/', 'controller' : 'index', 'type' : 'get'}
    ,'/addUser' : {'url' : '/addUser', 'controller' : 'user', 'type' : 'post'}
    ,'/getUser' : {'url' : '/getUser', 'controller' : 'user', 'type' : 'get'}
  }
 }