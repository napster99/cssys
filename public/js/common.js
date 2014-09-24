/**
 *
 * @desc 公共JS
 * 
 * 
 */


function getParam(B, E) {
  var params = null;
  if (typeof E == "undefined") {
    E = null
  }
  if (null == params) {
    params = [];
    if (location.search.length > 0) {
      var C = decodeURIComponent(location.search).substr(1)
        .split("&");
      for (var D = 0; D < C.length; ++D) {
        var A = C[D].split("=");
        params[A[0]] = A[1]
      }
    }
  }
  return (typeof params[B] == "undefined") ? E : params[B]
}



function format(time, format) {
  var date = new Date(time);

  var o = {
    "M+": date.getMonth() + 1, //month 
    "d+": date.getDate(), //day 
    "h+": date.getHours(), //hour 
    "m+": date.getMinutes(), //minute 
    "s+": date.getSeconds(), //second 
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter 
    "S": date.getMilliseconds() //millisecond 
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;

}

Date.prototype.format = format;