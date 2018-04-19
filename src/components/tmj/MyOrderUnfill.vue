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
          <p>{{scope.row.o_phone}}</p>
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

      <el-table-column
        label="用户备注"
        width="150">
        <template slot-scope="scope">
          <!--<span style="margin-left: 10px">{{ scope.row.img }}</span>-->
          <span>{{scope.row.user_note}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="员工备注"
        width="120">
        <template slot-scope="scope">
          <!--<span style="margin-left: 10px">{{ scope.row.img }}</span>-->
          <span>立即发货</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true"   type="primary" plain>编辑</el-button>
          <!--编辑部分-->

            <el-dialog title="编辑订单" :visible.sync="dialogFormVisible" center :data="dialogData">
                <el-form :model="form" inline class="demo-table-inline" size="mini">
                  <el-form-item label="商品名称:" :label-width="formLabelWidth">
                    <el-input v-model="dialogData.p_name" auto-complete="off" class="inputbox" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="用户名:" :label-width="formLabelWidth">
                    <el-input v-model="dialogData.u_name" auto-complete="off" class="inputbox" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="商品颜色:" :label-width="formLabelWidth">
                    <el-input v-model="dialogData.p_color" auto-complete="off" class="inputbox" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式:" :label-width="formLabelWidth">
                    <el-input v-model="dialogData.o_phone" auto-complete="off" class="inputbox"></el-input>
                  </el-form-item>
                  <el-form-item label="商品价格:" :label-width="formLabelWidth">
                    <el-input v-model="dialogData.o_zongjia" auto-complete="off" class="inputbox" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="订单运单号:" :label-width="formLabelWidth">
                    <el-input v-model="dialogData.o_waybill" auto-complete="off" class="inputbox"></el-input>
                  </el-form-item>
                  <el-form-item label="收货地址:" :label-width="formLabelWidth">
                    <el-input v-model="dialogData.o_address" auto-complete="off" class="inputbox1"></el-input>
                  </el-form-item>
                  <el-form-item label="商品描述:" :label-width="formLabelWidth">
                    <el-input v-model="dialogData.p_text" auto-complete="off" class="inputbox1" disabled></el-input>
                  </el-form-item>

                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;handleConfirm()" size="small">确 定</el-button>
              </div>
            </el-dialog>
          <el-button size="mini" @click="handleSent(scope.$index, scope.row)" type="success" plain>发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页部分-->
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
            dialogData:[],//模态框数据
            currentPage:1,
            modulindex:'',
            pageNum:4,/*每页条数*/
            // page:1,/*默认第一页*/
            currentPageData:[],
            dialogFormVisible: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '100px'
          }
        },
      components: {},
      methods: {
        handleSent(index, row) {//发货方法
          console.log(index, row);
          let _row=row;
          this.$confirm('确定要发货吗','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type: 'warning'
          }).then(()=>{
            this.updateData(_row);
            this.dataOnLoad(index,_row)
            this.$message({
              type: 'success',
              message:'发货成功！'
            });
          }).catch(()=>{
            this.$message({
              type: 'info',
              message:'已取消发货'
            })
          })
        },
        updateData(row){
          console.log(row.o_phone)
          this.axios.get("/xixi/updateVueorder.do",{
            params:{
              ophone:row.o_id
            }
          }).then((data)=>{
            console.log("更新成功"+data.data)
          })
        },
        //发货请求后清空当前页面数组，重新加载
        dataOnLoad(index,row){
          console.log("发货以后重新加载当前数组")
          this.currentPageData.splice(index,1)
          for(let i=1;i<this.tableData.length;i++){
            if(row.o_phone==this.tableData[i].o_phone){
              this.tableData.splice(i,1)
            }
            //重新渲染当前页面
            this.currentPageData=[];
            for(let i=(this.currentPage-1)*this.pageNum;i<this.currentPage*this.pageNum&&i<this.tableData.length;i++){
              this.currentPageData.push(this.tableData[i])
            }
          }
        },
        handleEdit(index, row) {//编辑方法
          console.log(index, row);
          console.log(row.o_address)
          let _row= row;
          this.dialogData=_row
          this.modulindex=index;
        },
        //确认编辑后
        handleConfirm(){
          console.log(this.dialogData.o_waybill)
          console.log(this.modulindex);
          this.axios.get("/xixi/xiugaiVueorder.do",{
            params:{
              ophone:this.dialogData.o_phone,
              owaybill:this.dialogData.o_waybill,
              oaddress:this.dialogData.o_address,
              uname:this.dialogData.u_name
            }
          }).then((data)=>{
            console.log("编辑成功"+data.data)
          })
          this.currentPageData=[];
          for(let i=(this.currentPage-1)*this.pageNum;i<this.currentPage*this.pageNum&&i<this.tableData.length;i++){
            this.currentPageData.push(this.tableData[i])
          }
        },
        handleSizeChange(val){
          // 每页条数
          console.log(`每页 ${val} 条`);
          this.pageNum=val;
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
        },
        searchV(val){
          console.log(this.message);
          console.log(val);
        }
      },

      created(){
        //使用这个组件时，改变所有图片的路径，从所给的api的那个地址上获取
        // for( let i=0;i<this.tableData.length;i++) {
        //   this.tableData[i].img = order.location + this.tableData[i].img;
        // }
        // 向服务器请求数据
          this.axios.get('/xixi/getVueMyorderUnfill.do').then((data) =>{
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
      },
      // mounted() {
      //   this.$on('bridge', (val) => {
      //     this.searchV(val);
      //   });
      // }
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
  /*下拉展示部分css*/
  #showImg{
    width: 120px;
    height: 120px;
    margin-left: 100px;
    margin-top: 10px;
  }
  .inputbox{
    width: 200px;
    height: 30px;
    outline: none;
  }
  .inputbox1{
    width: 500px;
    height: 30px;
    outline: none;
  }
  .el-dialog__body{
    padding:00px 00px;
  }
</style>
