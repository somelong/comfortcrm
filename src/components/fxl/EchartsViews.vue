<template>
  <div id="mainView">
  </div>
</template>

<script>
  import echarts from 'echarts'
    export default {
      name: "echarts-views",
      data () {
        return {
          charts: '',
          opinion:['沙发','桌几','椅凳','柜架','灯具','床·床品','家纺','装饰','餐具'],
          opinionData:[
            {
              value:1230,
              name:'沙发',
              itemStyle: {
                // 设置扇形的颜色
                color: '#FFFF99',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            {
              value:2000,
              name:'桌几',
              itemStyle: {
                // 设置扇形的颜色
                color: '#FFCC99',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            {
              value:2566,
              name:'椅凳',
              itemStyle: {
                // 设置扇形的颜色
                color: '#CCFFFF',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            {
              value:1350,
              name:'柜架',
              itemStyle: {
                // 设置扇形的颜色
                color: '#FFFF99',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            {
              value:1548,
              name:'灯具',
              itemStyle: {
                // 设置扇形的颜色
                color: '#CCCCFF',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            {
              value:1548,
              name:'床·床品',
              itemStyle: {
                // 设置扇形的颜色
                color: '#FFCC99',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            {
              value:1548,
              name:'家纺',
              itemStyle: {
                // 设置扇形的颜色
                color: '#CCFF99',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            {
              value:1548,
              name:'装饰',
              itemStyle: {
                // 设置扇形的颜色
                color: '#CCCCCC',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            {
              value:4500,
              name:'餐具',
              itemStyle: {
                // 设置扇形的颜色
                color: '#FF9966',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            }
          ]
        }
      },
      methods:{
        drawPie(id){
          this.charts = echarts.init(document.getElementById(id));
          this.charts.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a}<br/>{b}:{c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data:this.opinion
            },
            series: [
              {
                name:'销量',
                // roseType: 'angle',
                type:'pie',
                // roseType: 'angle',
                // radius:['50%','70%'],
                radius: '55%',  /*控制图形形状的*/
                itemStyle: {
                  // 设置扇形的颜色
                  color: '#CCCCFF',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'blod'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:this.opinionData
              }
            ]
          })
        }
      },
      //调用
      mounted(){
        console.log("创建表格视图");
        this.$nextTick(function() {
          this.drawPie('mainView')
        })
      }
    }
</script>

<style scoped>
  #mainView{
    width: 600px;
    height: 400px;
  }

  /*@media screen and (max-width: 1910px) {*/
    /*#mainView {*/
      /*width: 300px;*/
      /*height: 150px;*/
    /*}*/
  /*}*/
</style>
