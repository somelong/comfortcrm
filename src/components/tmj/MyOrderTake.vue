<template>
  <div>
    <el-table
      :data="currentPageData"
      border
      stripe
      style="width: 100%">
      <!--border 表格有没有边框线-->
      <!--stripe 表格的斑马纹-->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品主图:">
              <img :src="props.row.p_img" alt="" id="showImg">
            </el-form-item>
            <el-form-item label="用 户 名:">
              <span>{{ props.row.u_name }}</span>
            </el-form-item>
            <el-form-item label="商品名称:">
              <span>{{ props.row.p_name }}</span>
            </el-form-item>
            <el-form-item label="联系方式:">
              <span>{{ props.row.o_phone }}</span>
            </el-form-item>
            <el-form-item label="商品颜色:">
              <span>{{ props.row.p_color }}</span>
            </el-form-item>
            <el-form-item label="收货地址:">
              <span>{{ props.row.o_address }}</span>
            </el-form-item>
            <el-form-item label="商品价格:">
              <span>{{ props.row.o_zongjia }}X{{props.row.o_goodNum}}</span>
            </el-form-item>
            <el-form-item label="商品描述:">
              <span>{{ props.row.p_text }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="收货信息"
        width="150">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <p>{{scope.row.u_name}}</p>
          <p>{{scope.row.u_phone}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="产品图片"
        width="200">
        <template slot-scope="scope">
          <img style="max-width: 120px" :src="scope.row.p_img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称"
        width="200">
        <template slot-scope="scope">
          <span>{{scope.row.p_name}}</span><span style="color: orange">{{scope.row.p_color}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="数量"
        width="100">
        <template slot-scope="scope">
          <span class="numText">X{{scope.row.o_goodNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单运单号">
        <template slot-scope="scope">
          <span class="orderNum">{{scope.row.o_waybill}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 5, 6]"
        :page-size="pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import * as order from "../../../communal/routerApi"
  export default {
    data() {
      return {
        tableData: [],
        currentPage:1,
        pageNum:4,/*每页条数*/
        // page:1,/*默认第一页*/
        currentPageData:[]
      }
    },
    components: {},
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val){
        // 每页条数
        this.pageNum=val;
        console.log(`每页 ${val} 条`);
        this.currentPageData=[];
        for(let i=(this.currentPage-1)*this.pageNum;i<this.currentPage*this.pageNum&&i<this.tableData.length;i++){
          this.currentPageData.push(this.tableData[i])
        }
      },
      handleCurrentChange(val){
        // 当前页操作
        this.currentPage=val;
        this.currentPageData=[];
        console.log(`当前页: ${val}`);
        for(let i=(this.currentPage-1)*this.pageNum;i<this.currentPage*this.pageNum&&i<this.tableData.length;i++){
          this.currentPageData.push(this.tableData[i])
        }
      }
    },
    created(){
      //使用这个组件时，改变所有图片的路径，从所给的api的那个地址上获取
      // for( let i=0;i<this.tableData.length;i++) {
      //   this.tableData[i].img = order.location + this.tableData[i].img;
      // }
      // 向服务器发起请求
      this.axios.get('/xixi/getVueMyorderTake.do').then((data) =>{
        console.log(data.data);
        this.tableData = data.data;
        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].p_img = order.locationtmj+this.tableData[i].p_img;
          // console.log(this.tableData[i].p_img);
        }
        for(let i=0;i<this.pageNum&&i<this.tableData.length;i++){
          this.currentPageData.push(this.tableData[i])
        }
      })
    },
    destroyed(index,row){
      console.log("组件消失了哟")
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
    text-align:left;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;

  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    float: left;
  }
  .el-table{
    padding: 10px;
    margin-top: 10px;
    /*background: #fbfbfb;*/
  }
  img{
    /*position: absolute;*/
    /*width: 60px;*/
    /*height: 60px;*/
    /*top: 50%;*/
    /*margin-top: -30px;*/
    /*left: 10px;*/
    box-shadow: 2px 2px 2px #efefef;
  }
  p{
    height: 20px;
    line-height: 20px;
    margin-bottom: 5px;
  }
  /*订单产品介绍*/
  .text{
    position: absolute;
    display: inline-block;
    width: 100px;
    height: 50px;
    /*border: 1px solid;*/
    text-align: left;
    top: 10px;
    left: 90px;
  }
  /*订单产品数量*/
  .numText{
    /*position: absolute;*/
    display: inline-block;
    width: 40px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: white;
    /*border: 1px solid;*/
    top: 40px;
    left: 135px;
    border-radius: 3px;
    background: #5b5b5b;
  }
  /*订单运单号*/
  .orderNum{
    display: inline-block;
    width: 170px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #cbcbcb;
    border-radius: 5px;
  }
  /*下拉展示部分css*/
  #showImg{
    width: 120px;
    height: 120px;
    margin-left: 100px;
    margin-top: 10px;
  }
</style>
