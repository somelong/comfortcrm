<template>

  <div>
    <el-table
      :data="currentPageData"
      border
      stripe
      style="width: 100%">
      <!--border 表格有没有边框线-->
      <!--=================expand:==============-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"  class="demo-table-expand">

            <el-form-item label="图片:">
              <span> <img :src="props.row.sp_img" alt="" class="imgSizeShow"></span>
            </el-form-item>
            <el-form-item label="描述:">
              <span class="expandLef">{{ props.row.sp_ft }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--====================================-->
      <!--stripe 表格的斑马纹-->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        label="主题"
        width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sp_zt }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="主图"
        width="200">
        <template slot-scope="scope">
          <img :src="scope.row.sp_img" alt="" class="imgSize">
        </template>
      </el-table-column>

      <el-table-column
        label="活动描述"
        width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="textView">{{ scope.row.sp_ft }}</span>
          <span  @click="valuesFt"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="查看更多"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sp_morelink }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" plain @click="handleSent(scope.$index, scope.row)">发送</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary" plain>编辑</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="numPages"
        :page-size="num"
        layout="total, sizes, prev, pager, next, jumper"
        :total=tableData.length>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import * as phystore from '../../../communal/routerApi'

  export default {
    name: "my-table",
    data() {
      return {
        tableData: [],
        currentPage: 1, //当前显示的页
        currentPageData:[], //定义有个当前页的数组
        ModalState:false,
        numPages:[4,5,6],
        num:4
      }
    },

    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.ModalState=!this.ModalState
      },
      handleDelete(index, row) {
        console.log(row);
        let _row = row;
        this.$confirm('此操作将永久删除数据库的数据, 是否继续?', '提示', {
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
      deleteData(row){
        console.log("调用删除数据库数据的方法");
        console.log(row+"拿到一行数据");
        console.log("id:"+row.sp_id);
        this.axios.get('/api/deleteVueSpecial.do',{
          params:{
            spId:row.sp_id
          }
        }).then((data)=>{
          console.log("id:"+data.data)
        });
      },
      dataOnLoad(index,row){
        console.log("调用重新加载方法");
        this.currentPageData.splice(index,1);  //删除当前页的数据
        for(let i=0;i<this.tableData.length;i++){
          if(row.sp_id == this.tableData[i].sp_id){    //当前删除的id和总数据中的id比较，相等则删除
            this.tableData.splice(i,1)  //删除总数组中对应的数据
          }
          //下面是删除后重新的渲染
          this.currentPageData=[];
          console.log( "chong:"+this.currentPages);
          for(let i=(this.currentPage-1)*4;i<this.currentPage*4;i++){      /*&&i<this.tableData.length*/
            if(i<this.tableData.length){
              this.currentPageData.push(this.tableData[i])
            }
          }
        }
      },
      handleSent(index,row){
        this.$notify({
          title: '发布成功',
          message: '这是条数据将会在前台显示！',
          type: 'success'
        });
      },
      valuesFt:function(){
        let _num = $(".textView").length;
        for(let i = 0 ;i<_num ; i++){
          let getFTShow = $(".textView")[i].innerText;
          let substringShow = getFTShow.substring(0,10);
          // console.log(getFTShow);
          $(".textView")[i].innerText = substringShow + "...";
        }
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.num=val;
        this.currentPageData=[];
        for(var i=( this.currentPage-1)*this.num;i< this.currentPage*this.num;i++){      /*&&i<this.tableData.length*/
          if(i<this.tableData.length){
            this.currentPageData.push(this.tableData[i])
          }
        }

      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.currentPageData=[];
        for(var i=( this.currentPage-1)*this.num;i< this.currentPage*this.num;i++){      /*&&i<this.tableData.length*/
          if(i<this.tableData.length){
            this.currentPageData.push(this.tableData[i])
          }

        }

      },
    },
    components: {},
    created() {
      this.axios.get('/api/getVueSpecial.do').then((data) => {
        console.log(data.data);
        this.tableData = data.data;
        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].sp_img = phystore.location + this.tableData[i].sp_img;
        }
        //存当前页的数据
        for(let j=0;j<4 && j<this.tableData.length;j++){
          this.currentPageData.push(this.tableData[j])
        }
      })
    },
    updated() {    /*修改之后更新的数据--查生命周期函数*/
      this.valuesFt();
    },
    destroyed(index,row){
      console.log(index, row);
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
  *{
    padding: 10px;
  }
  .imgSize{
    width: 300px;
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
</style>
