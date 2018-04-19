<template>
  <div :router="true">
    <div class="textAdmin">
      <p>管理员</p>
      <p>3/16</p>
    </div>
    <div class="mainAdmin">
      <img src="http://localhost:8088/images/user_img/tx1.jpg" alt="">
      <p>超级管理员</p>
      <p>没错 正是在下</p>
    </div>
    <div class="minorAdmin">
      <ul>
        <li>
          <div @click="tiaozhuan">
            <p class="displayNone"></p>
            <img src="http://localhost:8088/images/user_img/tx2.jpg" alt="">
            <p>管理员</p>
            <p>没错  还是在下</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: "admin-view",
      data(){
        return{

        }
      },
      methods:{
        tiaozhuan: function (obj) {
          // console.log(obj);
          // console.log(obj.path);
          this.$router.push({path:'MyMessage'});
        }
      },
      created(){
        // 在创建这个vue 组件的时候去改变在所有的图片的路径
        // for(let i = 0 ;i<this.tableData.length;i++){
        //   this.tableData[i].img = huaji.location + this.tableData[i].img;
        // }
      }
    }
</script>

<style scoped>
  .textAdmin{
    padding-top: 40px;
    height: 100px;
    font-size: 14px;
  }
  .el-aside{
    line-height: inherit;
  }
  .mainAdmin:hover img{
    box-shadow: 0 0 15px 0 #aeaeae;
  }
  .minorAdmin:hover img{
    box-shadow: 0 0 15px 0 #aeaeae;
  }
  .minorAdmin{
    cursor: pointer;
  }
  .mainAdmin{
    cursor: pointer;
    height: 180px;
    font-size: 14px;
    /*width: 120px;*/
  }
  .el-aside img{
    margin-bottom: 10px;
    max-width: 80px;
    border-radius: 40px;
    transition: all .2s linear;
    box-shadow: 0 0 6px 0 #dbdbdb;
  }
  .el-aside p{
    font-size: 14px;
    line-height: 25px;
  }
  .displayNone{
    display: none;
  }
</style>
