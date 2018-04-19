<template>
  <el-table :data="tableDData" height="630" border stripe style="width: 100%">
    <!--border 表格有没有边框线-->
    <!--stripe 表格的斑马纹-->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      label="id"
      width="50">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ac_id }}</span>
      </template>
    </el-table-column>



    <el-table-column
      label="图片预览"
      width="120">
      <template slot-scope="scope">
        <img :src="scope.row.ac_img" alt="">
        <span style="margin-left: 10px"></span>
      </template>
    </el-table-column>

    <el-table-column
      label="点睛之词"
      width="150" >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ac_zt }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="图片描述"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ac_ft }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="类型"
      width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ac_type }}</span>
      </template>
    </el-table-column>


    <el-table-column
      label="发布状态"
      width="80">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ac_state }}</span>
      </template>
    </el-table-column>



    <el-table-column label="操作" >
      <template slot-scope="scope">
        <!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"  type="primary" plain>编辑</el-button>-->
        <el-button size="mini" type="danger" plain @click="rediandelete(scope.$index, scope.row)">删除</el-button>

      </template>
    </el-table-column>
  </el-table>


</template>

<script>
  import * as location from '../../../communal/routerApi.js'
  export default {
    name:"redian",
    data() {
      return {
        tableDData:[]
      }
    },
    methods:{
      rediandelete(index,row){

        console.log("输出删除的id")
        this.axios.post('/xyc/rediandelet.do',{
          params:{
            ac_id:row.ac_id
          }
        }).then((data)=>{

        }),
          this.tableDData.splice(index,1)

      }
    },




    created(){
      this.axios.get("/xyc/redian.do")
        .then(resp=> {
          console.log(resp.data);
            this.tableDData = resp.data;
            for(let i=0;i<this.tableDData.length;i++){
//
              this.tableDData[i].ac_img = location.locationxyc + this.tableDData[i].ac_img;
//
            }

          }
        )}
  }
</script>
