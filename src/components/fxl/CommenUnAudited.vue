<template>

  <div>
    <el-table :data="tableData" height="650" border stripe style="width: 100%">
      <!--=================expand:==============-->
      <!--展开行-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"  class="demo-table-expand">
            <el-form-item label="图片:">
              <span>
                <img :src="props.row.c_img[0].imgsrc" height="200" width="200"/>
                <img :src="props.row.c_img[1].imgsrc" height="200" width="200"/>
                <img :src="props.row.c_img[2].imgsrc" height="200" width="200"/>
              </span>
            </el-form-item>

            <el-form-item label="描述:">
              <span class="expandLef">{{ props.row.c_text }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--====================================-->
      <!--border 表格有没有边框线-->
      <!--stripe 表格的斑马纹-->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        label="用户"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.u_name }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column-->
      <!--label="订单编号"-->
      <!--width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<span style="margin-left: 10px">{{ scope.row.o_number }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column
        label="产品图片"
        width="200">
        <template slot-scope="scope">
          <img :src="scope.row.p_img" height="200" width="200"/>
        </template>
      </el-table-column>

      <el-table-column
        label="描述"
        width="180">
        <template slot-scope="scope">
          <span class="textView" style="margin-left: 10px">{{ scope.row.c_text }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="图片预览"
        width="300">
        <template slot-scope="scope">
          <!--<img src="../../assets/logo.png" height="200" width="200"/>-->
          <img :src="scope.row.c_img[0].imgsrc" height="200" width="200"/>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"  type="primary" plain>通过</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 5, 6]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total = tableData3.length>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import * as lcg from '../../../communal/routerApi';
  export default {
    name: "my-table",
    data() {
      return {
        currentPage: 1, //当前显示的页
        tableData :[], // 显示数据
        tableData3: [], // 总的数据的数组
        currentPageData:[], //定义有个当前页的数组
        num:4,
        currentPages:1, //获取当前页的页码
      }
    },
    methods : {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.num=val;
        this.tableData=[];
        for(let i=( this.currentPage-1)*this.num;i< this.currentPage*this.num&&i<this.tableData3.length;i++){      /*&&i<this.tableData.length*/
          if(i<this.tableData3.length){
            this.tableData.push(this.tableData3[i])
          }
        }
      },
      handleCurrentChange(val) {
        this.currentPages=val;
        console.log(`当前页: ${val}`);
        this.currentPage=val;
        this.tableData=[];
        console.log(val);
        for(let i=( this.currentPage-1)*this.num;i< this.currentPage*this.num&&i<this.tableData3.length;i++){      /*&&i<this.tableData.length*/

          if(i<this.tableData3.length){
            this.tableData.push(this.tableData3[i])
          }
        }
      },
      handleDelete(index , row){
        console.log("删除的方法");
        let _row = row;
        this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
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
      handleEdit(index , row){
        console.log("审核通过的方法");
        let _row = row;
        this.$confirm('此操作将通过该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.updateData(_row); // 发起ajax请求去修改后台数据
          this.dataOnLoad(index,_row); // 调用重新加载方法
          this.$message({
            type: 'success',
            message: '审核通过!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          });
        });
      },
      dataOnLoad(index,row){
        console.log("调用重新加载方法");
        // this.tableData.splice(index,1);  //删除当前页的数据
        for(let i=0;i<this.tableData3.length;i++){
          if(row.c_id == this.tableData3[i].c_id){    //当前删除的id和总数据中的id比较，相等则删除
            this.tableData3.splice(i,1)  //删除总数组中对应的数据
          }
        }
        //下面是删除后重新的渲染
        this.tableData=[];
        console.log( "chong:"+this.currentPages);
        for(let i=(this.currentPages-1)*4;i<this.currentPages*4;i++){      /*&&i<this.tableData.length*/
          if(i<this.tableData3.length){
            this.tableData.push(this.tableData3[i])
          }
        }
      },
      deleteData(row){
        console.log("调用删除数据的方法");
        console.log(row+"拿到一行数据");
        console.log(row.c_id);
        this.axios.post('/fxl/deleteUserComment.do',{
          params:{
            c_id:row.c_id
          }
        }).then((data)=>{
          console.log("id:"+data.data)
        });
      },
      updateData(row){
        console.log("调用修改数据库数据的方法");
        console.log(row+"拿到一行数据");
        console.log(row.c_id);
        this.axios.post('/fxl/updateUserComment.do',{
          params:{
            c_id:row.c_id
          }
        }).then((data)=>{
          console.log("id:"+data.data)
        });
      },
      valuesFt:function(){ //截取字符串长度的方法
        // const self=this;
        // console.log($($(".textView")[1]).innerText);
        let _num = $(".textView").length;
        for(let i = 0 ;i<_num ; i++){
          let getFTShow = $(".textView")[i].innerText;
          let substringShow = getFTShow.substring(0,10);
          // console.log(getFTShow);
          $(".textView")[i].innerText = substringShow + "...";
        }
        // console.log("qqq");
      },
    },
    created() {

      // 冯小龙开始介入
      this.axios.post('/fxl/getUserNoComment.do').then((data) => {
        this.tableData3=data.data;
        console.log(data.data);
        for(let i=0;i<this.tableData3.length;i++){
          let imgSrc = this.tableData3[i].c_img;
          imgSrc = imgSrc.split(',');
          for(let i = 0 ;i<imgSrc.length;i++){
            let imgObj = {};
            imgObj.imgsrc = lcg.locationfxl + imgSrc[i];
            imgSrc[i] = imgObj;
          }
          this.tableData3[i].c_img = imgSrc;
          this.tableData3[i].p_img = lcg.locationfxl + this.tableData3[i].p_img;
          // this.tableData[i].p_src = activityjw.locationjw + this.tableData[i].p_src;
        }
        for(let j=0;j<4 && j<this.tableData3.length;j++){
          this.tableData.push(this.tableData3[j])
        }
      })
    },
    updated() {    /*修改之后更新的数据--查生命周期函数*/
      this.valuesFt();
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

