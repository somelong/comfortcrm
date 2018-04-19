<template>
  <div style="text-align: center">

    <div class="top">
      <div>
        <h2>系统总览</h2>
      </div>
      <ul>
        <li>
          <div class="blockData">
            <div class="leftText userData">
              <img src="../../assets/1.png" alt="">
              <p>新增用户</p>
            </div>
            <div class="rightText">
              <p>533</p>
            </div>
          </div>
        </li>
        <li>
          <div class="blockData">
            <div class="leftText userData1">
              <img src="../../assets/2.png" alt="">
              <p>销售额</p>
            </div>
            <div class="rightText">
              <p>533</p>
            </div>
          </div>
        </li>
        <li>
          <div class="blockData ">
            <div class="leftText userData2">
              <img src="../../assets/3.png" alt="">
              <p>新增订单</p>
            </div>
            <div class="rightText">
              <p>533</p>
            </div>
          </div>
        </li>
        <li>
          <div class="blockData ">
            <div class="leftText userData3">
              <img src="../../assets/4.png" alt="">
              <p>总销售额</p>
            </div>
            <div class="rightText">
              <p>2000</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <hr>

    <div class="bottom">
      <div class="fromView leftFromView">
        <div>
          <h3>近20日销售情况</h3>
        </div>
        <echars-view></echars-view>
      </div>
      <div class="fromView rightFromView">
        <div>
          <h3>产品销售占比</h3>
        </div>
        <echars-views></echars-views>
      </div>
    </div>

  </div>
</template>

<script>
  import EcharsView from "./EchartsView"
  import EcharsViews from "./EchartsViews"

    export default {
      name: "myindex",
      components:{
        EcharsView:EcharsView,
        EcharsViews:EcharsViews
      }
    }
</script>

<style scoped>
  @import "../../assets/fonts/iconfont.css";
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  h2 h3{
    color: #333;
  }


  /*上面的那块区域*/
  .top{
    min-height: 110px;
    /*outline: 1px red solid;*/
  }
  .top ul{
    text-align: center;
  }
  .top ul li{
    /*float: left;*/
    min-height: 110px;
    width: 22%;
    margin: 30px 1%;
    /*outline: 1px greenyellow solid;*/
    display: inline-block;
    border-radius: 10px;
    overflow: hidden;
    color:white;
  }
  .blockData{

  }
  .leftText{
    padding: 10px;
    float: left;
    width: 40%;
    height: 100%;
    /*background: #FF9966;*/
  }
  .leftText img{
    max-width: 50px;
  }
  .rightText{
    float: left;
    width: 60%;
    height: 100%;
    font-size: 35px;
    font-weight: 600;
    line-height: 110px;
    background: #f0f0f0;
  }
  .rightText p{
    text-shadow: 0 0 10px #b4b4b4;
  }

  hr{
    height: 1px;
    border: none;
    background: rgba(226, 226, 226, 0.69);
    /*box-shadow: 0 0 10px 0 silver;*/
    /*text-align: center;*/
    width: 100%;
    margin: 10px;
  }

  /*下面的那块区域*/
  .bottom{
    overflow: hidden;
    /*outline: 1px blue solid;*/
  }
  .fromView{
    float: left;
  }
  .leftFromView{
    width: 1000px;
  }
  .rightFromView{
    width: 500px;
  }
  /*模块的配色*/
  .userData{
    background: #FFCC99;
  }
  .userData1{
    background: #CCFF99;
  }
  .userData2{
    background: #99CCFF;
  }
  .userData3{
    background: #CCCCFF;
  }
</style>
