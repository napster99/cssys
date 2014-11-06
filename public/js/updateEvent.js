/**
 *
 * @desc 编辑事件
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
      this.getEventById(getParam('eventId'));
    },

    listen : function() {
      var self = this;
      $('#updateEventForm').on('submit',  function() {
        var network = $('input[name=network]:checked').val();
        if(network == '5') {
          network = $('input[name=otherNet]').val();
        }

        var param = {
            id : getParam('eventId')
          ,  userName : $('input[name=userName]').val()
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
        
        $.ajax('/data/event/updateEvent',{'type':'POST','data' :param}).done(function(data) {
          if(data['code'] == '0') {
            $('#updateEventTip').find('span').text('编辑成功！').end().removeClass('hidden').addClass('alert-success');
          }else{
            $('#updateEventTip').find('span').text('编辑失败，请稍后重试！').end().removeClass('hidden').addClass('alert-error');
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
      $.ajax('/data/config/getType',{'type':'GET','async' : false}).done(function(data) {
        console.log('getTypeConfig')
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
    },


    getEventById : function(id) {
      $.ajax('/data/event/getEventById',{'type':'GET','data' : {'id' : id}}).done(function(data) {
        if(data['code'] == '0') {
          $('input[name=eventDesc]').val(data['data'][0]['eventDesc']);
          $('#solution').val(data['data'][0]['solution']);
          $('#type').find('option[value='+data['data'][0]['type']+']')[0].selected = true;
          $('input[name=qq]').val(data['data'][0]['qq']);
          $('#otherDesc').val(data['data'][0]['otherDesc']);
          $('#gameType').find('option[value='+data['data'][0]['gameType']+']')[0].selected = true;
          $('input[name=address]').val(data['data'][0]['address']);
          
          var network = networkType[data['data'][0]['network']];
          if(network) {
            $('input[name=network][value='+data['data'][0]['network']+']')[0].checked = true;
          }else{
            $('input[name=network][value=5]')[0].checked = true;
            $('input[name=otherNet]').val(data['data'][0]['network']).removeClass('hidden');
          }
        }
      });
    }

  }

  oPage.init();

})