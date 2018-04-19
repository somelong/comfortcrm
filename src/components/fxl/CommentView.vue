<template >
  <div style="overflow: hidden">
    <el-menu  class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" style="margin-top: -10px">
        <i class="circle el-menu-demo"><i class="el-icon-menu circle_center"></i></i>
        晒单管理
      </el-menu-item>

      <!--<el-radio-group v-model="tabPosition " class="text_right" style=" margin-bottom: 20px;">-->
        <!--<el-radio-button label="top">文本标签1</el-radio-button>-->
        <!--<el-radio-button label="right">文本标签2</el-radio-button>-->
      <!--</el-radio-group>-->
    </el-menu>
    <!--活动的菜单-->
    <!--<el-menu  :default-active="activeIndex" class="el-menu-demo menu_left"  active-text-color="#409EFF" mode="horizontal" @select="handleSelect" :router="true">-->
      <!--<el-menu-item index="1" >空间灵感<span>10</span></el-menu-item>-->

      <!--<el-menu-item index="2">专辑<span>10</span></el-menu-item>-->
      <!--<el-menu-item index="phystore">实体店<span>10</span></el-menu-item>-->
      <!--<el-menu-item index="4">品牌 <span>10</span></el-menu-item>-->
      <!--<el-menu-item index="5" >精选晒单<span>10</span></el-menu-item>-->
      <!--<el-button type="info" class="addNewHotTopPic"><i class="el-icon-plus">新增模块</i></el-button>-->
    <!--</el-menu>-->
     <div id="btnCenter">
      <router-link to="/Comment">
        <el-button :class="{active:qiehuan==1}" @click="longS(1)" type="info" >已审核</el-button>
      </router-link>
      <router-link to="/CUAudited">
        <el-button :class="{active:qiehuan==2}" @click="longS(2)" type="info">未审核</el-button>
      </router-link>
      <span class="search_new_right">
         <el-input  class="el_search" placeholder="请输入内容" prefix-icon="el-icon-search "  style=""></el-input>
         <!--<el-button type="primary"><i class="el-icon-plus">新增</i></el-button>-->
      </span>
    </div>

    <transition mode="out-in"
                enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
    export default {
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1',
          tabPosition: 'top',
          qiehuan:1
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        longS(val){
          this.qiehuan = val;
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/animate.css";

  .circle{
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: rgba(238, 238, 238, 0.73);
    border-radius: 50px;
    border: none;
  }
.circle_center{
  margin-top: -15px;
  margin-left: 3px;
  font-size: 26px;
  border: none;
  color: #409EFF;

}
  .text_right{
    float: right;
    margin-right: 20px;

  }

ul {
    padding-left: 0;
    padding-right: 0;
  }
  .menu_left{
    padding: 0 10px;
  }
  .addNewHotTopPic{
    float: right;
    margin-right: 10px;
  }

  .bgc{
    background-color: rgba(233, 233, 233, 0.1);
  }
  #btnCenter{
    text-align: left;
    padding: 20px 20px;
    background-color: white;
  }
  .el_search{
    width: 300px;
  }
  .search_new_right{
    float: right;
  }
  /*hlr设置=============*/


  .el-main{   /*去掉标签左右的padding间距*/
    padding-left: 00px;
    padding-right: 00px;

  }
  .el-table td{  /*设置表格中列的padding*/
    padding: 2px;
  }
  /*====================*/

  .active{
    background: #409EFF;
    border: none;
  }
</style>
