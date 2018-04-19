<template>
  <div class="bgc">
    <el-menu class="el-menu-demo head" mode="horizontal">
      <el-menu-item index="1" style="color: #3399FF">
        <i class="circle el-menu-demo"><i class="iconfont icon-jiaoseguanli circle_center"></i></i>
        用户管理
      </el-menu-item>
    </el-menu>
    <el-menu class="el-menu-demo head2" mode="horizontal">
      <el-select v-model="value" placeholder="请选择用户等级" class="selectBox" @change="selectVal(value)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="selectval"
        >
        </el-option>
      </el-select>
      <span class="search_new_right">
         <el-input  class="el_search" placeholder="请输入用户ID或用户名" prefix-icon="el-icon-search " id="searchValue" @keydown.enter.native="search()"></el-input>
         <el-button type="primary" size="mini" @click="excelget()"><i class="el-icon-download">导出Excel</i></el-button>
        </span>
    </el-menu>
    <div>
      <el-table
        :data="currentPageData"
        border
        stripe
        style="width: 100%">
        <!--border 表格有没有边框线-->
        <!--stripe 表格的斑马纹-->
        <!--复选框-->
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户头像:">
                <img :src="props.row.u_img" alt="" id="showImg">
              </el-form-item>
              <el-form-item label="用 户 名:">
                <span>{{ props.row.u_name }}</span>
              </el-form-item>
              <el-form-item label="用户性别:">
                <span>{{ props.row.u_sex }}</span>
              </el-form-item>
              <el-form-item label="联系方式:">
                <span>{{ props.row.u_phone }}</span>
              </el-form-item>
              <el-form-item label="用户生日:">
                <span>{{ props.row.u_birthday }}</span>
              </el-form-item>
              <el-form-item label="用户微信:">
                <span>{{ props.row.ui_weixin }}</span>
              </el-form-item>
              <el-form-item label="用户微博:">
                <span>{{ props.row.ui_weibo }}</span>
              </el-form-item>
              <el-form-item label="银行卡号:">
                <span>{{ props.row.ui_card }}</span>
              </el-form-item>
              <el-form-item label="用户等级:">
                <span>{{ props.row.m_grade }}</span>
              </el-form-item>
              <el-form-item label="用户经验值:">
                <span>{{ props.row.m_equity }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          width="150" class="trheight">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <p>{{scope.row.u_name}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="用户头像"
          width="200" class="trheight">
          <template slot-scope="scope">
            <img :src="scope.row.u_img" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="用户经验值"
          width="150" class="trheight">
          <template slot-scope="scope">
            <span>{{scope.row.m_equity}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="会员等级"
          width="120" class="trheight">
          <template slot-scope="scope">
            <!--<span style="margin-left: 10px">{{ scope.row.img }}</span>-->
            <span>{{scope.row.m_grade}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class="trheight">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true"   type="primary" plain>编辑</el-button>
            <!--编辑部分-->

            <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible" center :data="dialogData">
              <el-form :model="form" inline class="demo-table-inline" size="mini">
                <el-form-item label="用户名:" :label-width="formLabelWidth">
                  <el-input v-model="dialogData.u_name" auto-complete="off" class="inputbox" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户生日:" :label-width="formLabelWidth">
                  <div class="block">
                    <el-date-picker
                      v-model="dialogData.u_birthday"
                      type="date"
                      placeholder="选择日期" class="inputbox">
                    </el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="用户电话:" :label-width="formLabelWidth">
                  <el-input v-model="dialogData.u_phone" auto-complete="off" class="inputbox"></el-input>
                </el-form-item>
                <el-form-item label="用户性别:" :label-width="formLabelWidth">
                  <el-select v-model="dialogData.u_sex" placeholder="请选择" class="inputbox">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="用户微信:" :label-width="formLabelWidth">
                  <el-input v-model="dialogData.ui_weixin" auto-complete="off" class="inputbox"></el-input>
                </el-form-item>
                <el-form-item label="用户微博:" :label-width="formLabelWidth">
                  <el-input v-model="dialogData.ui_weibo" auto-complete="off" class="inputbox"></el-input>
                </el-form-item>
                <el-form-item label="会员等级:" :label-width="formLabelWidth">
                  <el-input v-model="dialogData.m_grade" auto-complete="off" class="inputbox"></el-input>
                </el-form-item>
                <el-form-item label="用户经验值:" :label-width="formLabelWidth">
                  <el-input v-model="dialogData.m_equity" auto-complete="off" class="inputbox"></el-input>
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;handleConfirm()" size="small">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  import * as user from "../../../communal/routerApi"
    export default {
        data() {
            return {
              options:[{
                value:'ALL',
                label:'ALL'
              },{
                value:'VIP1',
                label:'VIP1'
              },{
                value:'VIP2',
                label:'VIP2'
              },{
                value:'VIP3',
                label:'VIP3'
              },{
                value:'VIP4',
                label:'VIP4'
              },{
                value:'VIP5',
                label:'VIP5'
              }],
              options1:[{
                value:'男',
                label:'男'
              },{
                value:'女',
                label:'女'
              }],
              value: '',
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
      methods:{
        handleEdit(index,row){//编辑方法
          console.log(index, row);
          let _row = row;
          this.dialogData=_row;
        },
        //确认编辑
        handleConfirm(){
          console.log(this.dialogData.u_birthday)
          console.log(this.dialogData.u_sex)

          // let ubirthday=(this.dialogData.u_birthday).toISOString().slice(0,10);
          let birthday=(this.dialogData.u_birthday).getFullYear() + '-' + ((this.dialogData.u_birthday).getMonth() + 1) + '-' + (this.dialogData.u_birthday).getDate()
          // console.log(ubirthday);
          this.axios.get("/xixi/updateVueuser.do",{
            params:{
              ubirthday:birthday,
              uphone:this.dialogData.u_phone,
              usex:this.dialogData.u_sex,
              uiweixin:this.dialogData.ui_weixin,
              uiweibo:this.dialogData.ui_weibo,
              mgrade:this.dialogData.m_grade,
              mequity:this.dialogData.m_equity,
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
        //每页显示条数改变
        handleSizeChange(val){
          // 每页条数
          console.log(`每页 ${val} 条`);
          this.pageNum=val;
          this.currentPageData=[];
          for(let i=(this.currentPage-1)*this.pageNum;i<this.currentPage*this.pageNum&&i<this.tableData.length;i++){
            this.currentPageData.push(this.tableData[i])
          }
        },
        //当前页改变
        handleCurrentChange(val){
          // 当前页操作
          this.currentPage=val;
          this.currentPageData=[];
          console.log(`当前页: ${val}`);
          for(let i=(this.currentPage-1)*this.pageNum;i<this.currentPage*this.pageNum&&i<this.tableData.length;i++){
            this.currentPageData.push(this.tableData[i])
          }
        },
        //导出表格的方法
        excelget(){
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../vendor/Export2Excel');
            const tHeader = ['用户ID', '用户名', '用户头像路径', '用户性别','用户生日','用户联系方式','用户微信','用户微博','银行卡号','会员等级','用户经验值'];
            const filterVal = ['u_id', 'u_name', 'u_img', 'u_sex','u_birthday','u_phone','ui_weixin','ui_weibo','ui_card','m_grade','m_equity'];
            const list = this.tableData;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '用户列表');
          })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
        //搜索框方法
        search(){
          let searchVal = $("#searchValue").val()
          console.log(searchVal.length)
          console.log("按下enter了耶");
          if(searchVal.length>0){
            this.axios.get("/xixi/searchUser.do",{
              params:{
                searchval:searchVal
              }
            }).then((data)=>{
              console.log(data.data)
              this.currentPageData=[]
              this.tableData=data.data;
              for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].u_img=user.locationtmj+this.tableData[i].u_img;
                this.tableData[i].u_birthday=(this.tableData[i].u_birthday).substr(0,10);
              }
              for(let i=0;i<this.pageNum&&i<this.tableData.length;i++){
                this.currentPageData.push(this.tableData[i])
              }
            })
          }else {
            console.log("没输入东西哟")
            this.axios.post('/xixi/getVueuser.do').then((data)=>{
              console.log(data.data)
              this.currentPageData=[]
              this.tableData=data.data;
              for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].u_img=user.locationtmj+this.tableData[i].u_img;
                this.tableData[i].u_birthday=(this.tableData[i].u_birthday).substr(0,10);
              }
              for(let i=0;i<this.pageNum&&i<this.tableData.length;i++){
                this.currentPageData.push(this.tableData[i])
              }
            })
          }
        },
        //具体检索
        selectVal(value){
          console.log("改变了哟")
          console.log(value)
          let _value = value;
          // console.log(this.tableData.length)
          if(_value=="ALL"){
            this.axios.post('/xixi/getVueuser.do').then((data)=>{
              console.log(data.data)
              this.currentPageData=[]
              this.tableData=data.data;
              for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].u_img=user.locationtmj+this.tableData[i].u_img;
                this.tableData[i].u_birthday=(this.tableData[i].u_birthday).substr(0,10);
              }
              for(let i=0;i<this.pageNum&&i<this.tableData.length;i++){
                this.currentPageData.push(this.tableData[i])
              }
            })
          }else {
            this.axios.get("/xixi/getAnyuser.do",{
              params:{
                value:_value
              }
            }).then((data)=>{
              console.log(data.data);
              this.currentPageData=[];
              this.tableData=data.data;
              for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].u_img=user.locationtmj+this.tableData[i].u_img;
                this.tableData[i].u_birthday=(this.tableData[i].u_birthday).substr(0,10);
              }
              for(let i=0;i<this.pageNum&&i<this.tableData.length;i++){
                this.currentPageData.push(this.tableData[i])
              }
            })
          }
        }
      },
      created(){
          this.axios.post('/xixi/getVueuser.do').then((data)=>{
            console.log(data.data);
            this.tableData=data.data;
            for(let i=0;i<this.tableData.length;i++){
              if(this.tableData[i].u_img.length < 100){
                this.tableData[i].u_img=user.locationtmj+this.tableData[i].u_img;
              }
              this.tableData[i].u_birthday=(this.tableData[i].u_birthday).substr(0,10);
            }
            for(let i=0;i<this.pageNum&&i<this.tableData.length;i++){
              this.currentPageData.push(this.tableData[i])
            }
          })
      }
    }
