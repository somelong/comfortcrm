<template >
  <div>
    <el-menu  class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" style="margin-top: -10px">
        <i class="circle el-menu-demo"><i class="el-icon-menu circle_center"></i></i>
        活动管理
      </el-menu-item>
      <!--<el-radio-group v-model="tabPosition " class="text_right" style=" margin-bottom: 20px;">-->
        <!--<el-radio-button label="top">文本标签1</el-radio-button>-->
        <!--<el-radio-button label="right">文本标签2</el-radio-button>-->
      <!--</el-radio-group>-->
    </el-menu>
    <!--活动的菜单-->
    <el-menu  :default-active=activeIndex class="el-menu-demo menu_left"  active-text-color="#409EFF" mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item index="sented" @click="showModul">空间灵感<span>10</span></el-menu-item>

      <el-menu-item index="special" @click="showModul">专辑<span>10</span></el-menu-item>
      <el-menu-item index="phystore" @click="showModul">实体店<span>10</span></el-menu-item>
      <el-menu-item index="trademark" @click="showModul">品牌 <span>10</span></el-menu-item>
    </el-menu>
    <transition mode="out-in"
                enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <el-main v-show="false">
      <activity-menu ref="activityM"></activity-menu>
    </el-main>

  </div>
</template>

<script>
  import activityMenu from './activityMenu'
    export default {
      data() {
        return {
          activeIndex: 'sented',
          activeIndex2: '1',
          tabPosition: 'top'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);

        },
        showModul(){
          this.$refs.activityM.$emit("bridge","")
        }
      },
      components:{
        activityMenu:activityMenu
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
