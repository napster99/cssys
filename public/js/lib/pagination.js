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
      this.$element.on('click', 'a', function() {
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
      var html = '<a index="index" class="first ui-corner-tl ui-corner-bl fg-button ui-button ui-state-default" href="javascript:;" >首页</a>';
      
      if(i != 1){
        html += '<a index="prev" class="previous fg-button ui-button ui-state-default ui-state-disabled" href="javascript:;" >&lt;</a>';
        html += '<a class="previous fg-button ui-button ui-state-default ui-state-disabled" index="moreprev" href="javascript:;" >'+this.options.ellipseText+'</a>';
      } 
      if(this.options.count%this.options.prePage != 0) {       
        if(i == n) {  //最后一个阶段
          for(var k=(i-1)*this.options.prePage+1; k<=this.options.count; k++ ) {
            html += '<a index="'+k+'" class="fg-button ui-button ui-state-default" href="javascript:;" >'+k+'</a>';
          }
        }else{
          for(var k=(i-1)*this.options.prePage+1; k<this.options.prePage*i+1; k++ ) {
            html += '<a index="'+k+'" class="fg-button ui-button ui-state-default" href="javascript:;" >'+k+'</a>';
          }
        }   
      }else{      
        for(var k=(i-1)*this.options.prePage+1; k<this.options.prePage*i+1; k++ ) {
          html += '<a index="'+k+'" class="fg-button ui-button ui-state-default" href="javascript:;" >'+k+'</a>';
        }
      }
      if(i != n && n>1){
        html += '<a index="morenext" class="fg-button ui-button ui-state-default" href="javascript:;" >'+this.options.ellipseText+'</a>';
        html += '<a index="next" class="fg-button ui-button ui-state-default" href="javascript:;" >&gt;</a>';
      }
      html += '<a index="last" class="first ui-corner-tl ui-corner-bl fg-button ui-button ui-state-default" href="javascript:;" >末页</a>';

      this.$element.html(html).find('a[index='+this.options.curPage+']').html(this.options.curPage).addClass('ui-state-disabled');

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

