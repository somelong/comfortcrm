  <template>
    <!--<div>-->
     <el-table :data="tableData" height="630" border stripe style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      label="id"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ps_ids }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="图片预览"
      width="180">
      <template slot-scope="scope">
        <img :src="scope.row.ps_imgs" alt="">
        <span style="margin-left: 10px"></span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"  type="primary" plain>编辑</el-button>-->
        <el-button size="mini" type="danger" plain @click="handleDeletecpxq(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
     </el-table>

    <!--<div class="block">-->
      <!--<el-pagination-->
        <!--layout="prev, pager, next" :page-size="peigeNum" @current-change="changNumb"-->
        <!--:total="tableData.length">-->
      <!--</el-pagination>-->
    <!--</div>-->


    <!--</div>-->
  </template>

<script>
  import * as location from '../../../communal/routerApi.js'
  export default {
    name:"banxq",
    data() {
      return {
        tableData:[],//总数据
//        peigeNum:"3", //每页显示条数
//        dangqianye:[]

      }
    },
    methods:{
      handleDeletecpxq(index,row){

        console.log("输出删除的id")
          this.axios.post('/xyc/bananerde.do',{
            params:{
              ps_ids:row.ps_ids
            }
          }).then((data)=>{

          }),
            this.tableData.splice(index,1)

      },
//      changNumb(val){
//
//          this.dangqianye=[]
//          console.log(val)
//          for(let i = (val-1)*3; i<val*3;i++){
//            this.dangqianye.push(this.tableData[i])
//        }
//      }
    },
  created(){
    this.axios.post("/xyc/bananer.do")
      .then(resp=> {
        this.tableData = resp.data;
        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].ps_imgs = location.locationxyc + this.tableData[i].ps_imgs;
        }
        console.log("输出数据")
        console.log(this.tableData)
        }
      )}
  }
</script>
