/**
 *
 * @desc 登录
 * 
 * 
 */
$(function() {

  var oPage = {

    init : function() {
      this.view();
      this.listen();
    },

    view : function() {
      
    },

    listen : function() {
      var self = this;
      $('#loginForm').on('submit',  function() {
        var account = $('input[name=account]').val()
        ,  password = $('input[name=password]').val();
        $.ajax('/data/user/login',{'type':'POST','data' : {'account' : account, 'password' : password}}).done(function(data) {
          self.resolveBackFun(data);
        });

        return false;
      })

      $('button[type=reset]').on('click', function() {
        $('#failTip').addClass('hidden');
      });


    },

    resolveBackFun : function(data) {
      if(data['code'] == '0') {
        //登录成功
        $('#loginForm,#failTip').addClass('hidden');
        $('#enterSys').removeClass('hidden');
        $('#processBar').animate({'width' : '100%'},function() {
          window.location.href = '/views/index/index';
        });


      }else{
        //登录失败
        $('#failTip').removeClass('hidden')


      }
    }

  }

  oPage.init();

})