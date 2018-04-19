<template>
  <el-row class="tac">
    <el-col :span="24">
      <div class="logoDiv">
        <img src="../src/assets/logo.png" alt="">
      </div>
      <el-menu
        :router="true"
        default-active="1"
        class="el-menu-vertical-demo"
        >

        <el-menu-item index="index">
          <i class="iconfont icon-shouye"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-menu-item index="/GoodTable">
          <i class="iconfont icon-mingxi"></i>
          <span slot="title">产品管理</span>
        </el-menu-item>

        <el-menu-item index="3">
          <i class="iconfont icon-jiaoseguanli"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>

        <el-menu-item index="4">
          <i class="iconfont icon-mingxi"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>

        <el-menu-item index="Comment">
          <i class="iconfont icon-jpgwenjian"></i>
          <span slot="title">晒单管理</span>
        </el-menu-item>

        <el-menu-item index="hotToPic">
          <i class="iconfont icon-jintian"></i>
          <span slot="title">热点管理</span>
        </el-menu-item>

        <el-menu-item index="xyc">
          <i class="iconfont icon-renwuguanli"></i>
          <span>首页管理</span>
        </el-menu-item>

        <el-menu-item index="Message">
          <i class="iconfont icon-quanxianshezhi"></i>
          <span slot="title">消息管理</span>
        </el-menu-item>

        <el-menu-item index="Discount">
          <i class="iconfont icon-quanxianshezhi"></i>
          <span slot="title">优惠管理</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  // import
    export default {
        name: "left-nav",
    }
</script>

<!--<link rel="stylesheet" type="text/css" href="../src/assets/fonts/iconfont.css">-->
<style scoped>
  @import "../src/assets/fonts/iconfont.css";
  .morinel{
    border-radius: 20px;
    margin: 5px 0;
  }
  .logoDiv{
    margin: 10px 0 30px;
  }
  .logoDiv img{
    max-width: 160px;
  }
</style>
