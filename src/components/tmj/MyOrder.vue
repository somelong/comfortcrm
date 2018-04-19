<template>
  <div class="bgc">
    <div>
      <el-menu class="el-menu-demo head" mode="horizontal">
        <el-menu-item index="1" style="color: #3399FF">
          <i class="circle el-menu-demo"><i class="iconfont icon-mingxi circle_center"></i></i>
          订单管理
        </el-menu-item>
      </el-menu>
      <el-menu :router="true" :default-active="myorderall" class="el-menu-demo middle" mode="horizontal">
        <el-menu-item index="4-1">全部</el-menu-item>
        <el-menu-item index="4-2">待发货</el-menu-item>
        <el-menu-item index="4-3">已发货</el-menu-item>
        <el-menu-item index="4-4">已收货</el-menu-item>
        <span class="search_new_right">
         <el-input  class="el_search" placeholder="请输入内容" prefix-icon="el-icon-search " id="searchValue" @keydown.enter.native="search()"></el-input>
         <el-button type="primary"><i class="el-icon-download" @click="excelget()">导出Excel</i></el-button>
        </span>
      </el-menu>
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
  import all from './MyOrderAll'
  import sent from './MyOrderSent'
  import unfill from './MyOrderUnfill'
  import take from './MyOrderTake'
    export default {
      name:"my-order",
        data(){
          return{
            input21:'',
            myorderall:'4-1',
            listMe:true,
          }
        },
        components: {
          all:all,
          sent:sent,
          unfill:unfill,
          take:take
        },
      methods: {
        // handleEdit(index, row) {
        //   console.log(index, row);
        // },
        // handleDelete(index, row) {
        //   console.log(index, row);
        // }
        search(){
          console.log("按下enter了哟")
          let svalues=$("#searchValue").val();
          // console.log(svalues)
          // this.$emit("bridge",svalues)
        },
        //导出表格方法
        // excelget(){
        //   require.ensure([], () => {
        //     const { export_json_to_excel } = require('../../vendor/Export2Excel');
        //     const tHeader = ['用户ID', '用户名', '用户头像路径', '用户性别','用户生日','用户联系方式','用户微信','用户微博','银行卡号','会员等级','用户经验值'];
        //     const filterVal = ['u_id', 'u_name', 'u_img', 'u_sex','u_birthday','u_phone','ui_weixin','ui_weibo','ui_card','m_grade','m_equity'];
        //     const list = this.tableData;
        //     const data = this.formatJson(filterVal, list);
        //     export_json_to_excel(tHeader, data, '订单列表');
        //   })
        // },
        // formatJson(filterVal, jsonData) {
        //   return jsonData.map(v => filterVal.map(j => v[j]))
        // }
        // listM(val){
        //   this.listMe=true;
        // }
      },
      // mounted(){
      //   this.$on('bridge',(val)=>{
      //     this.listM(val);
      //   })
      // }
    }
</script>

<style scoped>
  @import "../../assets/fonts/iconfont.css";
  .circle{
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: gainsboro;
    border-radius: 40px;
    text-align: center;
    line-height: 40px;
  }
  .circle_center{
    /*margin-top: -25px;*/
    color:#3399FF;
    font-size: 20px;
  }
  .head{
    border: 1px solid #e6e6e6;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .middle{
    border: 1px solid #e6e6e6;
    border-top: none;
  }
  /*.el-main{*/
    /*background-color: #A9A9A9;*/
    /*opacity: 0.1;*/
  /*}*/
  .el_search{
    width: 300px;
    margin-top: 10px;
  }
  .search_new_right{
    float: right;
    margin-right: 10px;
  }
  .el-main{   /*去掉标签左右的padding间距*/
    padding-left: 00px;
    padding-right: 00px;
    /*padding: 0;*/
  }
  .bgc{
    background-color: rgba(169, 169, 169, 0.1);
  }

</style>