</script>

<style scoped>
  @import "../../assets/fonts/iconfont.css";
  .circle{
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: gainsboro;
    border-radius: 40px;
    text-align: center;
    line-height: 40px;
  }
  .circle_center{
    /*margin-top: -25px;*/
    color:#3399FF;
    font-size: 20px;
  }
  .head{
    border: 1px solid #e6e6e6;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .head2{
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 4em;
  }
  .el-main{   /*去掉标签左右的padding间距*/
    padding-left: 00px;
    padding-right: 00px;
    /*padding: 0;*/
  }
  .selectBox{
    float: left;
    margin-left: 20px;
    margin-top: 10px;
    height: 28px;
  }
  .el_search{
    width: 300px;
    margin-top: 10px;
    height: 28px;
  }
  .search_new_right{
    float: right;
    margin-right: 10px;
  }
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
    width: 46%;
    float: left;
  }
  .inputbox{
    width: 200px;
    height: 30px;
    outline: none;
  }
  .el-table{
    padding: 10px;
    margin-top: 10px;
  }
  #showImg{
    width: 120px;
    height: 120px;
    margin-left: 100px;
    margin-top: 10px;
  }
  img{
    /*width: 60px;*/
    /*height: 60px;*/
    border-radius: 50%;
    box-shadow: 0 0 10px 0 #efefef;
  }
  .trheight{
    padding-top:5px;
    padding-bottom:5px;
  }
  .bgc{
    background-color: rgba(169, 169, 169, 0.1);
  }
  .el-form--inline .el-form-item{
    margin-right: 30px;
  }

</style>
