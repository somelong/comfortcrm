<template>

  <div>
    <el-table :data="tableData" height="650" border stripe style="width: 100%">
      <!--border 表格有没有边框线-->
      <!--stripe 表格的斑马纹-->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        label="id"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.is_id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="消息类型"
        width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.i_type }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="消息描述"
        width="320">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.i_MessageContent }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="发送人群"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.m_grade }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="发送时间"
        width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.is_date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 9, 12]"
        layout="total, sizes, prev, pager, next, jumper"
        :total= tableData3.length>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-table",
    data() {
      return {
        currentPage: 1, //当前显示的页
        tableData :[], // 显示使用的数据数组
        tableData3: [], // 总的数据数据
        currentPageData:[], //定义有个当前页的数组
        num:6, // 每页显示的条数
        currentPages:1, //获取当前页的页码
      }
    },
    methods : {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.num = val;
        this.tableData=[];
        for(let i=( this.currentPage-1)*this.num;i< this.currentPage*this.num&&i<this.tableData3.length;i++){      /*&&i<this.tableData.length*/
          if(i<this.tableData3.length){
            this.tableData.push(this.tableData3[i])
          }
        }
      },
      handleCurrentChange(val) { // 切换页数
        this.currentPages=val;
        console.log(`当前页: ${val}`);
        this.currentPage=val;
        this.tableData=[];
        for(let i=( this.currentPage-1)*this.num;i< this.currentPage*this.num&&i<this.tableData3.length;i++){      /*&&i<this.tableData.length*/
          if(i<this.tableData3.length){
            this.tableData.push(this.tableData3[i])
          }
        }
      },
      handleDelete(index , row){
        console.log("删除的方法");
        let _row = row;
        this.$confirm('此操作将删除该消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteData(_row);
          this.dataOnLoad(index,_row);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleEdit(index , row){  // 回复的方法

      },
      dataOnLoad(index,row){
        console.log("调用重新加载方法");
        this.tableData.splice(index,1);  //删除当前页的数据
        for(let i=0;i<this.tableData3.length;i++){
          if(row.is_id == this.tableData3[i].is_id){    //当前删除的id和总数据中的id比较，相等则删除
            this.tableData3.splice(i,1)  //删除总数组中对应的数据
          }
        }
        //下面是删除后重新的渲染
        this.tableData=[];
        console.log( "chong:"+this.currentPages);
        for(let i=(this.currentPages-1)*this.num;i<this.currentPages*this.num;i++){      /*&&i<this.tableData.length*/
          if(i<this.tableData3.length){
            this.tableData.push(this.tableData3[i])
          }
        }
      },
      deleteData(row){
        console.log("调用删除数据的方法");
        console.log(row+"拿到一行数据");
        console.log(row.is_id);
        this.axios.post('/fxl/deleteMessage.do',{
          params:{
            is_id:row.is_id
          }
        }).then((data)=>{
          console.log("id:"+data.data)
        });
      },
    },
    created() {
      // 冯小龙开始介入
      this.axios.post('/fxl/getAMessage.do').then((data) => {
        this.tableData3 = data.data;
        console.log(data.data);
        for(let j=0;j<this.num && j<this.tableData3.length;j++){
          this.tableData.push(this.tableData3[j])
        }
      })
    },
  }
</script>

<style scoped>
  *{
    padding: 10px;
  }
  .imgSize{
    width: 50px;
    float: left;
    padding-left: 0px;
    padding-right: 0px;
  }
  .imgSizeShow{
    float: left;
    width: 150px;
  }
  .expandLef{
    float: left;
  }
  *[data-v-068ac9cf]{
    padding:8px;
  }
  /*.showModal{*/
  /*display: none;*/
  /*}*/
  .el-table .cell img{
    max-width: 120px;
    max-height: 120px;
  }
</style>
