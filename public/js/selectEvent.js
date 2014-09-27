/**
 *
 * @desc 事件查询
 * 
 * 
 */

$(function() {

  var curPage = 1
    , perCount = 10;

  var param = {};

  var oPage = {

    init : function() {
      this.view();
      this.listen();
    },

    view : function() {
      this.getTypeConfig();
      this.getEventsByPage();
    },

    listen : function() {
      var self = this;
      $('#selectEventForm').on('submit',  function() {
        var param = {
            userName : $('input[name=userName]').val()
          , type : $('#type').val()
          , startTime : $('input[name=startTime]').val()
          , endTime : $('input[name=endTime]').val()
        }
        self.getEventsByPage(curPage);

        return false;
      });

      $('button[name=all]').on('click', function() {
        var $this = $(this);
        $this.prev().val('不限')
      });

    },

    getTypeConfig : function() {
      $.ajax('/data/config/getType',{'type':'GET','async' : false}).done(function(data) {
        if(data['code'] == '0') {
          var type = {}, gameType = {}, data = data['data'];
          for(var i=0,len=data.length; i<len; i++) {
            if(data[i]['which'] == 'type') {
              type[data[i]['value']] = data[i];
            }else if(data[i]['which'] == 'gameType') {
              gameType[data[i]['value']] = data[i];
            }
          }
          var sHtmlType = '<option value="0">不限</option>'
          , sHtmlGameType = '<option value="0">不限</option>';
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


    getEventsByPage : function() {
      var condition = {}, self = this;
      var param = {
        'start' : (curPage - 1)*10,
        'count' : 10
      }

      //客服人员
      if($('input[name=userName]').val() != '不限' && $('input[name=userName]').val().replace(/\s+/g,'') != ''  ) {
        param['userName'] = $('input[name=userName]').val();
      }

      //开始时间
      if($('input[name=startTime]').val() != '不限' && $('input[name=startTime]').val().replace(/\s+/g,'') != ''  ) {
        param['startTime'] = $('input[name=startTime]').val();
      }

      //结束时间
      if($('input[name=endTime]').val() != '不限' && $('input[name=endTime]').val().replace(/\s+/g,'') != ''  ) {
        param['endTime'] = $('input[name=endTime]').val();
      }

      //QQ
      if($('input[name=qq]').val() != '不限' && $('input[name=qq]').val().replace(/\s+/g,'') != ''  ) {
        param['qq'] = $('input[name=qq]').val();
      }

      //事件分类
      if($('#type').val() != '0') {
        param['type'] = $('#type').val();
      }

      //游戏直播
      if($('#gameType').val() != '0') {
        param['gameType'] = $('#gameType').val(); 
      }

      console.log(param);

      $.ajax('/data/event/getEventsByPage',{'type':'GET','data' : param}).done(function(data) {
        if(data['code'] == '0') {
          self.renderData(data['data']);
        }
      });
    },


    renderData : function(data) {
      var sHtml = '';
      $('#pagination').removeClass('hidden')
      if(data.length < 1) {
        sHtml = '<tr class="gradeA.odd"><td colspan="11" style=" text-align: center; color: #999; ">暂无数据</td></tr>' 
        $('#pagination').addClass('hidden')
      }else{
        for(var i=0; i<data.length; i++) {
          if(i%2 == 0) {
            sHtml += '<tr class="gradeA odd">'
          }else{
            sHtml += '<tr class="gradeA even">'
          }
          sHtml += '<td>'+data[i]['userName']+'</td>'
          +'<td>'+ConfigType[data[i]['type']]+'</td>'
          +'<td>'+data[i]['eventDesc']+'</td>'
          +'<td>'+data[i]['solution']+'</td>'
          +'<td>'+data[i]['qq']+'</td>'
          +'<td>'+data[i]['otherDesc']+'</td>'
          +'<td>'+ConfigGameType[data[i]['gameType']]+'</td>'
          +'<td>'+data[i]['address']+'</td>'

          var network = networkType[data[i]['network']];
          if(network) {
            sHtml += '<td>'+network+'</td>'
          }else{
            sHtml += '<td>'+data[i]['network']+'</td>'
          }

          sHtml += '<td>'+format(data[i]['time'],'yyyy-MM-dd hh:mm:ss')+'</td>'
          +'<td class="taskOptions"><a href="/views/event/updateEvent?eventId='+data[i]['id']+'" class="tip-top" data-original-title="更新"><i class="icon-pencil"></i></a></td>'
        }
      }
      $('#container').html(sHtml);
    }

  }

  oPage.init();

})