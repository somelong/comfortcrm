<template>
  <div style="width: 100%">
    <el-table
      :data="dangqian"
      height="630"
      border
      stripe
      fit = "true">
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
          <span style="margin-left: 10px">{{ scope.row.p_id }}</span>
        </template>
      </el-table-column>



      <el-table-column
        label="图片预览"
        width="200">
        <template slot-scope="scope">
          <img :src="scope.row.p_img" alt="">
          <span style="margin-left: 10px"></span>
        </template>
      </el-table-column>

      <el-table-column
        label="类型"
        width="150" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.p_subject }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="图片描述"
        width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.p_text }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="优惠价格"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.p_price }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="价格"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.p_priceView }}</span>
        </template>
      </el-table-column>


      <!------------------===================================-->


      <el-table-column label="操作" >
        <template slot-scope="scope">
          <!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"  type="primary" plain>编辑</el-button>-->

          <el-button size="mini" type="danger" plain @click="cpDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        layout=" prev, pager, next" :page-size="peigeNum" @current-change="changNum"
        :total="tableDdData.length">
      </el-pagination>
    </div>
  </div>



</template>

<script>
  import * as location from '../../../communal/routerApi.js'
  export default {
    name:"cpxq",
    data() {
      return {
        tableDdData:[],//总数据
        peigeNum:3 ,//显示条数
        dangqian:[],  //当前显示的哪及条
      }


      },
    methods:{
      cpDelete(index,row){
        this.axios.post('/xyc/canpindelete.do',{
          params:{
            p_id:row.p_id
          }
        })
          .then((data)=>{
        });
          this.dangqian.splice(index,1)
      },
      changNum(val){
        this.dangqian=[];
        console.log(val);
        for(let i = (val-1)*3; i<val*3;i++){
          this.dangqian.push(this.tableDdData[i])
        }
      }

    },
    created(){
      this.axios.get("/xyc/qingqiu.do")
        .then(resp=> {
            this.tableDdData = resp.data;
            for(let i=0;i<this.tableDdData.length;i++){
              this.tableDdData[i].p_subject = "沙发";
              this.tableDdData[i].p_img = location.locationxyc + this.tableDdData[i].p_img;
              }
          for(let a=0;a<3;a++){
            this.dangqian.push(this.tableDdData[a])
            }
          }
        )}
    }


</script>
