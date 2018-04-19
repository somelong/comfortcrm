<template>
  <el-table :data="tableDDData" height="630" border stripe style="width: 100%">
    <!--border 表格有没有边框线-->
    <!--stripe 表格的斑马纹-->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      label="id"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ps_id}}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="文字描述"
      width="280">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ps_zt }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="图片预览"
      width="180">
      <template slot-scope="scope">
        <img :src="scope.row.ps_img" alt="">
        <span style="margin-left: 10px"></span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"  type="primary" plain>编辑</el-button>-->
        <el-button size="mini" type="danger" plain @click="stdDelete(scope.$index, scope.row)">删除</el-button>

      </template>
    </el-table-column>
  </el-table>


</template>

<script>
  import * as location from '../../../communal/routerApi.js'
  export default {
    name:"std",
    data() {
      return {
        tableDDData:[]
      }
    },
    methods:{
      stdDelete(index,row){

        console.log("输出删除的id")
        this.axios.post('/xyc/stdde.do',{
          params:{
            ps_id:row.ps_id,
          }
        }).then((data)=>{
    console.log("传出数据")
        })
          this.tableDDData.splice(index,1)

      }
    },
    created(){
      this.axios.get("/xyc/shitidian.do")
        .then(resp=> {
            this.tableDDData = resp.data;
            for(let i=0;i<this.tableDDData.length;i++){
              this.tableDDData[i].ps_img = location.locationxyc + this.tableDDData[i].ps_img;
            }
            console.log("输出数据")
            console.log(this.tableDDData)
          }
        )}
  }
</script>
