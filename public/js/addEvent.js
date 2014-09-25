/**
 *
 * @desc 增加事件
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
      $('#settingsForm').on('submit',  function() {
        if($('.control-group').hasClass('error')) return false;
        
        var name = $('input[name=name]').val()
        ,  account = $('input[name=account]').val()
        ,  password = $('input[name=pwdAgain]').val();
        
        $.ajax('/data/user/update',{'type':'POST','data' : {'account' : account, 'password' : password, 'name' : name}}).done(function(data) {
          if(data['code'] == '0') {
            $('#settingsTip').find('span').text('修改成功！').end().removeClass('hidden').addClass('alert-success');
          }else{
            $('#settingsTip').find('span').text('修改失败，请稍后重试！').end().removeClass('hidden').addClass('alert-error');
          }
          setTimeout(function() {
            window.location.href = window.location.href;
          },1000);
        });

        return false;
      });

      //验证账号是否存在
      $('input[name=account]').on('blur', function() {
        var account = $(this).val(), $this = $(this);
        $.ajax('/data/user/accountCheck',{'type':'GET','data' : {'account' : account}}).done(function(data) {
          if(data['code'] == '0') {
            $this.parents('.control-group').removeClass('error');
            $this.next().text('')
          }else{
            $this.parents('.control-group').addClass('error');
            $this.next().text('此号已存在！')
          }
        });
      });

      //验证两次密码是否一样
      $('input[name=pwdAgain]').on('blur', function() {
        var password = $('input[name=password]').val()
          , pwdAgain = $(this).val();
          console.log(password , pwdAgain)
        if(password == pwdAgain) {
          $(this).parents('.control-group').removeClass('error');
          $(this).next().text('')
        }else{
          $(this).parents('.control-group').addClass('error');
          $(this).next().text('两次密码不一致')
        }
      });

      //重置按钮
      $('button[type=reset]').on('click', function() {
        $('.control-group').removeClass('error');
      });


    }

  }

  oPage.init();

})