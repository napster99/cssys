/**
 *
 * @desc Node.js 导入文件
 * 
 * 
 */

var path = require("path")
  , fs = require("fs")
  , modelsPath =  path.resolve(path.normalize( __dirname ),'../modules')
  , controllersPath =  path.resolve(path.normalize( __dirname ),'../controllers')
  , models = {}
  , controllers = {};

// 获取所有models
var modelsFiles = fs.readdirSync(modelsPath)
  , controllersFiles = fs.readdirSync(controllersPath)
  , basename;

for( var i = 0, len = modelsFiles.length; i < len; i++ ){
  basename = path.basename(modelsFiles[i], '.js');
  models[basename] = require(modelsPath + '/' + basename);
}


for( var i = 0, len = controllersFiles.length; i < len; i++ ){
  basename = path.basename(controllersFiles[i], '.js');
  controllers[basename] = require(controllersPath + '/' + basename);
}


exports.models = models;
exports.controllers = controllers;