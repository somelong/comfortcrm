<template>
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%">
    <!--border 表格有没有边框线-->
    <!--stripe 表格的斑马纹-->

    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
        <!--<el-popover trigger="hover" placement="top">-->
          <!--<p>姓名: {{ scope.row.name }}</p>-->
          <!--<p>住址: {{ scope.row.address }}</p>-->
          <!--<div slot="reference" class="name-wrapper">-->
            <!--<el-tag size="medium">{{ scope.row.name }}</el-tag>-->
          <!--</div>-->
        <!--</el-popover>-->
      </template>
    </el-table-column>

    <el-table-column
      label="头像"
      width="200">
      <template slot-scope="scope">
        <!--<span style="margin-left: 10px">{{ scope.row.img }}</span>-->
        <img :src="scope.row.img" alt="">
      </template>
    </el-table-column>

    <el-table-column
      label="地址"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import * as huaji from '../communal/routerApi.js'
  export default {
    name: "my-table",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          img: 'images/user_img/tx1.jpg',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          img: 'images/user_img/tx2.jpg',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          img: 'images/user_img/tx1.jpg',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          img: 'images/user_img/tx2.jpg',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        // logo: require('../asset/admin/logo.png'),
        // logo1: require('../asset/admin/logo.png')
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created(){
      // 在创建这个vue 组件的时候去改变在所有的图片的路径
      for(let i = 0 ;i<this.tableData.length;i++){
        this.tableData[i].img = huaji.locationfxl + this.tableData[i].img;
      }
    }

  }
</script>

<style scoped>
/*.redactBtn{*/
  /*padding: 10px 20px;*/
/*}*/
  /*.deleteBtn{*/
    /*padding: 10px 20px;*/
  /*}*/
</style>
