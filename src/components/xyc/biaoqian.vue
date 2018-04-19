<template >
  <div>
    <el-menu  class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1" style="margin-top: -10px">
      <i class="circle el-menu-demo"><i class="el-icon-menu circle_center"></i></i>
      首页管理
    </el-menu-item>
    </el-menu>
    <!--<el-menu-->
      <!--:default-active=activeIndex-->
      <!--class=""-->
      <!--active-text-color="#409EFF" mode="horizontal"  :router="true">-->
      <!--<el-menu-item index="banxq">bananer</el-menu-item>-->

      <!--<el-menu-item index="cpxq" >产品详情</el-menu-item>-->
      <!--<el-menu-item index="rdxq" >热点详情</el-menu-item>-->

      <!--<el-menu-item index="std" >实体店</el-menu-item>-->
    <!--</el-menu>-->



    <!--活动的菜单-->
    <el-menu
      :default-active=activeIndex
      class="menu_left"
      active-text-color="#409EFF"
      mode="horizontal"
      @select="handleSelect"
      :router="true">
      <el-menu-item index="banxq">bananer</el-menu-item>
      <el-menu-item index="cpxq">产品详情</el-menu-item>
      <el-menu-item index="rdxq" >热点详情</el-menu-item>
      <el-menu-item index="std" >实体店</el-menu-item>
      <!--<router-link to="/addbanan">-->
      <!--<el-button class="addNewHotTopPic" ><i class="el-icon-plus" >新增</i></el-button>-->
      <!--</router-link>-->
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: 'sented1',
        activeIndex2: '1',
        tabPosition: 'top'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components:{
//      activityMenu:activityMenu
    }
  }
</script>

<style scoped>
  .circle{
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: rgba(220, 220, 220, 0.73);
    border-radius: 50px;
  }
  .circle_center{
    margin-top: -15px;
    margin-left: 3px;
    font-size: 26px;
    color: #409EFF;

  }
  .text_right{
    float: right;
    margin-right: 20px;

  }

  ul {
    padding-left: 00px;
    padding-right: 00px;
  }
  .menu_left{

    padding: 0 10px;
  }
  .addNewHotTopPic{
    float: right;
    margin-right: 10px;
  }
</style>
