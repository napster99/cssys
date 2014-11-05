/**
 *
 * @desc 主页
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
        
      this.getGameType();
      

    },

    listen : function() {
      var self = this;
      
    },

    getGameType : function() {
      var self = this;
      $.ajax('/data/event/getEvents',{'type':'GET'}).done(function(data) {
        if(data['code'] == '0') {
          self.renderGameType(data['data']);
          self.renderEventType(data['data']);
        }
      });
    },

    renderGameType : function(data) {
        var obj = {};
        for(var i=0; i<data.length; i++) {
          if(typeof obj[data[i]['gameType']] != 'number') {
            obj[data[i]['gameType']] = 1;
          }else{
            obj[data[i]['gameType']]++;
          }
        }
        var params = [];
        $.each(obj, function(key, val) {
          params.push([ConfigGameType[key], val]);
        }); 
        
        $('#con1').highcharts({
          chart: {
              type: 'column'
          },
          title: {
              text: '常看游戏直播柱形图'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              type: 'category',
              labels: {
                  rotation: -45,
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: '数量'
              }
          },
          legend: {
              enabled: false
          },
          tooltip: {
              pointFormat: '游戏数量: <b>{point.y} </b>'
          },
          series: [{
              name: 'Population',
              data: params,
              dataLabels: {
                  enabled: true,
                  rotation: -90,
                  color: '#FFFFFF',
                  align: 'right',
                  x: 4,
                  y: 10,
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif',
                      textShadow: '0 0 3px black'
                  }
              }
          }]
      });


    },

    renderEventType : function(data) {
      var obj = {};
      for(var i=0; i<data.length; i++) {
        if(typeof obj[data[i]['type']] != 'number') {
          obj[data[i]['type']] = 1;
        }else{
          obj[data[i]['type']]++;
        }
      }
      var params = [];

      $.each(obj, function(key, val) {
        params.push([ConfigType[key], val]);
      }); 

      $('#con2').highcharts({
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: '问题事件分类统计饼图'
            },
            tooltip: {
                pointFormat: '总数: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: params
            }]
        });
    }

  }

  oPage.init();

})