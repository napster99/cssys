/*
* jquery 分页插件
*/
+function ($) { "use strict";

  // Pagination CLASS DEFINITION
  // =========================
  var Pagination = function (element, options) {
    this.$element = $(element);
    this.options = options;
    this.init();
  }

  Pagination.DEFAULTS = {
    count: 0  // 总数
  , prePage: 7 // 每页几条
  , curPage: 1  // 当前第几页
  , onPageChange: null // 点击回调
  , ellipseText: '...'
  };

  Pagination.prototype = {
    init: function(){
      this.view();
      this.bindEvent();
    }
  , view: function(){
      this.renderPages();
      // this.options.onPageChange.call(this,1)
    }

  , bindEvent: function(){
      var self = this;
      this.$element.on('click', 'li', function() {
        var index = $(this).attr('index');
        switch(index){
          case 'index':
            self.options.curPage = 1;
            self.options.onPageChange(1);
            break;
          case 'prev':
            self.options.curPage = (--self.options.curPage == 0)?1 : self.options.curPage;
            self.options.onPageChange(self.options.curPage);
            break;
          case 'next':
            self.options.curPage = (++self.options.curPage ==(self.options.count+1))?self.options.count : self.options.curPage;
            self.options.onPageChange(self.options.curPage);
            break;
          case 'last':
            self.options.curPage = self.options.count;
            self.options.onPageChange(self.options.count);
            break;
          case 'morenext':
            self.options.curPage = (self.options.curPage+self.options.prePage)<=self.options.count?(self.options.curPage+self.options.prePage) : self.options.count;
            self.options.onPageChange(self.options.curPage);
            break;
          case 'moreprev':
            self.options.curPage = (self.options.curPage-self.options.prePage)>=1?self.options.curPage-self.options.prePage : 1;
            self.options.onPageChange(self.options.curPage);
            break;
          default :
            self.options.curPage = index;
            self.options.onPageChange(index);
            break;
        }

        self.renderPages();
      });
    }

  , renderPages : function() {
      var i=1,html='', n = Math.ceil(this.options.count/this.options.prePage);

      for(i; i<n+1; i++) {
        if(this.options.curPage <= i*this.options.prePage && this.options.curPage > (i-1)*this.options.prePage){
          break;
        }
      }
      var html = '<li index="index" ><a href="javascript:;" >首页</a></li>';
      
      if(i != 1){
        html += '<li index="prev"><a href="javascript:;" >&lt;</a></li>';
        html += '<li index="moreprev"><a href="javascript:;" >'+this.options.ellipseText+'</a></li>';
      } 
      if(this.options.count%this.options.prePage != 0) {       
        if(i == n) {  //最后一个阶段
          for(var k=(i-1)*this.options.prePage+1; k<=this.options.count; k++ ) {
            html += '<li index="'+k+'"><a href="javascript:;" >'+k+'</a></li>';
          }
        }else{
          for(var k=(i-1)*this.options.prePage+1; k<this.options.prePage*i+1; k++ ) {
            html += '<li index="'+k+'" ><a href="javascript:;" >'+k+'</a></li>';
          }
        }   
      }else{      
        for(var k=(i-1)*this.options.prePage+1; k<this.options.prePage*i+1; k++ ) {
          html += '<li index="'+k+'" ><a href="javascript:;" >'+k+'</a></li>';
        }
      }
      if(i != n && n>1){
        html += '<li index="morenext" ><a href="javascript:;" >'+this.options.ellipseText+'</a></li>';
        html += '<li index="next" ><a href="javascript:;" >&gt;</a></li>';
      }
      html += '<li index="last" ><a href="javascript:;" >末页</a></li>';

      this.$element.html(html).find('li[index='+this.options.curPage+']').html('<span>'+this.options.curPage+'</span>').addClass('active');

    }

  };

  // pagination PLUGIN DEFINITION
  // ==========================

  var old = $.fn.pagination;

  $.fn.pagination = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('pagination')
        , options = $.extend({}, Pagination.DEFAULTS, $this.data(), typeof option == 'object' && option);
        
      $this.data('pagination', (data = new Pagination(this, options)))
    })
  }

  $.fn.pagination.Constructor = Pagination;

  // pagination NO CONFLICT
  // ====================

  $.fn.pagination.noConflict = function () {
    $.fn.pagination = old
    return this
  };

  if(typeof define === 'function' &&  define.amd ) {
    define(function() {
      return Pagination;
    })
  }

}(window.jQuery);

