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
      this.getTypeConfig();
    },

    listen : function() {
      var self = this;
      $('#addEventForm').on('submit',  function() {

        var network = $('input[name=network]:checked').val();
        if(network == '5') {
          network = $('input[name=otherNet]').val();
        }
        
        var param = {
            userName : $('input[name=userName]').val()
          , eventDesc : $('input[name=eventDesc]').val()
          , platAccount : $('input[name=platAccount]').val()
          , solution : $('#solution').val()
          , type : $('#type').val()
          , qq : $('input[name=qq]').val()
          , otherDesc : $('#otherDesc').val()
          , gameType : $('#gameType').val()
          , address : $('input[name=address]').val()
          , network : network
        }
        
        $.ajax('/data/event/addEvent',{'type':'POST','data' :param}).done(function(data) {
          if(data['code'] == '0') {
            $('#addEventTip').find('span').text('增加成功！').end().removeClass('hidden').addClass('alert-success');
          }else{
            $('#addEventTip').find('span').text('增加失败，请稍后重试！').end().removeClass('hidden').addClass('alert-error');
          }
          setTimeout(function() {
            window.location.href = window.location.href;
          },1000);
        });

        return false;
      });

      $('input[name=network]').on('click',  function() {
        $('input[name=otherNet]').addClass('hidden').removeAttr('required');
      });

      $('#foo5').on('click',  function() {
        $('input[name=otherNet]').removeClass('hidden').attr('required',true);
      });

    },

    getTypeConfig : function() {
      $.ajax('/data/config/getType',{'type':'GET'}).done(function(data) {
        if(data['code'] == '0') {
          var type = {}, gameType = {}, data = data['data'];
          for(var i=0,len=data.length; i<len; i++) {
            if(data[i]['which'] == 'type') {
              type[data[i]['value']] = data[i];
            }else if(data[i]['which'] == 'gameType') {
              gameType[data[i]['value']] = data[i];
            }
          }
          var sHtmlType = '', sHtmlGameType = '';
          $.each(type, function(key, val) {
            sHtmlType += '<option value="'+val['value']+'">'+val['name']+'</option>'
          });
          $('#type').html(sHtmlType);

          $.each(gameType, function(key, val) {
            sHtmlGameType += '<option value="'+val['value']+'">'+val['name']+'</option>'
          });
          $('#gameType').html(sHtmlGameType);
        }
      });
    }

  }

  oPage.init();

})