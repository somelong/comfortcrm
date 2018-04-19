<template>
  <div id="main">
  </div>
</template>

<script>
  import echarts from 'echarts'
    export default {
      name: "echarts-view",
      data(){
        return {
          myChart:{},
          dataShadow:[] ,
          dataAxis : [],
          data : [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220],
          yMax : 500,
          zoomSize : 6
        }
      },
      methods:{
        addf(){
          for (let i = 0; i < this.data.length; i++) {
            this.dataShadow.push(this.yMax);
          }
          for(let i = 10;i<30;i++){
            this.dataAxis.push("3月"+i+"日");
          }
        },
        drawPie(id){
          this.myChart = echarts.init(document.getElementById(id));
          this.myChart.setOption({
            title: {
              // text: '特性示例：渐变色 阴影 点击缩放',
              // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
            },
            xAxis: {
              data: this.dataAxis,
              axisLabel: {
                inside: true,
                textStyle: {
                  color: '#fff'
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              z: 10
            },
            yAxis: {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#999'
                }
              }
            },
            dataZoom: [
              {
                type: 'inside'
              }
            ],
            series: [
              { // For shadow
                type: 'bar',
                itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data: this.dataShadow,
                animation: false
              },
              {
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                      ]
                    )
                  },
                  emphasis: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#2378f7'},
                        {offset: 0.7, color: '#2378f7'},
                        {offset: 1, color: '#83bff6'}
                      ]
                    )
                  }
                },
                data: this.data
              }
            ]
          });
          // this.myChart.on("click",function (params) {
          //     console.log(this.dataAxis[Math.max(params.dataIndex - this.zoomSize / 2, 0)]);
          //     this.myChart.dispatchAction({
          //       type: 'dataZoom',
          //       startValue: dataAxis[Math.max(params.dataIndex - this.zoomSize / 2, 0)],
          //       endValue: dataAxis[Math.min(params.dataIndex + this.zoomSize / 2, data.length - 1)]
          //     });
          // })
        }

      },
      //调用
      mounted(){
        this.addf();
        console.log("创建表格视图");
        this.drawPie("main");
      }
    }
</script>

<style scoped>
  #main{
    width: 1000px;
    height: 700px;
  }
  /*@media screen and (max-width: 1910px) {*/
    /*#main {*/
      /*width: 500px;*/
      /*height: 350px;*/
    /*}*/
  /*}*/
</style>
